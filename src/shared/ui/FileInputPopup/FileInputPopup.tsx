import { useId, useMemo, useRef, useState } from 'react'
import style from './ImageFileInput.module.scss'
import camera from '@images/camera.svg'
import { CloseButton } from '../CloseButton/CloseButton';
import { FieldError } from 'react-hook-form';
import cn from 'classnames'

export interface FileInputPopupProps {
  files: FileList | null
  setFiles: (files: FileList | null) => void
  setError: (message: string) => void
  allowedFileTypes?: string[]
  allowedFileSize?: number
  allowedFileCount?: number
  error?: FieldError
  clearErrors?: () => void
  label?: string
}

/* export const FileInputPopup = (props: FileInputPopupProps) => {
  const {
    files,
    setFiles,
    setError,
    error,
    clearErrors,
    allowedFileTypes = ['png', 'jpg', 'jpeg', 'svg', 'webp'],
    label,
    allowedFileCount,
    allowedFileSize
  } = props;

  const inputRef = useRef<HTMLInputElement>(null);

  const checkError = (files: File[]) => checkFileInputError({
    files,
    setError,
    allowedFileTypes,
    clearErrors,
    allowedFileSize,
    allowedFileCount
  })

  const previews = useMemo(() => (
    [...(files || [])].map(file => URL.createObjectURL(file))
  ), [files])

  const [isDrag, setDrag] = useState(false);
  const id = useId();

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const filesArray = [...(files ?? [])];

    const newFilesArray = [...filesArray, ...(e.target.files ?? [])];

    if (!checkError(newFilesArray)) {
      setFiles(arrayToFilelist(newFilesArray));
      inputRef.current && (inputRef.current.value = '');
    }
  }


  const onDragStart = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault()
    setDrag(true)
  }

  const onDragLeave = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setDrag(false);
  }

  const onDrop = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault()
    const filesArray = [...(files ?? [])];

    const newFilesArray = [...filesArray, ...(e.dataTransfer.files ?? [])];

    !checkError(newFilesArray) &&

      setFiles(arrayToFilelist(newFilesArray));

    setDrag(false)
  }

  const onFileDelete = (index: number) => () => {
    const filesArray = [...(files ?? [])];
    const newFiles = [...filesArray.slice(0, index), ...filesArray.slice(index + 1)]
    setFiles(arrayToFilelist(newFiles));
    inputRef.current && (inputRef.current.value = '');
  }

  return (
    <div className={style.imageFileInput}>
      {label && <label htmlFor={id} className={style.label}>{label}</label>}
      <div className={style.errorMessage}>
        {error?.message}
      </div>
      <div className={style.preview}>
        {previews.map((src, index) =>
          <div
            key={index}
            className={style.imageWrapper}
          >
            <CloseButton onClick={onFileDelete(index)} className={style.removeImage} />
            <Image src={src} className={style.previewImage} alt='' fill />
          </div>
        )}
      </div>
      <label
        htmlFor={id}
        className={cn(style.labelArea, { [style.isDrag]: isDrag })}
        onDragStart={onDragStart}
        onDragOver={onDragStart}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
      >
        <input
          ref={inputRef}
          className='hiddenInput'
          type="file"
          id={id}
          onChange={onInputChange}
          multiple
        />
        {
          isDrag ? 'Отпустите файл для загрузки' :
            <><Image className='no-pointer-events' src={camera} alt="Камера" width={32} height={32} />Нажмите или
              перетащите сюда изображения</>
        }
      </label>
      <div className={style.loadInfo}>
        <div className={style.loadTitle}>Вы можете загрузить до 10 фотографий</div>
        <p className='greyText'>Допустимые форматы {allowedFileTypes.map((item) => (
          item.toUpperCase()
        )).join(', ')}
        </p>
      </div>
    </div>
  )
} */