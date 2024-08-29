import Styles from './Sidebar.module.css';
import Logo from './Logo';//to comeback to homepage when user clicks on Logo
import AppLayoutNav from './AppLayoutNav';//to navigate to cities/countries
import { Outlet } from 'react-router-dom';//displays Route element for the particular URL.

function Sidebar() {
  return (
    <div className={Styles.sidebar}>
      <Logo></Logo>
      <AppLayoutNav></AppLayoutNav>

      <Outlet></Outlet>
      {/* Outlet contains appLayout's nested component(cities/countries/city/form) to be rendered here dynamically(based on url) */}
      {/* If concept of outlet was not present,then we should have written if-else ladder or switch .(based on url)  */}

      <footer className={Styles.footer}>
        <p className={Styles.copyright}>&copy;Copyright {new Date().getFullYear()} by Sunil</p>
      </footer>
    </div>
  )
}

export default Sidebar
