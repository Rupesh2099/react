interface ComposeClassesOptions<ClassKey extends string> {
  slots: Record<ClassKey, Array<string | false>>;
  classes?: Record<string, string>;
  getUtilityClass: (slot: string) => string;
}

export default function composeClasses<ClassKey extends string>(
  options: ComposeClassesOptions<ClassKey>,
): Record<ClassKey, string> {
  const { classes, getUtilityClass, slots } = options;
  const output: Record<ClassKey, string> = {} as any;

  Object.keys(slots).forEach(
    // `Objet.keys(slots)` can't be wider than `T` because we infer `T` from `slots`.
    // @ts-expect-error https://github.com/microsoft/TypeScript/pull/12253#issuecomment-263132208
    (slot: ClassKey) => {
      output[slot] = slots[slot]
        .reduce((acc, key) => {
          if (key) {
            if (classes && classes[key]) {
              acc.push(classes[key]);
            }
            acc.push(getUtilityClass(key));
          }
          return acc;
        }, [] as string[])
        .join(' ');
    },
  );

  return output;
}
