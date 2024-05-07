import cn from 'classnames';
import styles from './UserPhoto.module.scss'
import { ChangeEvent, useId, useRef, useState } from 'react';
import Camera from '@images/camera.svg'
import { checkFileInputError } from "@shared/lib/checkFileInputError";

interface UserPhotoProps {
  className?: string;
  image?: string | File
  editable?: boolean
  setImage?: (value?: File) => void
  setError?: (message: string) => void
}

export const UserPhoto = (props: UserPhotoProps) => {
  const { className, image, editable, setImage, setError } = props;

  const id = useId()

  const inputRef = useRef<HTMLInputElement>(null);

  const imgSource = () => {
    if (!image) return ""

    if (typeof image === "string") return image

    return URL.createObjectURL(image)
  }

  const classNames = cn(
    styles.userPhoto,
    { [styles.withBackground]: !image },
    { [styles.editable]: editable },
    className
  )
  const checkError = (files: File[]) => checkFileInputError({
    files,
    setError,
    allowedFileTypes: ['png', 'jpg', 'jpeg'],
    allowedFileCount: 1,
  })

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    inputRef.current && (inputRef.current.value = '')

    if (!checkError([file])) {
      setImage?.(file);
    }
  }

  return (
    <label htmlFor={id} className={classNames}>
      {editable &&
        <input ref={inputRef} type="file" id={id} className='hiddenInput' multiple={false} onChange={handleImageChange} />
      }
      {image && <img src={imgSource()} alt="Фото профиля" className={styles.image} />}
      <Camera width={40} height={40} className={styles.camera} />
    </label>
  )
}
