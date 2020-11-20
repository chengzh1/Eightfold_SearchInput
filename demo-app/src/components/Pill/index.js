import React from 'react';
import PropTypes from 'prop-types';
import cn from 'util/classNames';

import styles from './style.module.scss';

const propTypes = {
  className: PropTypes.string,
  text: PropTypes.string.isRequired,
  onDelete: PropTypes.func.isRequired,
};

// component to show a pill with text and allow deletion
const Pill = ({ className, text, onDelete, ...rest }) => {
  return (
    <div className={cn(styles.pill, className)} {...rest}>
      <div>{text}</div>
      <div
        title="delete"
        className={styles.delete}
        onClick={() => onDelete(text)}
      ></div>
    </div>
  );
};

Pill.propTypes = propTypes;

export default React.memo(Pill);
