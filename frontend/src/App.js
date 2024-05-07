import './App.css'
import './pages/Home'
 import {Routes, Route, Outlet, Navigate, BrowserRouter, useLocation} from 'react-router-dom';
// import MainDash from './components/MainDash/MainDash';
// import Sidebar from './components/sidebar/Sidebar';
import Home from './pages/Home';
import Ticket from './pages/Ticket';
import Nopage from './pages/404';
import Users from './pages/Users'
import Admins from './pages/Admins'
import Login from './pages/Login';
import TicketViewTempPage from './pages/TicketViewTempPage';
import TicketCreation from './pages/TicketCreation'
import AuthConsumer, {AuthProvider} from "./context/authContext";
import Register from "./pages/Register";


function App() {
  return (
<BrowserRouter>
      <AuthProvider>
         <Routes>
             <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/login" element={<Login/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/" element={<RequireAuth/>}>
           <Route path="/dashboard" element={<Home/>}/>
           <Route path="/tickets" element={<Ticket/>}/>
              <Route path="/users" element={<RequireAdmin ><Users/> </RequireAdmin>}/>
              <Route path="/it-technicians" element={<RequireSuperAdmin> <Admins/> </RequireSuperAdmin>}/>
           <Route path="/tempticket" element={<TicketViewTempPage/>}/>
           <Route path="/create-ticket" element={<TicketCreation/>}/>
           <Route path="*" element={<Nopage/>}/>
          </Route>
         </Routes>
      </AuthProvider>
</BrowserRouter>
  );
}

function RequireAuth() {
 const {authed} = AuthConsumer();
 const location = useLocation();
 const loggedIn = sessionStorage.getItem('loggedIn') === "true"
 return loggedIn || authed ? <Outlet />: <Navigate to="/login" replace state={{ path: location.pathname }}/>;
}

function RequireSuperAdmin({ children }){
    const isSuperAdmin = sessionStorage.getItem('isSuperAdmin') === "true"
    return isSuperAdmin ? children: <Navigate to="/login" />;
}

function RequireAdmin({children}){
    const isSuperAdmin = sessionStorage.getItem('isSuperAdmin') === "true"
    const isTechnician = sessionStorage.getItem('isTechnician') === "true"
    return isSuperAdmin || isTechnician ? children: <Navigate to="/login" />;
}


export default App;
