import _ from "lodash";

export const sentenceCase = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const camelToSnakeKeys = (data: Record<any, any>) => {
  return _.mapKeys(data, (value: string, key: string) =>
    /^[A-Z0-9_]+$/.test(key) ? key : _.kebabCase(key)
  );
};
