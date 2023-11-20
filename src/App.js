import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Registration from './components/Registration';
import Login from './components/Login';
import Files from './components/Files';
import { useSelector } from 'react-redux'
import PrivateRoute from './components/PrivateRoute';


function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/registration" element={<Registration />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Home />} />
          <Route exact path='/files' element={<PrivateRoute/>}>
            <Route exact path='/files' element={<Files/>}/>
          </Route>
        </Routes>
      </div>
    </Router>
  );
}


export default App;

