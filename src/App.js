import './App.css';
import { BrowserRouter as Router,Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Income from './pages/Income'
import { Context } from './context/MyContext';
import { Transaction } from './pages/Transaction';
import { ScrollToTop } from './components/ScrollToTop';
import Year from './pages/Year';

function App() {
  return (

    <Context>
      <Router>
        <ScrollToTop/>
        <Routes>
          <Route path='/' element={<Home/>}></Route>
          <Route path='/income' element={<Income/>}></Route>
          <Route path='/transaction' element={<Transaction/>}></Route>
          <Route path='/year' element={<Year/>}></Route>
        </Routes>
      </Router>
    </Context>
  );
}

export default App;
