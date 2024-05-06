import { ChangeEvent, ReactNode, useId, useRef, useState } from 'react'
import style from './FileInputPopup.module.scss'
import { FieldError } from 'react-hook-form';
import { Popup } from "@shared/ui/Popup";
import { CardContainer } from "@shared/ui/CardContainer";
import { Title, TitleSize } from "@shared/ui/Title";
import { Text, TextColor, TextSize, TextWeight } from "@shared/ui/Text";
import { Button, ButtonSize, ButtonTheme } from "@shared/ui/Button";
import { checkFileInputError } from '@shared/lib/checkFileInputError';
import cn from "classnames"
export interface FileInputPopupProps {
  setFile?: (file: File) => void
  setError?: (message: string) => void
  allowedFileTypes?: string[]
  allowedFileSize?: number
  allowedFileCount?: number
  error?: FieldError
  clearErrors?: () => void
  label?: string
  children?: (openPopup: () => void) => ReactNode
  title?: string
}

export const FileInputPopup = (props: FileInputPopupProps) => {
  const {
    setFile,
    setError,
    error,
    clearErrors,
    allowedFileTypes = ['png', 'jpg', 'jpeg'],
    label,
    allowedFileCount,
    allowedFileSize = 1,
    title,
    children
  } = props;

  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const id = useId();

  const inputRef = useRef<HTMLInputElement>(null);

  const [isDrag, setDrag] = useState(false);

  const onDragStart = (e: React.DragEvent<HTMLElement>) => {
    e.preventDefault()
    setDrag(true)
  }

  const onDragLeave = (e: React.DragEvent<HTMLElement>) => {
    e.preventDefault();
    setDrag(false);
  }

  const onDrop = (e: React.DragEvent<HTMLElement>) => {
    e.preventDefault()
    const file = e.dataTransfer.files?.[0];

    if (!file) return;

    if (!checkError([file])) {
      setFile?.(file);
    }

    setDrag(false)
    togglePopup()
  }

  const togglePopup = () => {
    setIsPopupOpen(prev => !prev);
  }

  const checkError = (files: File[]) => checkFileInputError({
    files,
    setError,
    allowedFileTypes: ['png', 'jpg', 'jpeg'],
    allowedFileCount: 1,
    allowedFileSize: 1024 * 1024
  })

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    inputRef.current && (inputRef.current.value = '')

    if (!checkError([file])) {
      setFile?.(file);
    }
    togglePopup()
  }

  return (
    <>
      <Popup isActive={isPopupOpen} closePopup={togglePopup}>
        <CardContainer
          className={cn(style.fileInputPopup, { [style.isDrag]: isDrag })}
          onDragStart={onDragStart}
          onDragOver={onDragStart}
          onDragLeave={onDragLeave}
          onDrop={onDrop}
        >
          <div className={style.heading}>
            <Title as='h4' size={TitleSize.S}>{title}</Title>
            <Text
              as='p'
              color={TextColor.GREY}
              size={TextSize.M}
              weight={TextWeight.MEDIUM}
            >
              Допустимые форматы изображений {allowedFileTypes.map(type => type.toUpperCase()).join(', ')}
            </Text>
          </div>

          <div className={style.dragZone}>
            <Text
              as='p'
              className={style.dragZoneText}
              color={TextColor.GREY}
              size={TextSize.L}
              weight={TextWeight.MEDIUM}
            >
              Перетащите сюда изображение <br /> или
            </Text>
            <label htmlFor={id}>
              <input ref={inputRef} type="file" id={id} className='hiddenInput' multiple={false} onChange={handleInputChange} />
              <Button theme={ButtonTheme.ACCENT_WITH_BLACK_TEXT} size={ButtonSize.S}>
                <Text weight={TextWeight.SEMI_BOLD}>Выберите файл</Text>
              </Button>
            </label>
          </div>

          <div className={style.footer}>
            <Text
              as='p'
              color={TextColor.GREY}
              size={TextSize.M}
              weight={TextWeight.MEDIUM}
            >
              Размер файла не должен превышать {allowedFileSize} Мb
            </Text>
            <Button theme={ButtonTheme.OUTLINE} size={ButtonSize.S} className={style.cancelButton} onClick={togglePopup}>
              <Text weight={TextWeight.SEMI_BOLD}>Отмена</Text>
            </Button>
          </div>

        </CardContainer>
      </Popup>
      {children?.(togglePopup)}
    </>
  )
}

// export const FileInputPopup = (props: FileInputPopupProps) => {
//   const {
//     files,
//     setFiles,
//     setError,
//     error,
//     clearErrors,
//     allowedFileTypes = ['png', 'jpg', 'jpeg', 'svg', 'webp'],
//     label,
//     allowedFileCount,
//     allowedFileSize
//   } = props;
//
//   const inputRef = useRef<HTMLInputElement>(null);
//
//   const checkError = (files: File[]) => checkFileInputError({
//     files,
//     setError,
//     allowedFileTypes,
//     clearErrors,
//     allowedFileSize,
//     allowedFileCount
//   })
//
//   const previews = useMemo(() => (
//     [...(files || [])].map(file => URL.createObjectURL(file))
//   ), [files])
//
//   const [isDrag, setDrag] = useState(false);
//   const id = useId();
//
//   const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const filesArray = [...(files ?? [])];
//
//     const newFilesArray = [...filesArray, ...(e.target.files ?? [])];
//
//     if (!checkError(newFilesArray)) {
//       setFiles(arrayToFilelist(newFilesArray));
//       inputRef.current && (inputRef.current.value = '');
//     }
//   }
//
//
//   const onDragStart = (e: React.DragEvent<HTMLLabelElement>) => {
//     e.preventDefault()
//     setDrag(true)
//   }
//
//   const onDragLeave = (e: React.DragEvent<HTMLLabelElement>) => {
//     e.preventDefault();
//     setDrag(false);
//   }
//
//   const onDrop = (e: React.DragEvent<HTMLLabelElement>) => {
//     e.preventDefault()
//     const filesArray = [...(files ?? [])];
//
//     const newFilesArray = [...filesArray, ...(e.dataTransfer.files ?? [])];
//
//     !checkError(newFilesArray) &&
//
//       setFiles(arrayToFilelist(newFilesArray));
//
//     setDrag(false)
//   }
//
//   const onFileDelete = (index: number) => () => {
//     const filesArray = [...(files ?? [])];
//     const newFiles = [...filesArray.slice(0, index), ...filesArray.slice(index + 1)]
//     setFiles(arrayToFilelist(newFiles));
//     inputRef.current && (inputRef.current.value = '');
//   }
//
//   return (
//     <div className={style.imageFileInput}>
//       {label && <label htmlFor={id} className={style.label}>{label}</label>}
//       <div className={style.errorMessage}>
//         {error?.message}
//       </div>
//       <div className={style.preview}>
//         {previews.map((src, index) =>
//           <div
//             key={index}
//             className={style.imageWrapper}
//           >
//             <CloseButton onClick={onFileDelete(index)} className={style.removeImage} />
//             <img src={src} className={style.previewImage} alt='' />
//           </div>
//         )}
//       </div>
//       <label
//         htmlFor={id}
//         className={cn(style.labelArea, { [style.isDrag]: isDrag })}
//         onDragStart={onDragStart}
//         onDragOver={onDragStart}
//         onDragLeave={onDragLeave}
//         onDrop={onDrop}
//       >
//         <input
//           ref={inputRef}
//           className='hiddenInput'
//           type="file"
//           id={id}
//           onChange={onInputChange}
//           multiple
//         />
//         {
//           isDrag ? 'Отпустите файл для загрузки' :
//             <><img className='no-pointer-events' src={camera} alt="Камера" />Нажмите или
//               перетащите сюда изображения</>
//         }
//       </label>
//       <div className={style.loadInfo}>
//         <div className={style.loadTitle}>Вы можете загрузить до 10 фотографий</div>
//         <p className='greyText'>Допустимые форматы {allowedFileTypes.map((item) => (
//           item.toUpperCase()
//         )).join(', ')}
//         </p>
//       </div>
//     </div>
//   )
// }