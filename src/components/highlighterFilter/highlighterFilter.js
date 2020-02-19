import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import './highlighterFilter.scss';

class HighlighterFilter extends Component {
  render() {
    const { className, data, selectionClassName } = this.props;
    const classes = classnames('highlighter-filter', className);

    if (!data || (data && !data.length)) {
      return null;
    }

    return (
      <section className={classes}>
        {data.map(item => {
          const selectionClasses = classnames(
            selectionClassName,
            `${selectionClassName}--${item.variant}`
          );
          return (
            <div key={item.id} className={selectionClasses}>
              {item.value}
            </div>
          );
        })}
      </section>
    );
  }
}

HighlighterFilter.defaultProps = { selectionClassName: 'highlighter__selection' };

HighlighterFilter.propTypes = {
  className: PropTypes.string,
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      start: PropTypes.number,
      end: PropTypes.number,
      value: PropTypes.string,
      variant: PropTypes.string
    })
  ),
  selectionClassName: PropTypes.string
};

export default HighlighterFilter;
