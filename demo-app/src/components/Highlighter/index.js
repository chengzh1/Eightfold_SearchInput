import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  text: PropTypes.string.isRequired,
  keyword: PropTypes.string.isRequired,
};

/**
 * Component to hight text's first occurrence of keyword
 */
const Highlighter = ({ text, keyword }) => {
  const index = text.toLowerCase().indexOf(keyword.toLowerCase());
  if (index < 0) {
    return <>{text}</>;
  } else {
    const end_index = index + keyword.length;
    return (
      <>
        {text.slice(0, index)}
        <b>{text.slice(index, end_index)}</b>
        {text.slice(end_index)}
      </>
    );
  }
};

Highlighter.propTypes = propTypes;

export default React.memo(Highlighter);
