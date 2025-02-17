export const disableScrollingOptimization = () => {
  const div = document.createElement('div')
  div.style.height = '0px'
  div.style.overflow = 'hidden'
  document.body.appendChild(div)

  const update = () => {
    div.textContent = window.scrollY.toFixed(0)
  }

  window.addEventListener('scroll', update, {
    passive: true,
    capture: true,
  })

  return () => {
    window.removeEventListener('scroll', update, { capture: true })
    document.body.removeChild(div)
  }
}
