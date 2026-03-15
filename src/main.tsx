import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { AppThemeProvider } from './contexts/AppThemeProvider.tsx'
import { GlobalStyle } from './styles/globalStyle.ts'
import { Provider } from 'react-redux'
import store from './redux/slices/index.ts'

createRoot(document.getElementById('root')!).render(
  <>
  <Provider store={store}>
    <AppThemeProvider>  
        <GlobalStyle />
    <App />
    </AppThemeProvider>
  </Provider> 
  </>
)
