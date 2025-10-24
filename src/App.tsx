import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './Pages/Home';
import Translations from './Pages/Translations';
import Sidebar from './Components/Sidebar/Sidebar';
import './Scss/App.scss';
import { TranslationsProvider } from './Context/TranslationsContext';

const App: React.FC = () => {
  return (
    <BrowserRouter>
    <TranslationsProvider>
      <div className="Container">
        <Sidebar />
        <div className="Content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/translations" element={<Translations />} />
          </Routes>
        </div>
      </div>
    </TranslationsProvider>
    </BrowserRouter>
  );
}

export default App;
