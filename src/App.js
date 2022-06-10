import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Wallet from './pages/Wallet/Wallet';
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
    </>
  );
}

export default App;
