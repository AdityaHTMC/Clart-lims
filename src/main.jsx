import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import "./assets/scss/app.scss";
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './Redux/Store.jsx'
import "react-datepicker/dist/react-datepicker.css";
import { AuthProvider } from './helper/AuthProvider.jsx'
import { CategoryProvider } from './helper/CategoryProvider.jsx'
import { CommonProvider } from './helper/CommonProvider.jsx';
import { CMsProvider } from './helper/CmsProvider.jsx';
import { DashboardProvider } from './helper/DashboardProvider.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <AuthProvider>
          <CommonProvider>
            <CategoryProvider>
              <CMsProvider>
                <DashboardProvider>
                  <App />
                </DashboardProvider>
              </CMsProvider>
            </CategoryProvider>
          </CommonProvider>
        </AuthProvider>
      </Provider>
    </BrowserRouter>
  </StrictMode>,
)
