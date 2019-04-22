const widthPlugin = (prevInfo, newInfo) => {
  const viewWidth = window.innerWidth

  if (viewWidth !== prevInfo.width) {
    newInfo.width = viewWidth
    return true
  }
  return false
}

export { widthPlugin }
