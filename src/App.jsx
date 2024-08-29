//importing from react
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
//BrowserRouter is used to handle navigation in single page applications

//importing from pages folder

//all of these below pages are included in <pageNav>
import Homepage from "./pages/Homepage"; //landing page
import Product from "./pages/Product";
import Pricing from "./pages/Pricing";
import Login from "./pages/Login";

//these two are not included in <pageNav>
import PageNotFound from "./pages/PageNotFound"; //when url is not found/invalid
import AppLayout from "./pages/AppLayout"; //when user clicks on 'start tracking' button.route-->/home/appLayout/cities (cities was added by Navigate element)
import ProtectedRoute from "./pages/ProtectedRoute"; //to display contents(appLayout and its child routes) only if the user is authenticated.

//importing from components folder
import CityList from "./components/CityList"; //displayed as default in 'appLayout' page
import City from "./components/City"; //each individual city . route--->cities/city id?(lat and lng)query parameters
import Form from "./components/Form"; // appLayout/form?lat and lng
import CountryList from "./components/CountryList"; // appLayout/countries
//👆these are the four components that render in sidebar

//All these above👆 imports indicate that they have been used for creating route.Each and every above imported page/component has a unique link.

//importing from context
import { CitiesProvider } from "./context/CitiesContext"; //context API is used for global state management.
//wrap this 'CitiesProvider' around all components/entire DOM tree

import { AuthProvider } from "./context/FakeAuthContext"; //this is used for login and logout logic

//This file is primarily used to create routes/links
function App() {
  //index is the default 'child' element rendered on screen.
  return (
    <>
      <AuthProvider>
        <CitiesProvider>
          <BrowserRouter>
            <Routes>
              <Route index element={<Homepage></Homepage>}></Route>
              <Route path="product" element={<Product></Product>}></Route>
              <Route path="pricing" element={<Pricing></Pricing>}></Route>
              <Route path="login" element={<Login></Login>}></Route>
              <Route
                path="appLayout"
                element={
                  <ProtectedRoute>
                    <AppLayout></AppLayout>
                  </ProtectedRoute>
                }
              >
                {/* //TODO: 'home page' is also default(using index) and 'cities' is also default.But why logic looks different.
                 */}
                <Route
                  index
                  element={<Navigate replace to="cities"></Navigate>}
                ></Route>
                {/* <Route index  element={<NavLink to='/cities'></NavLink>}></Route> */}
                <Route path="cities" element={<CityList></CityList>}></Route>
                <Route path="cities/:id" element={<City></City>}></Route>
                <Route
                  path="countries"
                  element={<CountryList></CountryList>}
                ></Route>
                <Route path="form" element={<Form></Form>}></Route>
              </Route>
              <Route path="*" element={<PageNotFound></PageNotFound>}></Route>
            </Routes>
          </BrowserRouter>
        </CitiesProvider>
      </AuthProvider>
    </>
  );
}

export default App;
