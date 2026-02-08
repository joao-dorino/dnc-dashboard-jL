
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { AppThemeProvider } from './contexts/AppThemeProvider.tsx'
import { GlobalStyle } from './styles/globalStyle.ts'

createRoot(document.getElementById('root')!).render(
  <>
    <AppThemeProvider>  
        <GlobalStyle />
    <App />
    </AppThemeProvider>
    
  </>
)
