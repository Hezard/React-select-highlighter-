import React from 'react';
import { render, fireEvent, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ButtonToggleGroup from './buttonToggleGroup';

describe('Button Toggle Group', () => {
  let container, rerender, getByText, btnFirst, btnSecond;
  const onChange = jest.fn();
  const props = {
    className: 'btn-group-test',
    btnClassName: 'btn-test',
    data: [
      {
        id: 0,
        value: 'Btn 1'
      },
      {
        id: 1,
        value: 'Btn 2'
      }
    ],
    onChange
  };

  beforeEach(() => {
    ({ rerender, container, getByText } = render(<ButtonToggleGroup {...props} />));
    btnFirst = getByText(/Btn 1/i);
    btnSecond = getByText(/Btn 2/i);
  });

  afterEach(() => {
    jest.clearAllMocks();
    cleanup();
  });

  test('test initial render', () => {
    expect(container.firstChild).toMatchSnapshot();
  });

  test('test toggle click', () => {
    fireEvent.click(btnFirst);
    expect(onChange.mock.calls[0][0]).toEqual({
      id: 0,
      value: 'Btn 1'
    });
  });

  test('test multiple variant toggle click', () => {
    fireEvent.click(btnSecond);
    fireEvent.click(btnFirst);
    expect(onChange.mock.calls[0][0]).toEqual({
      id: 1,
      value: 'Btn 2'
    });
    expect(onChange.mock.calls[1][0]).toEqual({
      id: 0,
      value: 'Btn 1'
    });
  });

  test('test toggle active state', () => {
    rerender(<ButtonToggleGroup {...props} active={{ id: 1, value: 'Btn 2' }} />);
    expect(btnSecond).toHaveClass('btn--active');
  });

  test('test multiple toggle active state', () => {
    rerender(<ButtonToggleGroup {...props} multiple active={{ 'Btn 1': true, 'Btn 2': true }} />);
    expect(btnFirst).toHaveClass('btn--active');
    expect(btnSecond).toHaveClass('btn--active');
  });
});
