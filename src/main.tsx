
import { createRoot } from 'react-dom/client'
import { ThemeProvider } from 'styled-components'
import App from './App.tsx'
import { GlobalStyle, lightTheme } from './styles/'

createRoot(document.getElementById('root')!).render(
  <>
    <ThemeProvider theme={lightTheme}>
      <GlobalStyle />
    <App />
    </ThemeProvider>
    
  </>
)
