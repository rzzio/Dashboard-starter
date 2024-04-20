import './App.css'
import './pages/Home'
 import { BrowserRouter,Routes,Route,Navigate } from 'react-router-dom';
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


function App() {
  return (
    // <div className="App">
    //  <div className="AppGlass">

    //   <Sidebar/>
    //   <MainDash/>
      
    //  </div>
    // </div>

    <div>
   <BrowserRouter>
   <Routes>
    <Route index element={<Login />}/>   // Load this compoinent 1st


    <Route path='/dashboard' element={<Home />}/>


    
    <Route path='/tickets' element={<Ticket />}/>
    <Route path= '/users' element={<Users />} />
    <Route path= '/it-technicians' element={<Admins />} />
    <Route path= '/login' element={<Login />} />
    <Route path= '/tempticket' element={<TicketViewTempPage />} />
    <Route path= 'create-ticket' element={<TicketCreation />} />





    <Route path='*' element={<Nopage/>} /> 



   </Routes>
   </BrowserRouter>
    </div>
  );
}

export default App;
