export const generateUrlParams = (params: Record<string, string | number | undefined>): string => {
  return Object.entries(params).filter(([_,value]) => typeof value !== "undefined" && value !== null && value !== "").map(([key, value]) => `${key}=${value}`).join('&');
}