import uuid from 'uuid/v4';

import { computeSelections } from './highlighter.utils';

jest.mock('uuid/v4');
uuid.mockImplementation(() => '0');

describe('test highlighter utils', () => {
  const item = {
    id: '0',
    value: 'simply dummy',
    variant: 'yellow',
    start: 15,
    end: 27
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('add one selection', () => {
    const result = computeSelections([], item);

    expect(result).toMatchObject([item]);
  });

  test('add selection inside another', () => {
    const result = computeSelections([item], {
      id: '0',
      value: 'ly du',
      variant: 'red',
      start: 19,
      end: 24
    });

    expect(result).toMatchObject([
      {
        id: '0',
        value: 'simp',
        variant: 'yellow',
        start: 15,
        end: 19
      },
      {
        id: '0',
        value: 'ly du',
        variant: 'red',
        start: 19,
        end: 24
      },
      {
        id: '0',
        value: 'mmy',
        variant: 'yellow',
        start: 24,
        end: 27
      }
    ]);
  });

  test('add selection overlaped at the beginig', () => {
    const result = computeSelections([item], {
      id: '0',
      value: 'is simply',
      variant: 'red',
      start: 12,
      end: 21
    });

    expect(result).toMatchObject([
      {
        id: '0',
        value: 'is simply',
        variant: 'red',
        start: 12,
        end: 21
      },
      {
        id: '0',
        value: ' dummy',
        variant: 'yellow',
        start: 21,
        end: 27
      }
    ]);
  });

  test('add selection overlaped at the end', () => {
    const result = computeSelections([item], {
      id: '0',
      value: 'dummy text',
      variant: 'red',
      start: 22,
      end: 32
    });

    expect(result).toMatchObject([
      {
        id: '0',
        value: 'simply ',
        variant: 'yellow',
        start: 15,
        end: 22
      },
      {
        id: '0',
        value: 'dummy text',
        variant: 'red',
        start: 22,
        end: 32
      }
    ]);
  });
});
