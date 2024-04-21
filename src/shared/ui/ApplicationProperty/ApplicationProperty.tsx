import cn from 'classnames';
import styles from './ApplicationProperty.module.scss'
import {PropsWithChildren, ReactElement} from "react";
import Box from '@images/box.svg';
import Routing from '@images/routing.svg';
import CardCoin from '@images/card-coin.svg';
import Box3d from '@images/3d-cube-scan.svg';
import {Text, TextColor, TextSize, TextWeight} from "@shared/ui/Text";
import {Nullable} from '@shared/lib/globalTypes';

export enum ApplicationIcons {
  BOX = 'Box',
  ROUTING = 'Routing',
  CARD_COIN = 'CardCoin',
  BOX_3D = 'Box3d',
}

export enum ApplicationIconColor {
  ACCENT = 'accent',
  GREY = 'grey'
}

export enum TextPosition {
  ROW = 'textRow',
  COLUMN = 'textCol',
}

interface ApplicationPropertyProps {
  className?: string;
  additionalText?: string;
  additionalTextSize?: TextSize;
  additionalTextColor?: TextColor;
  additionalTextWeight?: TextWeight;
  icon?: ApplicationIcons;
  iconColor?: ApplicationIconColor;
  iconSize?: number;
  textPosition?: TextPosition;
}

export const ApplicationProperty = (props: PropsWithChildren<ApplicationPropertyProps>) => {
  const {
    className,
    children,
    icon,
    iconColor = ApplicationIconColor.GREY,
    additionalText,
    additionalTextSize = TextSize.M,
    additionalTextColor = TextColor.GREY,
    additionalTextWeight = TextWeight.MEDIUM,
    iconSize = 20,
    textPosition = TextPosition.ROW,
  } = props;

  const Icon = (): Nullable<ReactElement> => {
    switch (icon) {
      case ApplicationIcons.BOX:
        return <Box width={iconSize} height={iconSize}/>
      case ApplicationIcons.ROUTING:
        return <Routing width={iconSize} height={iconSize}/>
      case ApplicationIcons.CARD_COIN:
        return <CardCoin width={iconSize} height={iconSize}/>
      case ApplicationIcons.BOX_3D:
        return <Box3d width={iconSize} height={iconSize}/>
      default:
        return null
    }

  };
  return (
    <div className={cn(styles.applicationProperty, className)}>
      {icon &&
        <div className={cn(styles.iconWrapper, styles[iconColor])}>
          {Icon()}
        </div>
      }
      <div className={styles[textPosition]}>
        {children}
        {additionalText &&
          <Text color={additionalTextColor} weight={additionalTextWeight} size={additionalTextSize} className={styles.additionalText}>
            {additionalText}
          </Text>
        }
      </div>
    </div>
  )
}
