export const isTablet = (windowWidth: number) => {
  if (windowWidth <= 992) return true

  return false
}

export const isMobile = (windowWidth: number) => {
  if (windowWidth <= 768) return true

  return false
}

export const isMobileSmall = (windowWidth: number) => {
  if (windowWidth <= 480) return true

  return false
}

export const isTouchDevice = () => {
  return (('ontouchstart' in window) ||
    (navigator.maxTouchPoints > 0));
}