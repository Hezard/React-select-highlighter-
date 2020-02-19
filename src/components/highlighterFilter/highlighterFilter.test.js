import React from 'react';
import { render, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import HighlighterFilter from './highlighterFilter';

describe('Highlighter Filter', () => {
  let container;
  const props = {
    className: 'filter-test',
    data: [
      {
        id: '0',
        value: 'dummy text',
        variant: 'green',
        start: 22,
        end: 32
      },
      {
        id: '1',
        value: 'type and scrambled',
        variant: 'red',
        start: 194,
        end: 212
      },
      {
        id: '2',
        value: 'unchanged.',
        variant: 'green',
        start: 356,
        end: 366
      }
    ]
  };

  beforeEach(() => {
    ({ container } = render(<HighlighterFilter {...props} />));
  });

  afterEach(() => {
    cleanup();
  });

  test('test initial render', () => {
    expect(container.firstChild).toMatchSnapshot();
  });
});
