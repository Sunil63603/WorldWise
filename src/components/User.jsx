import styles from "./User.module.css";

import { useCustomAuthContext } from "../context/FakeAuthContext"; //to read and display 'user' object
import { useNavigate } from "react-router-dom"; //to navigate back to home page when user clicks on logout

function User() {
  const navigate = useNavigate();

  const { user } = useCustomAuthContext(); //to display details of user(on map)
  const { logout } = useCustomAuthContext(); //when user clicks on logout button

  function handleLogout() {
    logout(); //no parameters required
    navigate("/"); //home page
  }

  return (
    <div className={styles.user}>
      <img src={""} alt={user.name} />
      <span>Welcome, {user.name}</span>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default User;

/*
CHALLENGE

1) Add `AuthProvider` to `App.jsx`
2) In the `Login.jsx` page, call `login()` from context
3) Inside an effect, check whether `isAuthenticated === true`. If so, programatically navigate to `/app`
4) In `User.js`, read and display logged in user from context (`user` object). Then include this component in `AppLayout.js`
5) Handle logout button by calling `logout()` and navigating back to `/`
*/
