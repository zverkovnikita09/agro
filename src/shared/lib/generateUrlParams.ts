export const generateUrlParams = (params: Record<string, string | number | undefined | string[]>): string => {
  return Object
    .entries(params)
    .filter(([_, value]) => typeof value !== "undefined" && value !== null && value !== "")
    .map(([key, value], index) => {
      if (Array.isArray(value)) {
        return value.filter(Boolean).map((item) => `${key}[]=${item}`).join('&');
      }

      if (typeof value === 'object') {
        const resultArr: string[] = [];

        Object.entries(value).forEach(([objectKey, objectValue]) => {
          resultArr.push(`${key}[${index}][${objectKey}]=${objectValue}`);
        })

        return resultArr.join('&');
      }

      return `${key}=${value}`;
    })
    .join('&');
}