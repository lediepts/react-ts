import { createTheme, ThemeProvider } from '@mui/material'
import { jaJP } from '@mui/material/locale'
import { useMemo } from 'react'

interface Props {
  children: any
}

export default function MaterialProvider({ children }: Props) {
  const theme = useMemo(() => {
    return createTheme(
      {
        palette: {},
        mixins: {
          toolbar: {
            height: 45,
          },
        },
        components: {},
      },
      jaJP
    )
  }, [])
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>
}
