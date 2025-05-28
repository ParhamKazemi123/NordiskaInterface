
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';

import Verk from './pages/verk';
import Home from './pages/home'


  
function App() {

  return (
      <Router>
        <Routes>
          {/*Always accessible pages */}
          <Route index element={<Home />} /> {/*Default end point "/" */}
          <Route path='/home' element={<Home />} />          
          <Route path='/verk' element={<Verk />} />

           {/*<Route path='*' element={<NoPage />} /> Catch wrong URL end points to a error page */}
        </Routes>
      </Router>
    
  );
}

export default App;
