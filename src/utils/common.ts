export const getRandomColor = (): string => {
  return `#${(Math.floor(Math.random() * 0xffffff)).toString(16)}`
}
