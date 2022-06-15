import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { HeroesProvider } from './context/HeroesContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Wallet from './pages/Wallet/Wallet';
import Cards from './pages/Cards/Cards';
import Navbar from './components/layout/Navbar/Navbar';
import Home from './pages/Home/Home';
import NFTList from './pages/NFTList/NFTList';
import CardDetail from './pages/CardDetail/CardDetail';
import UpButton from './components/layout/UpButton/UpButton';

function App() {
  return (
    <HeroesProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/cards' element={<Cards />} />
          <Route path='/cards/:cardId' element={<CardDetail />} />
          <Route path='/wallet' element={<Wallet />} />
          <Route path='/wallet/nft-list' element={<NFTList />} />
        </Routes>
        <UpButton />
        <ToastContainer
          position='top-center'
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          theme='dark'
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </BrowserRouter>
    </HeroesProvider>
  );
}

export default App;
