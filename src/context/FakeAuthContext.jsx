import { createContext, useContext } from "react"; //importing this to create fake authentication context.
import { useReducer } from "react";
import PropTypes from "prop-types";

const AuthContext = createContext();

const initialState = {
  user: null,
  isAuthenticated: false,
};

function reducer(state, action) {
  switch (action.type) {
    case "login":
      return { ...state, user: action.payload, isAuthenticated: true };
    case "logout":
      return { ...state, user: null, isAuthenticated: false };
    default:
      throw new Error("unknown action type");
  }
}

const FAKE_USER = {
  name: "Sunil",
  email: "s60667843@gmail.com",
  password: "password",
  avatar: "data/black_image.jpg",
};

function AuthProvider({ children }) {
  const [{ user, isAuthenticated }, dispatch] = useReducer(
    reducer,
    initialState
  );
  function login(email, password) {
    if (email === FAKE_USER.email && password === FAKE_USER.password) {
      dispatch({ type: "login", payload: FAKE_USER });
    }
  }

  function logout() {
    dispatch({ type: "logout" });
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

function useCustomAuthContext() {
  const fakeAuth = useContext(AuthContext);
  if (fakeAuth === undefined)
    throw new Error("AuthContext was used outside the AuthProvider");

  return fakeAuth;
}

AuthProvider.propTypes = {
  children: PropTypes.object.isRequired,
};

export { AuthProvider, useCustomAuthContext };
