import uuid from 'uuid';

export function computeSelections(selections, target, exclude = false) {
  return selections
    .reduce((arr, curr) => {
      if (target.start <= curr.start && target.end >= curr.end) {
        return [...arr];
      }

      // target inside existing selection
      if (target.start > curr.start && target.end < curr.end) {
        const before = {
          id: uuid(),
          start: curr.start,
          end: target.start,
          value: curr.value.substr(0, target.start - curr.start),
          variant: curr.variant
        };
        const after = {
          id: uuid(),
          start: target.end,
          end: curr.end,
          value: curr.value.substr(target.end - curr.end),
          variant: curr.variant
        };
        return [...arr, before, after];
      }

      // target overlaped at the beginig
      if (target.start <= curr.start && target.end < curr.end && target.end > curr.start) {
        const result = {
          id: uuid(),
          start: target.end,
          end: curr.end,
          value: curr.value.substr(target.end - curr.end),
          variant: curr.variant
        };
        return [...arr, result];
      }

      // target overlaped at the end
      if (target.end >= curr.end && target.start > curr.start && target.start < curr.end) {
        const result = {
          id: uuid(),
          start: curr.start,
          end: target.start,
          value: curr.value.substr(0, target.start - curr.start),
          variant: curr.variant
        };
        return [...arr, result];
      }
      return [...arr, curr];
    }, [])
    .concat(exclude ? [] : target)
    .sort((a, b) => a.start - b.start);
}
