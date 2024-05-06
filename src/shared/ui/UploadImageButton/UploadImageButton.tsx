import cn from 'classnames';
import styles from './UploadImageButton.module.scss'
import { Button } from "@shared/ui/Button";
import { PropsWithChildren } from "react";
import DeleteIcon from '@images/trash.svg'
import { Text, TextSize } from "@shared/ui/Text";
import Camera from "@images/camera.svg";
import Check from '@images/check.svg'

interface UploadImageButtonProps {
  className?: string;
  handleOpenPopup?: () => void
  handleDeleteImage?: () => void
  hasImage?: boolean
}

export const UploadImageButton = (props: PropsWithChildren<UploadImageButtonProps>) => {
  const { className, children, handleOpenPopup, handleDeleteImage, hasImage } = props;

  return (
    <div className={cn(styles.uploadImageButton, className, { [styles.hasImage]: hasImage })}>
      <Button onClick={handleOpenPopup} className={styles.open}>
        {hasImage && <Check height={24} width={24} className={styles.image} />}
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
