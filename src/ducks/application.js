// Actions
const PREFIX = 'APPLICATION';

const TEXT_CHANGE = `${PREFIX}/TEXT_CHANGE`;
const SELECTIONS_CHANGE = `${PREFIX}//SELECTIONS_CHANGE`;
const FILTERS_CHANGE = `${PREFIX}//FILTERS_CHANGE`;
const COLOR_CHANGE = `${PREFIX}//COLOR_CHANGE`;
const RESET = `${PREFIX}//RESET`;

export const defaultText =
  "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.";

const INITIAL_STATE = {
  color: null,
  filters: {},
  selections: [],
  text: defaultText
};

function appReducer(state = INITIAL_STATE, action = {}) {
  const { type, payload } = action;
  switch (type) {
    case TEXT_CHANGE:
      return { ...state, selections: [], text: payload };
    case FILTERS_CHANGE:
      return {
        ...state,
        filters: applyFilters(state, payload)
      };
    case COLOR_CHANGE:
      return { ...state, color: { ...payload } };
    case SELECTIONS_CHANGE:
      return { ...state, selections: [...payload] };
    case RESET:
      return { ...INITIAL_STATE };
    default:
      return state;
  }
}

// Reducer Helpers
function applyFilters(state, payload) {
  const { filters } = state;
  const { [payload.value]: hasFilter } = filters;

  if (hasFilter) {
    return { ...filters, [payload.value]: !hasFilter };
  }
  return { ...filters, [payload.value]: true };
}

// Action Creators
function colorChange(payload) {
  return { type: COLOR_CHANGE, payload };
}
function textChange(payload) {
  return { type: TEXT_CHANGE, payload };
}
function filtersChange(payload) {
  return { type: FILTERS_CHANGE, payload };
}
function selectionsChange(payload) {
  return { type: SELECTIONS_CHANGE, payload };
}
function resetAll() {
  return { type: RESET };
}

export const actions = {
  colorChange,
  textChange,
  filtersChange,
  selectionsChange,
  resetAll
};

// Selectors
function getSelections({ appReducer }) {
  return appReducer.selections;
}
function getText({ appReducer }) {
  return appReducer.text;
}
function getFilters({ appReducer }) {
  return appReducer.filters;
}
function getColor({ appReducer }) {
  return appReducer.color;
}

function getFilteredSelections({ appReducer }) {
  const { filters, selections } = appReducer;

  return selections.filter(item => {
    return filters[item.variant];
  });
}

export const selectors = {
  getSelections,
  getText,
  getColor,
  getFilters,
  getFilteredSelections
};

export default appReducer;
