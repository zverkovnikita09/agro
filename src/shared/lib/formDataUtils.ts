export const formatArrayToFormData = (name: string, array: any[]): { name: string; value: string }[] => {
  return array.map((value, index) => ({ name: `${name}[${index}]`, value }))
}