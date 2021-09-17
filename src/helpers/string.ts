// eslint-disable-next-line import/prefer-default-export
export const sentenceCase = (str: string) => {
  const lowerCased = str.toLowerCase();
  return lowerCased.charAt(0).toUpperCase() + lowerCased.slice(1);
};
