import cn from 'classnames';
import styles from './UploadImageButton.module.scss'
import {Button} from "@shared/ui/Button";
import {PropsWithChildren} from "react";
import DeleteIcon from '@images/trash.svg'
import {Text, TextSize} from "@shared/ui/Text";
import Camera from "@images/camera.svg";

interface UploadImageButtonProps {
  className?: string;
  handleOpenPopup?: () => void
  handleDeleteImage?: () => void
  image?: string | File
}

export const UploadImageButton = (props: PropsWithChildren<UploadImageButtonProps>) => {
  const { className, children, handleOpenPopup, handleDeleteImage, image } = props;

  const imgSource = () =>{
    if (!image) return ""

    if (typeof image === "string") return image

    return URL.createObjectURL(image)
  }

  return (
    <div className={cn(styles.uploadImageButton, className)}>
      <Button onClick={handleOpenPopup} className={styles.open}>
        {image && <img src={imgSource()} alt="Фото профиля" className={styles.image} />}
        <Camera width={24} height={24} className={styles.camera} />
      </Button>
      <Text size={TextSize.L}>{children}</Text>
      <Button
        onClick={handleDeleteImage}
        className={styles.delete}
      >
        <DeleteIcon width={24} height={24} />
      </Button>
    </div>
  )
}
