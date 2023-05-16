/**
 * Safe chained function.
 *
 * Will only create a new function if needed,
 * otherwise will pass back existing functions or null.
 */
export default function createChainedFunction<Args extends any[], This>(
  ...funcs: Array<(this: This, ...args: Args) => any | null | undefined>
): (this: This, ...args: Args) => void {
  return funcs.reduce(
    (acc, func) => {
      if (func === null || func === undefined) {
        return acc;
      }

      return function chainedFunction(...args) {
        acc.apply(this, args);
        func.apply(this, args);
      };
    },
    () => {},
  );
}
