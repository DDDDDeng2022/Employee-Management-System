import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './components/home/HomePage';
import LoginPage from './components/login/LoginPage';
import OnboardingPage from './components/home/tabPanels/OnboardingPage';
import VisaPage from './components/home/tabPanels/VisaPage';
import ProfilePage from './components/home/tabPanels/ProfilePage';
import GoBackPage from './components/home/tabPanels/GoBackPage';
import { useSelector } from "react-redux";
import HiringManagementPage from './components/home/tabPanels/HRpages/HiringManagementPage';
import VisaManagementPage from './components/home/tabPanels/HRpages/VisaManagementPage';
import EmployeeProfilesPage from './components/home/tabPanels/HRpages/EmployeeProfilesPage';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import DetailedProfilePage from './components/home/tabPanels/HRpages/DetailedProfilePage';
import ApplicationPage from './components/home/tabPanels/HRpages/hiringPages/ApplicationPage';
import SignupPage from './components/login/SignupPage';
const theme = createTheme({
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
        },
      },
    },
  },
});
function App() {
  const profile = useSelector((state) => state.myProfile.profile);
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Routes>
          <Route path="/" element={<Navigate replace to="/login" />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup/:token" element={<SignupPage />} />
          <Route path="/home" element={<HomePage />}>
            <Route path="profile" element={Object.keys(profile).length === 1 ? <GoBackPage /> : <ProfilePage />} />
            <Route path="onboarding" element={<OnboardingPage />} />
            <Route path="visa" element={Object.keys(profile).length === 1 ? <GoBackPage /> : <VisaPage />} />
            {/* Hr页面 todo protected url*/}
            {/* <Route path="profile" element={<ProfilePage />} /> */}
            <Route path="employee" element={<EmployeeProfilesPage />}>
              <Route path=':id' element={<DetailedProfilePage />} />
            </Route>

            <Route path="visaManagement" element={<VisaManagementPage />} />
            <Route path="hiring" element={<HiringManagementPage />} >
              <Route path=":id" element={<ApplicationPage />} >
              </Route>
            </Route>
          </Route>
        </Routes>
      </Router>
    </ThemeProvider >

  )
}

export default App