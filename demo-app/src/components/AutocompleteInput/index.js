import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';

import Pill from 'components/Pill';
import Dropdown from 'components/Dropdown';
import Highlighter from 'components/Highlighter';

import cn from 'util/classNames';
import movieService from 'services/MovieService';
import styles from './style.module.scss';

const propTypes = {
  className: PropTypes.string,
};

// Main component of the autocomplete input
const AutocompleteInput = ({ className }) => {
  const [pills, setPills] = useState([]);
  const [searching, setSearching] = useState(false);
  const [searchError, setSearchError] = useState(null);
  const [results, setResults] = useState([]);
  const [totalResults, setTotalResults] = useState(0);
  const [showDropdown, setShowDropdown] = useState(false);
  const [addPillError, setAddPillError] = useState('');
  const inputRef = useRef();

  const handleAddPill = (movieTitle, event) => {
    // prevent global click event to close the dropdown
    event.stopPropagation();

    if (pills.includes(movieTitle)) {
      setAddPillError(`Movie title "${movieTitle}" already added`);
    } else if (pills.length >= 5) {
      setAddPillError('Cannot add more than 5 movie titles');
    } else {
      setPills([...pills, movieTitle]);
      setAddPillError('');
    }
  };

  const handleDeletePill = (movieTitle) => {
    const filteredPills = pills.filter((pill) => pill !== movieTitle);
    setPills(filteredPills);
    setAddPillError('');
  };

  const searchKeyword = async (value) => {
    try {
      setSearchError(null);
      setSearching(true);
      setShowDropdown(true);
      const [res_results, res_total] = await movieService.search(value, 1);
      setResults(res_results);
      setTotalResults(res_total);
    } catch (e) {
      console.error(e);
      setSearchError(e.message);
      setResults([]);
      setTotalResults(0);
    } finally {
      setSearching(false);
    }
  };

  const loadMore = async (event) => {
    event.stopPropagation();
    const nextPage = Math.ceil(results.length / 10) + 1;
    try {
      const [res_results] = await movieService.search(
        inputRef.current.value,
        nextPage,
      );
      setResults([...results, ...res_results]);
    } catch (e) {
      console.error(e);
    }
  };

  // set global click event to hide dropdown
  useEffect(() => {
    const callback = () => {
      setShowDropdown(false);
    };
    window.addEventListener('click', callback);
    return () => window.removeEventListener('click', callback);
  }, []);

  // Use timer to implement debounce behavior
  // a better solution should be use a debounce function,
  // which can either be self-designed or 3rb party library
  useEffect(() => {
    let timer = null;
    const input = inputRef.current;
    const callback = (event) => {
      const value = event.target.value;
      clearTimeout(timer);
      timer = setTimeout(() => {
        // add a check in case the component is unmounted
        if (input) {
          searchKeyword(value);
        }
      }, 300);
    };
    input.addEventListener('input', callback);
    return () => {
      if (input) {
        input.removeEventListener('click', callback);
      }
    };
  }, []);

  return (
    <section>
      <div className={styles.error}>{addPillError}</div>
      <div className={cn(styles.search, className)}>
        {/* pills part */}
        <div className={styles.pills}>
          {pills.map((text, index) => (
            <Pill key={index} text={text} onDelete={handleDeletePill} />
          ))}
        </div>
        {/* auto complete input part */}
        <div className={styles.input}>
          <input ref={inputRef} placeholder="Type here..." type="text" />
          <Dropdown
            data-testid="dropdown"
            className={cn(styles.dropdown, showDropdown ? '' : 'hidden')}
            onSelect={handleAddPill}
          >
            {searching && <li>Searching...</li>}
            {!searching && searchError != null && (
              <li className={styles.error}>{searchError}</li>
            )}
            {results.map(({ title, director }, index) => (
              <li key={index} onClick={(event) => handleAddPill(title, event)}>
                <Highlighter text={title} keyword={inputRef.current.value} />
                <div className={styles.director}>{director}</div>
              </li>
            ))}
            {results.length < totalResults && (
              <button className={styles.more} onClick={loadMore}>
                More
              </button>
            )}
          </Dropdown>
        </div>
      </div>
    </section>
  );
};

AutocompleteInput.propTypes = propTypes;

export default AutocompleteInput;
