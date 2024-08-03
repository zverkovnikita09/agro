export const formatArrayToFormData = (name: string, array: any[]): { name: string; value: any }[] => {
  const resultArr: { name: string; value: any }[] = [];
  array
    .filter((value) => typeof value !== "undefined" && value !== null && value !== "")
    .forEach((value, index) => {
      if (typeof value === 'object') {
        return Object.entries(value).forEach(([key, objectValue]) => {
          resultArr.push({ name: `${name}[${index}][${key}]`, value: objectValue });
        })
      }

      resultArr.push({ name: `${name}[${index}]`, value });
    })
  return resultArr;
}