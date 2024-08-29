import Styles from "./AppLayout.module.css";
import Sidebar from "../components/Sidebar.jsx"; //cityList,city,countries,form->(4) components are mounted and unmounted in the sidebar.
import Map from "../components/Map.jsx"; //map is always displayed(mounted) on screen.So,theres no 'path' for map.
import User from "../components/User.jsx"; //to display user photo,welcome , name and log out button.

function AppLayout() {
  return (
    <div className={Styles.app}>
      {/*nested routes of appLayout are rendered in Sidebar*/}
      <Sidebar></Sidebar>
      <Map></Map>
      <User></User>
    </div>
  );
}

export default AppLayout;
