export interface FileType {
  id: string
  title: string
}

export interface FileToSendType {
  title: string
  file_types: string
  load_files?: File
}