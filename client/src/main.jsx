import { createRoot } from 'react-dom/client';
import MainRouter from './Routers/MainRouter';
import { BrowserRouter } from 'react-router-dom';


// import Animation from './Animation.jsx';

createRoot(document.getElementById('root')).render(
  // <Animation />
  <BrowserRouter>
        <MainRouter/>
  </BrowserRouter>

  
);
