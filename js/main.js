const darkModeBtn = document.querySelector('.dark-mode-btn')

// 1). 1-вариант Проверка темной темы на уровне системных настроек windows(то есть настройки вашего копьютера)
if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
  darkModeBtn.classList.add('dark-mode-btn_active')
  document.body.classList.add('dark')
}

// 2). Проверка темной темы в localStorage если пользователь вручную меняет тему на сайте. Этот способ должен быть приоритетным над 1 способом
if (localStorage.darkMode === 'dark') {
  darkModeBtn.classList.add('dark-mode-btn_active')
  document.body.classList.add('dark')
} else if (localStorage.darkMode === 'light') {
  darkModeBtn.classList.remove('dark-mode-btn_active')
  document.body.classList.remove('dark')
}

//3). 2-вариант с систеными настройками это установка слушателя
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
  const colorScheme = e.matches ? 'dark' : 'light'

  switch (colorScheme) {
    case 'dark':
      darkModeBtn.classList.add('dark-mode-btn_active')
      document.body.classList.add('dark')
      localStorage.setItem('darkMode', 'dark') // принудительно изменит 2 способ так как пользователь меняет принудительно у себя настройки
      break
    case 'light':
      darkModeBtn.classList.remove('dark-mode-btn_active')
      document.body.classList.remove('dark')
      localStorage.setItem('darkMode', 'light')
      break
    default:
      throw new Error(`Неправильный тип действия: ${colorScheme}`)
  }
})

// Включение ночного режима по кнопке
darkModeBtn.onclick = () => {
  darkModeBtn.classList.toggle('dark-mode-btn_active')
  const isDark = document.body.classList.toggle('dark')

  if (isDark) {
    localStorage.setItem('darkMode', 'dark')
  } else {
    localStorage.setItem('darkMode', 'light')
  }
}
