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
      <div className='mt-[105px]'>
        {/* Main Section */}
        <main>
          <Outlet></Outlet>
        </main>

        {/* Footer Section */}
        <footer>
          <Footer></Footer>
        </footer>
      </div>
    </div>
  );
}

export default Layout;
