export let createSelector = (base: string, optionalClasses: { [className: string]: boolean } | undefined, extraClasses?: string[]) => {
  let result = base;
  let addClass = (className: string) => {
    result += `.${className}`;
  };
  if (optionalClasses) {
    Object.keys(optionalClasses).forEach(className => {
      if (optionalClasses[className]) {
        addClass(className);
      }
    });
  }
  if (extraClasses) {
    extraClasses.forEach(addClass);
  }
  return result;
};
