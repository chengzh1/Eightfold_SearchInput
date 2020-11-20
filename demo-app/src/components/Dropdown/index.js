import React from 'react';
import PropTypes from 'prop-types';

import cn from 'util/classNames';
import styles from './style.module.scss';

const propTypes = {
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
};

const Dropdown = ({ className, children, ...rest }) => {
  return (
    <div className={cn(styles.dropdown, className)} {...rest}>
      <ul>{children}</ul>
    </div>
  );
};

Dropdown.propTypes = propTypes;

export default React.memo(Dropdown);
