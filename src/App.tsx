import { Outlet } from 'react-router';
import Navbar from './components/Layout/Navbar';

function App() {
    return (
        <>
            <Navbar />
            <div className='max-w-7xl mx-auto px-4 py-8'>
                <Outlet />
            </div>
        </>
    );
}

export default App;
