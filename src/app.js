import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { colors } from './constants';
import { appActions, appSelectors } from './ducks';

import { Button } from './components/button';
import { Highlighter } from './components/highlighter';
import { ButtonToggleGroup } from './components/buttonToggleGroup';
import { HighlighterFilter } from './components/highlighterFilter';

import './app.scss';

export class App extends Component {
  handleReset = () => {
    this.props.resetAll();
  };

  handleTextChange = e => {
    this.props.textChange(e.target.value);
  };

  handleHighlightColorChange = color => {
    this.props.colorChange(color);
  };

  handleClear = () => {
    this.props.colorChange(null);
  };

  handleSelectionChange = selections => {
    this.props.selectionsChange(selections);
  };

  handleFilterColorChange = item => {
    this.props.filtersChange(item);
  };

  render() {
    const { text, color, selections, filters, filteredSelections } = this.props;
    const highlightColor = color && color.value;

    return (
      <div className="app">
        <header className="app-header">
          <h1>React Select Highlighter</h1>
        </header>
        <section className="app-content">
          <textarea
            className="form-textfield mb-3"
            placeholder="Enter text"
            value={text}
            onChange={this.handleTextChange}
          />
          <div className="row mb-3">
            <div className="col">
              <ButtonToggleGroup
                dataTestId="btn-group-selector"
                data={colors}
                active={color}
                onChange={this.handleHighlightColorChange}
              />
            </div>
            <div className="col d-flex">
              <Button
                type="button"
                className="btn btn--outline btn--primary ml-auto"
                onClick={this.handleClear}
              >
                Eraser
              </Button>
              <Button
                type="button"
                className="btn btn--outline btn--secondary ml-2"
                onClick={this.handleReset}
                data-testid="btn-reset"
              >
                Reset
              </Button>
            </div>
          </div>
          <Highlighter
            color={highlightColor}
            text={text}
            selections={selections}
            onChange={this.handleSelectionChange}
          />
          <h4>Filters:</h4>
          <ButtonToggleGroup
            dataTestId="btn-group-filter"
            multiple
            data={colors}
            className="mb-3"
            btnClassName="btn--outline"
            active={filters}
            onChange={this.handleFilterColorChange}
          />
          <HighlighterFilter data={filteredSelections} />
        </section>
      </div>
    );
  }
}

App.propTypes = {
  color: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    value: PropTypes.string
  }),
  filters: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    value: PropTypes.string
  }),
  filteredSelections: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      start: PropTypes.number,
      end: PropTypes.number,
      value: PropTypes.string,
      variant: PropTypes.string
    })
  ),
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

export default connect(
  state => ({
    color: appSelectors.getColor(state),
    text: appSelectors.getText(state),
    filters: appSelectors.getFilters(state),
    selections: appSelectors.getSelections(state),
    filteredSelections: appSelectors.getFilteredSelections(state)
  }),
  appActions
)(App);
