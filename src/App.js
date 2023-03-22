import AddEvents from './components/AddEvents';
import Events from './components/Events';
import NavBar from './components/NavBar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './components/login/Register';

function App() {
  return (
    <div className="container">
      <Router>
        <Routes>
          <Route path="/register" element={
            <div className='mt-5'>
               <div><Register /></div>
            </div>
          } />
          <Route path="/" element={
            <div className="row">
              <div className="col-8">
                <Events />
              </div>
              <div className="col-4">
                <AddEvents />
              </div>
            </div>
          } />
        </Routes>
        <NavBar />



      </Router>


    </div>
  );
}

export default App;
