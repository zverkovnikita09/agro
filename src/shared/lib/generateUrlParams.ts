export const generateUrlParams = (params: Record<string, string | number | undefined | string[]>): string => {
  return Object
    .entries(params)
    .filter(([_, value]) => typeof value !== "undefined" && value !== null && value !== "")
    .map(([key, value]) => {
      if (Array.isArray(value)) {
        return value.filter(Boolean).map((item) => `${key}[]=${item}`).join('&');
      }
      return `${key}=${value}`;
    })
    .join('&');
}