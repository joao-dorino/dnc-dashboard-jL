
import { createRoot } from 'react-dom/client'
import { ThemeProvider } from 'styled-components'
import App from './App.tsx'
import { GlobalStyle, lighTheme } from './styles/'

createRoot(document.getElementById('root')!).render(
  <>
    <ThemeProvider theme={lighTheme}>
      <GlobalStyle />
    <App />
    </ThemeProvider>
    
  </>
)
