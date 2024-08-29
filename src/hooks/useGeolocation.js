import { useState } from "react";//used for 'loading' flag,position state and then error state
import { useNavigate } from "react-router-dom";//to change url to 'appLayout/cities/lat&lng'
//because of 'cities' in url <CityList> is rendered
//because of 'lat and lng',mapPositio is changed to display user's current location 

export function useGeolocation(defaultPosition = null) 
{
  const navigate = useNavigate();//to change url to 'appLayout/cities/lat&lng'
  const [isLoading, setIsLoading] = useState(false);//to indicate whether user's location is loading or not.
  const [position, setPosition] = useState(defaultPosition);//to store user's current location
  const [error, setError] = useState(null);//to indicate whether getting location failed or not.

  function getPosition() {
    if (!navigator.geolocation)//this is built into the browser.
      return setError("Your browser does not support geolocation");

    setIsLoading(true);//this is kind of try block.
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setPosition({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude
        });
        navigate(`/appLayout/cities/?lat=${pos.coords.latitude}&lng=${pos.coords.longitude}`);
        setIsLoading(false);//loading stops on successful position fetch 
      },
      (error) => {
        setError(error.message);
        setIsLoading(false);//loading stops on failure position fetch.
      }
    );
  }

  return { isLoading, position, error, getPosition };
}

