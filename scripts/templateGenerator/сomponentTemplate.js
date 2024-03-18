const { firstCharLowerCase } = require("./firstCharChangeCase");

module.exports = (componentName) =>
`import cn from 'classnames';
import styles from '${componentName}.module.scss'

interface ${componentName}Props {
  className?: string;
}

export const ${componentName} = (props: ${componentName}Props) => {
  const { className } = props;

  return (
    <div className={cn(styles.${firstCharLowerCase(componentName)}, className)}>
    
    </div>
  )
}
`;

