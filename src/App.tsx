import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './Pages/Home';
import Translations from './Pages/Translations';
import Sidebar from './Components/Sidebar/Sidebar';
import './Scss/App.scss';
import Roles from './Pages/Roles';
import Users from './Pages/Users';
import Elastic from './Pages/Elastic';


const App: React.FC = () => {
  return (
    <BrowserRouter>
      <div className="Container">
        <Sidebar />
        <div className="Content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/translations" element={<Translations />} />
            <Route path="/roles" element={<Roles />} />
            <Route path="/users" element={<Users />} />
            <Route path="/elastic" element={<Elastic />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
