import { Link } from 'react-router-dom';

const Navigation = () => {
    return (
        <nav className='main-nav'>
            <Link to="/" className="main-nav-logo">
                <img src='/images/argentBankLogo.png' alt='Argent Bank Logo' className="main-nav-logo-image" />
                <h1 className="sr-only">Argent Bank</h1>
            </Link>
      </nav>
    );
};

export default Navigation;