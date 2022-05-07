import { useEffect, useState } from 'react'
import { database } from '../services/firebase'

type ThemePage = {
  themePage: boolean
  nameButtonChangeThemePage: string
}

function useThemeControllers() {
  const [stateThemePage, setStateThemePage] = useState<ThemePage>()

  useEffect(() => {
    const themeref = database
      .ref('rooms')
      .child('pageTheme/-N1U1eV23MZXaxtpzuIg')
    themeref.once('value', theme => {
      const themeValue = theme.val()
      console.log(themeValue)

      if (themeValue === true) {
        setStateThemePage({
          themePage: false,
          nameButtonChangeThemePage: 'Tema Dark'
        })
      } else {
        setStateThemePage({
          themePage: true,
          nameButtonChangeThemePage: 'Tema Padrão'
        })
      }
    })
  }, [])
  return stateThemePage
}

export default useThemeControllers
