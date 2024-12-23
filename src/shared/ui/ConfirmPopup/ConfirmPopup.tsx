import { useState } from "react";
import { Button, ButtonSize, ButtonTheme } from "../Button"
import { Popup, PopupProps } from "../Popup"
import style from './ConfirmPopup.module.scss'
import { InfoBlock, InfoBlockIconColor, InfoBlockIcons } from "@shared/ui/InfoBlock";

export interface ConfirmPopupProps extends Omit<PopupProps, "children"> {
  confirmText: string
  additionalText?: string
  cancelButtonText?: string
  onCancelButtonClick?: () => void
  confirmButtonText?: string
  onConfirmButtonClick?: () => void
  iconColor?: InfoBlockIconColor
  buttonThemes?: {
    confirm?: ButtonTheme;
    cancel?: ButtonTheme;
  }
}

export const ConfirmPopup = ({
  confirmText,
  additionalText,
  onCancelButtonClick,
  cancelButtonText,
  onConfirmButtonClick,
  confirmButtonText,
  closePopup,
  iconColor,
  buttonThemes,
  ...props
}: ConfirmPopupProps) => {
  const [isLoading, setIsloading] = useState(false)

  const onCancel = () => {
    onCancelButtonClick?.()
    closePopup()
  }

  const onConfirm = async () => {
    if (onConfirmButtonClick) {
      //Проверка является ли функция асинхронной
      //@ts-ignore
      if (onConfirmButtonClick[Symbol.toStringTag] === "AsyncFunction") {
        try {
          setIsloading(true);
          await onConfirmButtonClick();
        }
        catch (e){
          console.log(e);
        }
        finally{
          setIsloading(false);
        }
      }
      else {
        onConfirmButtonClick();
      }
    }
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
          iconColor={iconColor}
        >
          <div className={style.buttons}>
            <Button
              className={style.button}
              theme={buttonThemes?.confirm ?? ButtonTheme.OUTLINE_ALERT}
              size={ButtonSize.S}
              onClick={onConfirm}
              isLoading={isLoading}
            >
              {confirmButtonText || 'Подтвердить'}
            </Button>
            <Button
              className={style.button}
              theme={buttonThemes?.cancel ?? ButtonTheme.ACCENT_WITH_BLACK_TEXT}
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