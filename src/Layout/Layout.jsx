import Navbar from '../components/Navbar';
import { Outlet } from 'react-router-dom';
import Footer from '../components/Footer/Footer';


const Layout = () => {

  return (
    <div className='container mx-auto px-2'>
      {/* Navbar Section */}
      <nav>
      <Navbar></Navbar>
      </nav>

      {/* Main Section */}
      <main>
      <Outlet></Outlet>
      </main>

      {/* Footer Section */}
      <footer>
      <Footer></Footer>
      </footer>
    </div>
  );
}

export default Layout;
