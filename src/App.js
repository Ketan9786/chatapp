import Home  from './components/Home';


import { BrowserRouter as Router,Routes, Route, Link } from 'react-router-dom';
import './App.css';


function App() {
  return (
    <Router>
    <Routes>
    
<Route exact path='/' element={< Home/>}></Route>
<Route  path='/home' element={< Home />}></Route>

</Routes>
   </Router>
  );
}

export default App;
