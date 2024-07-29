import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Component/login/login';
import Home from './Component/pages/home';
import './App.css';

function App() {
  return (
      <Router>
        <div className='appContainer'>
          <Routes>
            <Route exact path="/" element={<Login />} />
            <Route path="/home/:userId" element={<Home />} />
          </Routes>
        </div>
      </Router>
  );
}

export default App;
