type Titles = [
  string,
  string,
  string,
]

export const labelsCounterFormatter = (viewsCount: number, titles: Titles): string => {
  if (viewsCount % 10 === 1 && viewsCount % 100 !== 11) {
    return `${viewsCount} ${titles[0]}`
  } else if (viewsCount % 10 >= 2 && viewsCount % 10 <= 4 && (viewsCount % 100 < 10 || viewsCount % 100 >= 20)) {
    return `${viewsCount} ${titles[1]}`
  }
  return `${viewsCount} ${titles[2]}`
}
