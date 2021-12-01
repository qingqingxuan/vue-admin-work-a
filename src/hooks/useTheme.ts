export function changeCssVar(propName: string, value: any) {
  const r = document.querySelector(':root') as HTMLElement
  r.style.setProperty(propName, value)
}
export default function (element: HTMLElement, className: 'light' | 'dark' = 'light') {
  if (!element) {
    return
  }
  let classString = element.className
  const clazz = classString.split(' ').filter((it) => it !== 'light' && it !== 'dark')
  clazz.push(className)
  classString = clazz.join(' ')
  element.className = classString
  if (className === 'light') {
    changeCssVar('--border-color', '#f5f5f5')
  } else {
    changeCssVar('--border-color', '#333333')
  }
}
