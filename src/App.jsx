import './App.css';
import { Header } from './components/Header/Header';
import { Home } from './pages/Home/Home';
import { SingleProduct } from './pages/SingleProduct/SingleProduct';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Router>
        <div className="App">
            <Header/>
            <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/product/:id' element={<SingleProduct />} />
            </Routes>
        </div>
    </Router>
  );
}

export default App;
