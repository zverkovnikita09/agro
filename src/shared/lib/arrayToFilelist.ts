export const arrayToFilelist = (files: File[]): FileList => {
  const dt = new DataTransfer();

  files.forEach(file => {
    dt.items.add(file);
  })

  return dt.files;
}