//without login if user tries to visit appLayout or appLayouts's child routes,then user must not be able to see/use appLayout routes.

import { useEffect } from "react"; //whenever isAuthenticated changes,effect should execute
import { useNavigate } from "react-router-dom"; //if not valid,then navigate to home page.
import { useCustomAuthContext } from "../context/FakeAuthContext"; //to check if user is authenticated or not
import PropTypes from "prop-types";

function ProtectedRoute({ children }) {
  const { isAuthenticated } = useCustomAuthContext();
  const navigate = useNavigate();

  useEffect(
    function () {
      if (!isAuthenticated) navigate("/");
    },
    [isAuthenticated]
  );

  return isAuthenticated ? children : null;
}

ProtectedRoute.propTypes = {
  children: PropTypes.object.isRequired,
};

export default ProtectedRoute;
