import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import uuid from 'uuid/v4';

import Highlighter from './highlighter';

jest.mock('uuid/v4');
uuid.mockImplementation(() => '0');

global.window.getSelection = jest.fn();
function getSelectionMock({ value, ...config }) {
  return () => ({
    ...config,
    toString: () => value,
    empty: () => null
  });
}

describe('Highlighter', () => {
  let container, rerender, getByText;
  const onChange = jest.fn();
  const result = {
    id: '0',
    value: 'simply dummy',
    variant: 'green',
    start: 15,
    end: 27
  };
  const props = {
    color: 'green',
    selections: [
      {
        id: '0',
        value: 'is simply',
        variant: 'green',
        start: 12,
        end: 21
      },
      {
        id: '1',
        value: 'of the printing',
        variant: 'yellow',
        start: 33,
        end: 48
      },
      {
        id: '2',
        start: 53,
        end: 57,
        value: 'type',
        variant: 'red'
      },
      {
        id: '3',
        value: 'setting industry',
        variant: 'green',
        start: 57,
        end: 73
      },
      {
        id: '4',
        value: 'been',
        variant: 'red',
        start: 91,
        end: 95
      }
    ],
    text:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's.",
    onChange
  };

  beforeEach(() => {
    ({ getByText, rerender, container } = render(<Highlighter {...props} />));
  });

  afterEach(() => {
    jest.clearAllMocks();
    cleanup();
  });

  test('test initial render', () => {
    expect(container.firstChild).toMatchSnapshot();
  });

  test('test with selection event', () => {
    rerender(<Highlighter {...props} selections={[]} />);
    const targetNode = container.firstChild;
    const firstNode = targetNode.firstChild;

    window.getSelection.mockImplementation(
      getSelectionMock({
        anchorNode: firstNode,
        focusNode: firstNode,
        focusOffset: 15,
        anchorOffset: 27,
        value: 'simply dummy'
      })
    );

    fireEvent.mouseUp(targetNode);

    expect(onChange.mock.calls[0][0]).toMatchObject([result]);
  });

  test('test with selections', () => {
    rerender(<Highlighter {...props} selections={[result]} />);

    expect(container.firstChild.children).toHaveLength(1);
    expect(getByText(result.value)).toHaveClass('highlighter__selection--green');
    expect(getByText(result.value)).toHaveTextContent(result.value);
  });
});
