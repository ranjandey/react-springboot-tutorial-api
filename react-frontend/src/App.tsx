import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, Route, Routes } from 'react-router-dom';
import TutorialList from './components/TutorialList';
import AddTutorial from './components/AddTutorial';
import Tutorial from './components/Tutorial';

function App() {
  return (
    <div className="App">
      <nav className='navbar navbar-expand navbar-dark bg-dark'>
        <a href='/tutorials' className='navbar-brand'>
          aimers
        </a>
        <div className='navbar-nav mr-auto'>
        <li className="nav-item">
            <Link to={"/tutorials"} className="nav-link">
              Tutorials
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/add"} className="nav-link">
              Add
            </Link>
          </li>
        </div>
      </nav>
      <div>
        <Routes>
          <Route path='/' element={<TutorialList/>}/>
          <Route path='/tutorials' element={<TutorialList/>}/>
          <Route path='/add' element={<AddTutorial/>}/>
          <Route path='/tutorial/:id' element={<Tutorial/>}/>
        </Routes>
      </div>
      
    </div>
  );
}

export default App;
