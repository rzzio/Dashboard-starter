import './App.css'
import './pages/Home'
 import { BrowserRouter,Routes,Route,Navigate } from 'react-router-dom';
// import MainDash from './components/MainDash/MainDash';
// import Sidebar from './components/sidebar/Sidebar';
import Home from './pages/Home';
import Ticket from './pages/Ticket';
import Nopage from './pages/NoPage';

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
    <Route index element={<Home />}/>
    <Route path='/dashboard' element={<Home />}/>


    
    <Route path='/tickets' element={<Ticket />}/>






    <Route path='*' element={<Nopage/>} />
   </Routes>
   </BrowserRouter>
    </div>
  );
}

export default App;
