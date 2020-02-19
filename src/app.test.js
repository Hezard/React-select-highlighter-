import React from 'react';
import { render, fireEvent, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import { App } from './app';

describe('App integration test', () => {
  let container, getByPlaceholderText, getByText, getByTestId;
  const colorChange = jest.fn(),
    textChange = jest.fn(),
    filtersChange = jest.fn(),
    selectionsChange = jest.fn(),
    resetAll = jest.fn();
  const props = {
    color: null,
    filters: {},
    selections: [],
    text: 'defaultText',
    colorChange,
    textChange,
    filtersChange,
    selectionsChange,
    resetAll
  };

  beforeEach(() => {
    ({ container, getByPlaceholderText, getByText, getByTestId } = render(<App {...props} />));
  });

  afterEach(() => {
    jest.clearAllMocks();
    cleanup();
  });

  test('test initial render', () => {
    expect(container.firstChild).toMatchSnapshot();
  });

  test('test textarea', () => {
    const textarea = getByPlaceholderText(/Enter text/);
    const result = 'Test text';
    fireEvent.change(textarea, { target: { value: 'Test text' } });
    expect(textChange.mock.calls[0][0]).toBe(result);
  });

  test('test eraser button', () => {
    const btn = getByText(/Eraser/);
    fireEvent.click(btn);
    expect(colorChange.mock.calls[0][0]).toBe(null);
  });

  test('test reset button', () => {
    const btn = getByText(/Reset/);
    fireEvent.click(btn);
    expect(resetAll).toHaveBeenCalledTimes(1);
  });

  test('test color button group', () => {
    const btnGroup = getByTestId('btn-group-selector');

    fireEvent.click(btnGroup.firstChild);
    expect(colorChange).toHaveBeenCalledTimes(1);
    expect(colorChange.mock.calls[0][0]).toMatchObject({
      id: 0,
      value: 'red'
    });
  });

  test('test filter button group', () => {
    const btnGroup = getByTestId('btn-group-filter');

    fireEvent.click(btnGroup.firstChild);
    expect(filtersChange).toHaveBeenCalledTimes(1);
    expect(filtersChange.mock.calls[0][0]).toMatchObject({
      id: 0,
      value: 'red'
    });
  });
});
