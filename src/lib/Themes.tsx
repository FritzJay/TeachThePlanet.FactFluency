export const themeColors = ["red", "blue", "yellow", "green"];

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