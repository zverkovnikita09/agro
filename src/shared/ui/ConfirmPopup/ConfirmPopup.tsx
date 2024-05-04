import {Button, ButtonSize, ButtonTheme} from "../Button"
import {Popup, PopupProps} from "../Popup"
import style from './ConfirmPopup.module.scss'
import {InfoBlock, InfoBlockIcons} from "@shared/ui/InfoBlock";

export interface ConfirmPopupProps extends Omit<PopupProps, "children"> {
  confirmText: string
  additionalText?: string
  cancelButtonText?: string
  onCancelButtonClick?: () => void
  confirmButtonText?: string
  onConfirmButtonClick?: () => void
}

export const ConfirmPopup = ({
  confirmText,
  additionalText,
  onCancelButtonClick,
  cancelButtonText,
  onConfirmButtonClick,
  confirmButtonText,
  closePopup,
  ...props
}: ConfirmPopupProps) => {

  const onCancel = () => {
    onConfirmButtonClick?.();
    closePopup()
  }

  const onConfirm = () => {
    onCancelButtonClick?.()
    closePopup()
  }

  return (
    <Popup {...props} closePopup={closePopup}>
      <div className={style.confirmPopup}>
        <InfoBlock
          titleText={confirmText}
          additionalText={additionalText}
          icon={InfoBlockIcons.INFO_ICON}
          iconSize={46}
        >
          <div className={style.buttons}>
            <Button
              className={style.button}
              theme={ButtonTheme.OUTLINE_ALERT}
              size={ButtonSize.S}
              onClick={onConfirm}
            >
              {confirmButtonText || 'Подтвердить'}
            </Button>
            <Button
              className={style.button}
              theme={ButtonTheme.ACCENT_WITH_BLACK_TEXT}
              size={ButtonSize.S}
              onClick={onCancel}
            >
              {cancelButtonText || 'Отменить'}
            </Button>
          </div>
        </InfoBlock>
      </div>
    </Popup>
  )
}