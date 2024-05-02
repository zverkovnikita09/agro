import cn from 'classnames';
import styles from './UserPhoto.module.scss'
import { useId } from 'react';
import Camera from '@images/camera.svg'

interface UserPhotoProps {
  className?: string;
  image?: string
  editable?: boolean
}

export const UserPhoto = (props: UserPhotoProps) => {
  const { className, image, editable } = props;

  const id = useId()

  const classNames = cn(
    styles.userPhoto,
    { [styles.withBackground]: !image },
    { [styles.editable]: editable },
    className
  )

  return (
    <label htmlFor={id} className={classNames}>
      {editable && <input type="file" id={id} className='hiddenInput' />}
      {image && <img src={image} alt="Фото профиля" className={styles.image} />}
      <Camera width={40} height={40} className={styles.camera} />
    </label>
  )
}
