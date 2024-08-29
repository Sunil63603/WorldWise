import { useState } from "react"; //used to store email and password
import { useEffect } from "react";
import styles from "./Login.module.css";
import PageNav from "../components/PageNav";
import Button from "../components/Button"; //this is the login button that user clicks on after entering email and password.

import { useCustomAuthContext } from "../context/FakeAuthContext"; //used to get and call login() when user clicks on the login button
import { useNavigate } from "react-router-dom"; //if user is authenticated/valid then navigate to the 'appLayout' page

function Login() {
  const navigate = useNavigate();

  const { login } = useCustomAuthContext(); //call this function when user clicks on 'login' button in Login.jsx page
  const { isAuthenticated } = useCustomAuthContext(); //if the user is authenticated then , programmatically navigate to the 'appLayout'

  // PRE-FILL FOR DEV PURPOSES
  const [email, setEmail] = useState("s60667843@gmail.com"); //both email and password are controlled elements.
  const [password, setPassword] = useState("password");

  useEffect(
    function () {
      if (isAuthenticated) {
        navigate("/appLayout", { replace: true }); //if user is authenticated then navigate to the 'appLayout' page.
      } //without replace , coming back one page in browser(will goto login and then isAuthenticated is true so,redirected/navigated to appLayout . So,use replace to replace history stack)
    },
    [isAuthenticated]
  );

  //to preventDefault and then call login()
  function checkUser(e) {
    e.preventDefault();

    if (email && password) login(email, password);
  }

  return (
    <main className={styles.login}>
      <PageNav></PageNav>
      <form
        className={styles.form}
        onSubmit={(e) => {
          checkUser(e);
        }}
      >
        <div className={styles.row}>
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>

        <div className={styles.row}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>

        <div>
          <Button type="primary" onClick={(e) => checkUser(e)}>
            Login
          </Button>
        </div>
      </form>
    </main>
  );
}

export default Login;
