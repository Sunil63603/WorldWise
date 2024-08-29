import { NavLink } from 'react-router-dom';
import Styles from './AppLayoutNav.module.css';

function AppLayoutNav() {
  return (
    <nav className={Styles.nav}>
      <ul>
        <li><NavLink to='cities'>Cities</NavLink></li>
        <li><NavLink to='countries'>Countries</NavLink></li>
      </ul>
    </nav>
  )
}

export default AppLayoutNav
