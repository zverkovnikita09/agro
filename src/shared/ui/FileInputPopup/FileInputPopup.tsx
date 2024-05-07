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
      togglePopup()
    }

    setDrag(false)
  }

  const togglePopup = () => {
    setIsPopupOpen(prev => !prev);
  }

  const checkError = (files: File[]) => checkFileInputError({
    files,
    setError,
    allowedFileTypes: ['png', 'jpg', 'jpeg'],
    allowedFileCount: 1,
  })

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    inputRef.current && (inputRef.current.value = '')

    if (!checkError([file])) {
      setFile?.(file);
      togglePopup()
    }
  }

  return (
    <>
      <Popup isActive={isPopupOpen} closePopup={togglePopup}>
        <CardContainer
          className={cn(style.fileInputPopup, { [style.isDrag]: isDrag })}
          onDragOver={onDragStart}

          onDrop={onDrop}
        >
          {isDrag &&
          <div
            className={style.drag}
            onDragLeave={onDragLeave}
          >
            Отпустите файл для загрузки
          </div>
          }
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
            <label htmlFor={id} className={style.label}>
              <input ref={inputRef} type="file" id={id} className='hiddenInput' multiple={false} onChange={handleInputChange} />
              <Text weight={TextWeight.SEMI_BOLD}>Выберите файл</Text>
            </label>
          </div>

          <div className={style.footer}>
            <Text
              as='p'
              color={TextColor.GREY}
              size={TextSize.M}
              weight={TextWeight.MEDIUM}
            >
              Размер файла не должен превышать 5 Мb
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
