import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ContractProvider } from './context/HeroesContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Wallet from './pages/Wallet/Wallet';
import Cards from './pages/Cards/Cards';
import Navbar from './components/layout/Navbar/Navbar';
import Home from './pages/Home/Home';

function App() {
  return (
    <ContractProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/cards' element={<Cards />} />
          <Route path='/wallet' element={<Wallet />} />
        </Routes>
        <ToastContainer
          position='top-right'
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </BrowserRouter>
    </ContractProvider>
  );
}

export default App;
