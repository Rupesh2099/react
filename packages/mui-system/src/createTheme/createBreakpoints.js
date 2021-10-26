// Sorted ASC by size. That's important.
// It can't be configured as it's used statically for propTypes.
export const breakpointKeys = ['xs', 'sm', 'md', 'lg', 'xl'];

// Keep in mind that @media is inclusive by the CSS specification.
export default function createBreakpoints(breakpoints) {
  const {
    // The breakpoint **start** at this value.
    // For instance with the first breakpoint xs: [xs, sm).
    values = {
      xs: 0, // phone
      sm: 600, // tablet
      md: 900, // small laptop
      lg: 1200, // desktop
      xl: 1536, // large screen
    },
    unit = 'px',
    step = 5,
    ...other
  } = breakpoints;

  const keys = Object.keys(values);

  function up(key) {
    const value = typeof values[key] === 'number' ? values[key] : key;
    return `@media (min-width:${value}${unit})`;
  }

  function down(key) {
    const value = typeof values[key] === 'number' ? values[key] : key;
    return `@media (max-width:${value - step / 100}${unit})`;
  }

  function between(start, end) {
    const endIndex = keys.indexOf(end);

    return (
      `@media (min-width:${
        typeof values[start] === 'number' ? values[start] : start
      }${unit}) and ` +
      `(max-width:${
        (endIndex !== -1 && typeof values[keys[endIndex]] === 'number'
          ? values[keys[endIndex]]
          : end) -
        step / 100
      }${unit})`
    );
  }

  function only(key) {
    if (keys.indexOf(key) + 1 < keys.length) {
      return between(key, keys[keys.indexOf(key) + 1]);
    }

    return up(key);
  }

  function not(key) {
    const keyIndex = keys.indexOf(key);
    if (keyIndex === 0) {
      return up(keys[1]);
    }
    if (keyIndex === keys.length - 1) {
      return down(keys[keyIndex]);
    }

    return (
      `@media not all and (min-width:${values[key]}${unit}) and ` +
      `(max-width:${values[keys[keyIndex + 1]] - step / 100}${unit})`
    );
  }

  return {
    keys,
    values,
    up,
    down,
    between,
    only,
    not,
    unit,
    ...other,
  };
}
