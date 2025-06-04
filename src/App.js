
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';

import VerkList from './VerkList';
import Home from './pages/home'


  
function App() {

  return (
      <Router>
        <Routes>
          {/*Always accessible pages */}
          <Route index element={<VerkList />} /> {/*Default end point "/" */}
          <Route path='/home' element={<VerkList />} />          
          <Route path='/verk' element={<VerkList />} />

           {/*<Route path='*' element={<NoPage />} /> Catch wrong URL end points to a error page */}
        </Routes>
      </Router>
    
  );
}

export default App;


