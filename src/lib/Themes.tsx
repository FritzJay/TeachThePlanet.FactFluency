export const themeColors = ["#FF0000", "#3A93E1", "#F7C940", "#A8C75A"];

export const combineClassName = (className?: string, propsClassName?: string): string => {
  let combinedClassNames = '';
  if (className) {
    combinedClassNames += ` ${className}`;
  }
  if (propsClassName) {
    combinedClassNames += ` ${propsClassName}`;
  }
  return combinedClassNames.trim();
}