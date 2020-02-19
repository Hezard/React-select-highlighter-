import appReducer, { defaultText, selectors } from './application';

describe('app reducer', () => {
  const initialState = {
    color: null,
    filters: {},
    selections: [],
    text: 'Lorem Ipsum is simply dummy text'
  };

  test('text change', () => {
    const state = appReducer(initialState, {
      type: 'APPLICATION/TEXT_CHANGE',
      payload: 'Lorem dummy text'
    });
    expect(state).toEqual({
      color: null,
      filters: {},
      selections: [],
      text: 'Lorem dummy text'
    });
  });

  test('color change', () => {
    const state = appReducer(initialState, {
      type: 'APPLICATION//COLOR_CHANGE',
      payload: { id: 2, value: 'yellow' }
    });

    expect(state).toEqual({
      color: { id: 2, value: 'yellow' },
      filters: {},
      selections: [],
      text: 'Lorem Ipsum is simply dummy text'
    });
  });

  test('filters change', () => {
    const state = appReducer(initialState, {
      type: 'APPLICATION//FILTERS_CHANGE',
      payload: { id: 1, value: 'green' }
    });
    expect(state).toEqual({
      color: null,
      filters: { green: true },
      selections: [],
      text: 'Lorem Ipsum is simply dummy text'
    });
  });

  test('selections change', () => {
    const state = appReducer(
      {
        ...initialState,
        color: { id: 2, value: 'yellow' }
      },
      {
        type: 'APPLICATION//SELECTIONS_CHANGE',
        payload: [
          {
            id: '0',
            value: 'simply dummy',
            variant: 'yellow',
            start: 15,
            end: 27
          }
        ]
      }
    );

    expect(state).toEqual({
      color: { id: 2, value: 'yellow' },
      filters: {},
      selections: [
        {
          id: '0',
          value: 'simply dummy',
          variant: 'yellow',
          start: 15,
          end: 27
        }
      ],
      text: 'Lorem Ipsum is simply dummy text'
    });
  });

  test('app reset', () => {
    const state = appReducer(
      {
        color: { id: 2, value: 'yellow' },
        filters: { green: false, yellow: true, red: false },
        selections: [],
        text: 'Lorem Ipsum is simply dummy text'
      },
      { type: 'APPLICATION//RESET' }
    );
    expect(state).toEqual({
      color: null,
      filters: {},
      selections: [],
      text: defaultText
    });
  });

  test('get filtered selections', () => {
    const result = selectors.getFilteredSelections({
      appReducer: {
        filters: {
          green: true,
          red: true
        },
        selections: [
          {
            id: 0,
            variant: 'red'
          },
          {
            id: 1,
            variant: 'yellow'
          },
          { id: 2, variant: 'green' }
        ]
      }
    });

    expect(result).toMatchObject([
      { id: 0, variant: 'red' },
      { id: 2, variant: 'green' }
    ]);
  });
});
