export const generateUrlParams = (params: Record<string, string | number | undefined>): string => {
  return Object.entries(params).map(([key, value]) => `${key}=${value}`).join('&');
}