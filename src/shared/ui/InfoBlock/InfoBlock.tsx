import cn from 'classnames';
import styles from './InfoBlock.module.scss'
import {PropsWithChildren, ReactElement} from "react";
import Truck from '@images/truck-time.svg';
import Edit from '@images/edit.svg';
import Info from '@images/info-circle.svg';
import {Text, TextColor, TextSize, TextWeight} from "@shared/ui/Text";
import {Nullable} from "@shared/lib/globalTypes";

export enum InfoBlockIcons {
  EDIT = 'Edit',
  TRUCK = 'Truck',
  INFO_ICON = 'Info'
}

export enum InfoBlockIconColor {
  ACCENT = 'accent',
  GREY = 'grey'
}

interface InfoBlockProps {
  className?: string;
  icon?: InfoBlockIcons;
  iconColor?: InfoBlockIconColor;
  iconSize?: number;
  titleText: string;
  additionalText: string;
}

export const InfoBlock = (props: PropsWithChildren<InfoBlockProps>) => {
  const {
    className,
    children,
    icon,
    iconColor = InfoBlockIconColor.GREY,
    iconSize,
    titleText,
    additionalText
  } = props;

  const Icon = (): Nullable<ReactElement> => {
    switch (icon) {
      case InfoBlockIcons.INFO_ICON:
        return <Info width={iconSize} height={iconSize} />
      case InfoBlockIcons.TRUCK:
        return <Truck width={iconSize} height={iconSize} />
      case InfoBlockIcons.EDIT:
        return <Edit width={iconSize} height={iconSize} />
      default:
        return null
    }
  };

  return (
    <div className={cn(styles.infoBlock, className)}>
      {icon &&
        <div className={cn(styles.iconWrapper, styles[iconColor])}>
          {Icon()}
        </div>
      }
      <div className={styles.textContent}>
        <Text
          as="p"
          size={TextSize.XL}
          weight={TextWeight.SEMI_BOLD}
        >
          {titleText}
        </Text>
        <Text
          as="p"
          size={TextSize.M}
          weight={TextWeight.REGULAR}
          color={TextColor.GREY}
        >
          {additionalText}
        </Text>
      </div>

      {children}

    </div>
  )
}
