import Menu from './routers/menu';
import { Outlet } from 'react-router-dom';
import './App.css';


function App() {
  return (
    <>
      <div id="sidebar">
        <nav>
          <Menu />
        </nav>
      </div>
      <div id="detail">
        <Outlet />
      </div>
    </>
  );
}

export default App;
