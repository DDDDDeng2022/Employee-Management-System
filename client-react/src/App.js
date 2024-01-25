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
import ErrorHandlePage from './ErrorHandle';
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
            <Route path="onboarding" element={<ProtectedRoute element={<OnboardingPage />} allowedRole="Employee" />} />
            <Route path="visa" element={<ProtectedRoute element={Object.keys(profile).length === 1 ? <GoBackPage /> : <VisaPage />} allowedRole="Employee" />} />
            {/* Hr页面 todo protected url*/}
            <Route path="employee" element={<ProtectedRoute element={<EmployeeProfilesPage />} allowedRole="HR" />} >
              <Route path=':id' element={<DetailedProfilePage />} />
            </Route>
            <Route path="visaManagement" element={<ProtectedRoute element={<VisaManagementPage />} allowedRole="HR" />} >
            </Route>
            <Route path="hiring" element={<ProtectedRoute element={<HiringManagementPage />} allowedRole="HR" />} >
              <Route path=":id" element={<ApplicationPage />} ></Route>
            </Route>
          </Route>
          <Route path="*" element={<ErrorHandlePage />} />
        </Routes>
      </Router>
    </ThemeProvider >

  )
}

const ProtectedRoute = ({ element, allowedRole }) => {
  const role = useSelector((state) => state.user.role);
  return role === allowedRole ? element : <Navigate to="*" />;
};

export default App