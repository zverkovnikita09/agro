import cn from 'classnames';
import styles from './Document.module.scss'
import {CardContainer} from "@shared/ui/CardContainer";
import {StatusBadge, StatusType} from "@shared/ui/StatusBadge";
import {Button, ButtonSize, ButtonTheme} from "@shared/ui/Button";
import {Title, TitleSize} from "@shared/ui/Title";
import {DocumentOnSign} from "@entities/Document/model/document.model";
import {useSendData} from "@shared/hook/useSendData";
import {addNotification, NotificationType} from "@entities/Notifications";
import {useAppDispatch} from "@src/app/store/model/hook";

interface DocumentProps extends DocumentOnSign {
  className?: string;
}

export const Document = (props: DocumentProps) => {
  const {className, is_signed, path_url, name, path} = props;

  const dispatch = useAppDispatch();

  const { handleSendData, isSending } = useSendData(
    {
      url: `/api/v1/sign-me`,
      withAuthToken: true,
      onSuccess: (response) => {
        if (!response.message.includes('https')) {
          return dispatch(addNotification({ message: response.message, type: NotificationType.Error }))
        }

        const link = document.createElement('a');
        link.href = response.message;
        link.setAttribute('target', '_blank');
        link.click();
        link.remove();

      },
      onError: (error) => {
        dispatch(addNotification({ message: error.message, type: NotificationType.Error }))
      }
    }
  )

  return (
    <a href={path_url} target="_blank" className={cn(styles.document, className)}>
      <CardContainer className={styles.documentLink}>
        <div className={styles.mainInfo}>
          <Title as={"h5"} size={TitleSize.DOCUMENT_TITLE} className={styles.title}>{name ?? 'Безымянный документ'}</Title>
          {/*<Text color={TextColor.GREY}>На перевозку пшеницы 4-класса. Ростов-на-Дону - Адыгея</Text>*/}
        </div>
        {/*<div className={styles.statusBlock}>*/}
          <StatusBadge className={styles.statusBadge} status={is_signed ? StatusType.COMPLETE : StatusType.INACTIVE}>
            {is_signed ? 'Подписан' : 'Не подписан'}
          </StatusBadge>
          {!is_signed &&
            <Button
              className={styles.btn}
              theme={ButtonTheme.ACCENT_WITH_BLACK_TEXT}
              size={ButtonSize.S}
              onClick={(e: any) => {
                e.stopPropagation();
                e.preventDefault();
                handleSendData({path: path});
              }}
              isLoading={isSending}
            >
              Подписать
            </Button>
          }
        {/*</div>*/}
      </CardContainer>
    </a>
  )
}
