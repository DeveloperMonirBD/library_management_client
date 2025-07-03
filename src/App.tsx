import { Outlet } from 'react-router';
import Navbar from './components/Layout/Navbar';
import Footer from './pages/Footer';

function App() {
    return (
        <>
            <Navbar />
            <div className="max-w-7xl mx-auto px-4 py-8 min-h-[calc(100vh-154px)]">
                <Outlet />
            </div>
            <Footer />
        </>
    );
}

export default App;
