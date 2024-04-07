import {Popup} from "@shared/ui/Popup";
import CheckedIcon from "@images/check-broken.svg";
import styles from "./NewApplication.module.scss";
import cn from "classnames";
import {Text, TextColor, TextSize, TextWeight} from "@shared/ui/Text";

interface SuccessPopupProps {
  className?: string;
  isActive: boolean;
  onClose: () => {};
}

export const SuccessPopup = (props: SuccessPopupProps) => {
  const {className, isActive, onClose} = props;

  return (
    <Popup isActive={isActive} closePopup={onClose}>
      <div className={cn(styles.successPopup, className)}>
        <CheckedIcon width={46} height={40}/>
        <div className={styles.successContent}>
          <Text
            as={"p"}
            size={TextSize.XL}
            weight={TextWeight.SEMI_BOLD}
          >
            Заявка №43 создана
          </Text>
          <Text
            as={"p"}
            size={TextSize.M}
            weight={TextWeight.MEDIUM}
            color={TextColor.GREY}
          >
            Вы успешно создали заявку, она скоро появится в общем списке
          </Text>
        </div>
      </div>
    </Popup>
  )
}