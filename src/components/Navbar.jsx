import './Navbar.css'
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (

<nav className='navbar'>
        <div className='navbar_navigation'>
            <ul className='nav_sections'>
                <li>
                    <Link to="/">Welkom</Link>
                </li>
                <li>
                    <a href="http://localhost:3001">Boeken</a>
                </li>
                <li>
                    <Link to="/Info">Info</Link>
                </li>
            </ul>
        </div>
</nav>
    )
}

export default Navbar;