export const formatArrayToFormData = (name: string, array: any[]): { name: string; value: any }[] => {
  return array
    .filter((value) => typeof value !== "undefined" && value !== null && value !== "")
    .map((value, index) => ({ name: `${name}[${index}]`, value }))
}