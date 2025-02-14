import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Home from './pages/User/Home';
import About from './pages/User/About';
import SignIn from './pages/User/SignIn';
import SignUp from './pages/User/SignUp';
import Profile from './pages/User/Profile';
import Header from './components/Header';
import PrivateRoute from './components/PrivateRoute';
import AdminRoute from './components/AdminRoute';
import Adminhome from './pages/Admin/Adminhome';
import Adminlogin from './pages/Admin/Adminlogin';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function MainApp() {
  const location = useLocation();
  const hideHeaderRoutes = ['/admin/login', '/admin/home'];

  return (
    <>
      {!hideHeaderRoutes.includes(location.pathname) && <Header />}
      <ToastContainer />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/signin' element={<SignIn />} />
        <Route path='/signup' element={<SignUp />} />
        <Route element={<PrivateRoute />}>
          <Route path='/profile' element={<Profile />} />
        </Route>
        <Route path='/admin/login' element={<Adminlogin />} />
        <Route element={< AdminRoute />}>
          <Route path='/admin/home' element={<Adminhome />} />
        </Route>
      </Routes>
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <MainApp />
    </BrowserRouter>
  );
}
