import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { Button } from '../button';

import './buttonToggleGroup.scss';

class ButtonToggleGroup extends Component {
  handleChange = item => e => {
    const { onChange, active, multiple } = this.props;

    if (!multiple && active && active.value == item.value) {
      return;
    }

    if (onChange) {
      onChange(item, e);
    }
  };

  render() {
    const { active, className, btnClassName, dataTestId, data, multiple } = this.props;
    const classes = classnames('btn-toggle-group', className);
    const btnClasses = classnames('btn', btnClassName);

    if (!data || (data && !data.length)) {
      return null;
    }

    return (
      <div className={classes} data-testid={dataTestId}>
        {data.map(item => {
          const isActive = multiple
            ? active && active[item.value]
            : active && active.value === item.value;

          return (
            <Button
              type="button"
              className={btnClasses}
              key={item.id}
              active={isActive}
              onClick={this.handleChange(item)}
            >
              {item.value}
            </Button>
          );
        })}
      </div>
    );
  }
}

ButtonToggleGroup.defaultProps = { btnClassName: 'btn--primary', disabled: false, multiple: false };

ButtonToggleGroup.propTypes = {
  active: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    value: PropTypes.string
  }),
  btnClassName: PropTypes.string,
  className: PropTypes.string,
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      value: PropTypes.string
    })
  ),
  disabled: PropTypes.bool,
  multiple: PropTypes.bool,
  onChange: PropTypes.func
};

export default ButtonToggleGroup;
