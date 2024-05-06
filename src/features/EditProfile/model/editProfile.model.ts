export interface FileType {
  id: string
  title: string
}

export interface FileToSendType {
  file_types: string
  load_files: File
}