import { Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar/Navbar'
import Home from './pages/Home';
import Login from './components/Login/Login';
import useToken from './components/Login/useToken';
import { GetProduct } from './components/Product/GetProduct';
import AddProduct from './components/Product/AddProduct';
import { GetOrder } from './components/Order/GetOrder';
function App() {
  const { token, setToken } = useToken();

	if (!token) {
		return <Login setToken={setToken} />
	}
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path='/products' element={<GetProduct />} />
        <Route path='/add-product' element={<AddProduct />} />
        <Route path='/orders' element={<GetOrder />} />
      </Routes>
    </>
  );
}

export default App;
