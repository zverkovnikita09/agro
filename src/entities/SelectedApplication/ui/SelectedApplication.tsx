import cn from 'classnames';
import styles from './SelectedApplication.module.scss'
import {CardContainer} from "@shared/ui/CardContainer";
import {Title, TitleSize} from "@shared/ui/Title";
import {CloseButton} from "@shared/ui/CloseButton";
import {useDispatch, useSelector} from "react-redux";
import {SelectedApplicationSelectors} from "@entities/SelectedApplication/model/SelectedApplication.selectors";
import {Text, TextColor, TextSize} from "@shared/ui/Text";
import {TrailBlock} from "@shared/ui/TrailBlock";
import {ApplicationIcons, ApplicationProperty} from "@shared/ui/ApplicationProperty";
import {Button, ButtonSize, ButtonTheme} from "@shared/ui/Button";
import {Link} from "react-router-dom";
import {RouterPaths} from "@src/app/router";
import Eye from "@images/eye.svg";
import {clearSelectedApplication} from "@entities/SelectedApplication/model/SelectedApplication.slice";
import {ViewCount} from "@shared/ui/ViewCount";
import {ApplicationContent} from "@entities/SelectedApplication/ui/ApplicationContent";

interface SelectedApplicationProps {
  className?: string;
  withButtons?: boolean;}

export const SelectedApplication = (props: SelectedApplicationProps) => {
  const { className } = props;
  const dispatch = useDispatch();

  const selectedApplications =  useSelector(SelectedApplicationSelectors.selectSelectedApplication);

  if (!selectedApplications.length) return null;

  return (
    <CardContainer className={cn(styles.selectedApplication, className)}>
      <CloseButton className={styles.close} onClick={() => dispatch(clearSelectedApplication())}/>
      {selectedApplications.map((application) => (
        <ApplicationContent key={application.id} application={application} withButtons />
      ))}

    </CardContainer>
  )
}
