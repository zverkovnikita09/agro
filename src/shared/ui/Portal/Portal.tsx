import { useState, useEffect, FC } from 'react'
import { createPortal } from 'react-dom';

interface PortalProps {
  children: React.ReactNode
}

export const Portal: FC<PortalProps> = ({ children }) => {
  const [container] = useState(() => {
    return document.createElement('div');
  });

  useEffect(() => {
    document.body.appendChild(container)
    return () => {
      document.body.removeChild(container)
    }
  }, [])

  return createPortal(children, container)
}