import Setting from '../setting'
export function useMenuWidth() {
  const r = document.querySelector(':root') as HTMLElement
  const styles = getComputedStyle(r)
  const menuWith = styles.getPropertyValue('--menu-width')
  return parseInt(menuWith)
}

export function useChangeMenuWidth(width: Number) {
  const r = document.querySelector(':root') as HTMLElement
  r.style.setProperty('--menu-width', width + 'px')
  localStorage.setItem(
    'setting-info',
    JSON.stringify(
      Object.assign(Setting, {
        sideWidth: width,
      })
    )
  )
}
