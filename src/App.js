import { BrowserRouter, Route, Routes } from 'react-router-dom';
import WalletCard from './components/WalletCard/WalletCard';
import Cards from './pages/Cards/Cards';
import Navbar from './components/layout/Navbar/Navbar';
import Explore from './pages/Explore/Explore';

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' element={<Explore />} />
          <Route path='/cards' element={<Cards />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
