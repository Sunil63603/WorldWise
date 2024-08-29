import { createContext, useContext, useEffect, useReducer } from "react";
//useState is for cities,currentCity and to indicate status(isLoading)
//useEffect is to fetch cities from 'cities.json' on initial render.
import PropTypes from "prop-types";

const BASE_URL = `http://localhost:4000`;

//1.create a context
const CitiesContext = createContext();

const initialState = {
  cities: [],
  isLoading: false,
  currentCityObj: {},
  error: "",
};

function reducer(state, action) {
  switch (action.type) {
    case "loading":
      return { ...state, isLoading: true };
    case "cities/loaded":
      return { ...state, isLoading: false, cities: action.payload };
    case "rejected":
      return { ...state, isLoading: false, error: action.payload };
    case "city/loaded":
      return { ...state, isLoading: false, currentCityObj: action.payload };
    case "city/added":
      return {
        ...state,
        isLoading: false,
        cities: [...state.cities, action.payload],
        currentCityObj:action.payload,
      };
    case "city/deleted":
      return {
        ...state,
        isLoading: false,
        cities: state.cities.filter((city) => city.id !== action.payload),
        currentCityObj:{},
      };
    default:
      throw new Error("unknow action type");
  }
}

//2.Provider(supply values(cities[],isLoading,currentCityObject) into provider)
function CitiesProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { cities, isLoading, currentCityObj,error } = state;
  /*
  //why not useReducer?
  const [cities,setCities] = useState([]);//all cities are fetched on initial render
  const [isLoading,setIsLoading] = useState(false);
  const [currentCityObj,setCurrentCityObj] = useState({});//empty when user didnt click on any city yet.Else contains city details
  */

  //useEffect runs only on initial render.
  useEffect(
    function () {
      fetchCitiesList();
    },
    [] //empty array indicates,that useEffect runs only on initial render
  );

  //fetch current city details from the server(receive object)
  function getCurrentCityDetails(currentCityId) {
    //called when user clicks on any city using ':id' from the url
    fetchCurrentCityDetails(currentCityId);
  } //should run when user clicks on any city.

  //just helper function used in CitiesProvider.
  async function fetchCitiesList() {
    try {
      dispatch({ type: "loading" }); //setIsLoading(true);//start the spinner
      const res = await fetch(`${BASE_URL}/cities`);
      const data = await res.json();
      dispatch({ type: "cities/loaded", payload: data }); //setCities(data);
    } catch (error) {
      alert(error.message);
      dispatch({ type: "rejected", payload: error.message });
    }
  }

  async function fetchCurrentCityDetails(currentCityId) {
    try {
      if(currentCityId === currentCityObj.id)//city is already loaded/displayed no need to call API once again
      { 
        return;
      } 

      console.log(currentCityId,currentCityObj.id);

      dispatch({ type: "loading" }); //setIsLoading(true);
      //TODO:Learn how this below line works.
      //json-server is responsible for getting individual city details using `currentCityId`
      const res = await fetch(`${BASE_URL}/cities/${currentCityId}`); //no need to loop over all 'cities' to find current city.
      const data = await res.json();
      dispatch({ type: "city/loaded", payload: data }); //setCurrentCityObj(data);
    } catch (error) {
      console.error(error.message);
      dispatch({ type: "rejected", payload: error.message });
    }
  }

  //function to add new city to the fake API(cities.json)
  async function addNewCity(newCity) {
    try {
      dispatch({ type: "loading" }); //setIsLoading(true);
      const response = await fetch("http://localhost:4000/cities", {
        //all these for 'GET' method,writing this object was not compulsory.
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newCity),
      });

      if (!response.ok) {
        throw new Error(`Failed to add city`);
      } else {
        console.log("City added successfully");

        dispatch({ type: "city/added", payload: newCity }); //setCities(cities=>[...cities,newCity]);//manually adding new city(updating cities).

        //after this we navigate to 'appLayout/cities' in form.jsx to display updated visited cities to the user
      }
    } catch (error) {
      console.error("Error:", error);
      dispatch({ type: "rejected", payload: error.message });
    }
  }

  //function to delete city from the fake API when user wishes to delete city by clicking on 'x' in cityItem.jsx(cities.json).
  async function deleteCity(deleteCityId) {
    try {
      dispatch({ type: "loading" }); //setIsLoading(true);

      //updating cities in server
      const response = await fetch(`${BASE_URL}/cities/${deleteCityId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error(`Failed to delete city with ID:${deleteCityId}`);
      } else {
        //update the 'cities' state variable by filtering out the deleted cities
        dispatch({ type: "city/deleted", payload: deleteCityId }); //setCities(cities=>cities.filter(city=>city.id !== deleteCityId));
        console.log("city deleted successfully");
      }
    } catch (error) {
      console.error("Error:", error);
      dispatch({ type: "rejected", payload: error.message });
    }
  }

  return (
    <CitiesContext.Provider
      value={{
        cities,
        isLoading,
        getCurrentCityDetails,
        currentCityObj,
        addNewCity,
        deleteCity,
        error,//error message
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
}

//3.custom consumer function
function useCustomCitiesContext() {
  const citiesObj = useContext(CitiesContext);
  if (citiesObj === undefined) throw new Error("cities Object is undefined");
  else return citiesObj;
}

//prop-validation
CitiesProvider.propTypes = {
  children: PropTypes.object.isRequired,
  cities: PropTypes.array,
  isLoading: PropTypes.bool,
  currentCity: PropTypes.object,
};

export { CitiesProvider, useCustomCitiesContext };
