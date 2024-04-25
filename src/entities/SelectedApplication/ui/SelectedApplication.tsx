import cn from 'classnames';
import styles from './SelectedApplication.module.scss'
import { CardContainer } from "@shared/ui/CardContainer";
import { CloseButton } from "@shared/ui/CloseButton";
import { useDispatch, useSelector } from "react-redux";
import { SelectedApplicationSelectors } from "@entities/SelectedApplication/model/SelectedApplication.selectors";
import { clearSelectedApplication } from "@entities/SelectedApplication/model/SelectedApplication.slice";
import { ApplicationContent } from "@entities/SelectedApplication/ui/ApplicationContent";

interface SelectedApplicationProps {
  className?: string;
}

export const SelectedApplication = (props: SelectedApplicationProps) => {
  const { className } = props;
  const dispatch = useDispatch();

  const selectedApplications = useSelector(SelectedApplicationSelectors.selectSelectedApplication);

  if (!selectedApplications.length) return null;

  return (
    <CardContainer className={cn(styles.selectedApplication, className)}>
      <CloseButton className={styles.close} onClick={() => dispatch(clearSelectedApplication())} />
      {selectedApplications.map((application) => (
        <ApplicationContent key={application.id} application={application} />
      ))}
    </CardContainer>
  )
}
