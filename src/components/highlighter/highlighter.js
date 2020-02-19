import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import uuid from 'uuid';
import classnames from 'classnames';

import './highlighter.scss';

import { computeSelections, isSelectionBackward, findSelectionIndex } from '../../utils';

class Highlighter extends Component {
  handleSelectionChange = ({ currentTarget }) => {
    const { color, selections, onChange } = this.props;
    const selection = window.getSelection();
    const { anchorNode, anchorOffset, focusOffset } = selection;
    const value = selection.toString();

    // skip outer events of container and empty selections
    if ((!selections.length && !color) || !value || !currentTarget.contains(anchorNode)) {
      selection.empty();
      return;
    }

    // find && update indexes if we replace existing highlight elements
    const currentIndex = findSelectionIndex(currentTarget.childNodes, selection);
    const isBackward = isSelectionBackward(selection);
    const item = {
      id: uuid(),
      value,
      variant: color,
      ...(isBackward
        ? {
            start: focusOffset + currentIndex,
            end: focusOffset + currentIndex + value.length
          }
        : {
            start: anchorOffset + currentIndex,
            end: anchorOffset + currentIndex + value.length
          })
    };

    const collection = computeSelections(selections, item, !color);

    if (onChange) {
      onChange(collection);
    }

    selection.empty();
  };

  renderText() {
    const { selections, text, selectionClassName } = this.props;
    const length = selections.length;
    let position = 0;
    let content = text;

    if (length > 0) {
      return selections.reduce((children, node, index) => {
        const classes = classnames(selectionClassName, `${selectionClassName}--${node.variant}`);
        let before = content.substr(0, node.start - position);
        let after = content.substr(node.end - position);
        content = after;
        position = node.end;

        return [
          ...children,
          <Fragment key={node.id}>
            {before}
            <span className={classes}>{node.value}</span>
            {index === length - 1 && after}
          </Fragment>
        ];
      }, []);
    }
    return text;
  }

  render() {
    const { className, text } = this.props;
    const classes = classnames('highlighter', className);

    if (!text) {
      return null;
    }

    return (
      // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
      <article className={classes} onMouseUp={this.handleSelectionChange}>
        {this.renderText()}
      </article>
    );
  }
}

Highlighter.defaultProps = { selectionClassName: 'highlighter__selection', disabled: false };

Highlighter.propTypes = {
  className: PropTypes.string,
  selectionClassName: PropTypes.string,
  color: PropTypes.string,
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
  text: PropTypes.string,
  selections: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      start: PropTypes.number,
      end: PropTypes.number,
      value: PropTypes.string,
      variant: PropTypes.string
    })
  )
};

export default Highlighter;
