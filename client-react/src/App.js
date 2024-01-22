import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './components/home/HomePage';
import LoginPage from './components/login/LoginPage';
import OnboardingPage from './components/home/tabPanels/OnboardingPage';
import VisaPage from './components/home/tabPanels/VisaPage';
import ProfilePage from './components/home/tabPanels/ProfilePage';
import { Provider } from 'react-redux';
import store from './components/home/redux/store';
import { createTheme, ThemeProvider } from '@mui/material/styles';
const theme = createTheme({
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
        },
      },
    },
    // 可以添加其他组件的样式定制
  },
});
function App() {

  return (<ThemeProvider theme={theme}>
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<Navigate replace to="/login" />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/home" element={<HomePage />}>
            <Route path="profile" element={<ProfilePage />} />
            <Route path="onboarding" element={<OnboardingPage />} />
            <Route path="visa" element={<VisaPage />} />
          </Route>
        </Routes>
      </Router>
    </Provider>
  </ThemeProvider >
  )
}

export default App
