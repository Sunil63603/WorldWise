import { NavLink } from "react-router-dom"//used to navigate to product,pricing and login page
import styles from './PageNav.module.css';
import Logo from '../components/Logo';//to navigate to home page

//This component has been used in home,product,pricing and pageNotFound pages

function PageNav() {
  return (
    <nav className={styles.nav}>
      <Logo></Logo>
      <ul>
        <li><NavLink to='/product'>Product</NavLink></li>
        <li><NavLink to='/pricing'>Pricing</NavLink></li>
        <li><NavLink to='/login' className={styles.ctaLink}>Login</NavLink></li>
      </ul>
    </nav>
  )
}

export default PageNav
