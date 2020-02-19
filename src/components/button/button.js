import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import './button.scss';

const Button = ({ children, className, color, disabled, active, size, onClick }) => {
  const btnClass = classnames('btn', className, `btn--${size}`, `btn--${color}`, {
    'btn--disabled': disabled,
    'btn--active': active
  });

  return (
    <button className={btnClass} disabled={disabled} onClick={onClick}>
      {children}
    </button>
  );
};

Button.defaultProps = { color: 'primary', disabled: false, size: 'md' };

Button.propTypes = {
  color: PropTypes.oneOf(['primary', 'secondary']),
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg'])
};

export default Button;
