import styles from "./City.module.css";
import Spinner from './Spinner';
import BackButton from './BackButton';
import { useParams } from "react-router-dom";//to get id of city from url
import { useCustomCitiesContext } from "../context/CitiesContext";//to get current city details and status(isLoading)
import { useEffect } from "react";//fetch current details

//this formatDate is present in <CityItem> as well
const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
    weekday:"long",
  }).format(new Date(date));

function City() {
  const {id} = useParams();//id of the current city.
  const {getCurrentCityDetails,currentCityObj,isLoading} = useCustomCitiesContext();
  //get entire current city object
  
  useEffect(
    function()
    {
      getCurrentCityDetails(id);//this is a sideEffect function.so adding this into dependency array will create infinite renders.
    },[id]//missing getCurrentCityDetails in dependency array
  )
  //change in 'id',indicates new city must be fetched. 
  
  const { cityName, emoji, date, notes } = currentCityObj;//! what if currentCityObj is empty
  // currentCityObj cannot be empty as per application's logic.
  
  if(isLoading) return <Spinner></Spinner>

  return (
    <div className={styles.city}>
      <div className={styles.row}>
        <h6>City name</h6>
        <h3>
          <span>{emoji}</span> {cityName}
        </h3>
      </div>

      <div className={styles.row}>
        <h6>You went to {cityName} on</h6>
        <p>{formatDate(date || null)}</p>
      </div>

      {notes && (
        <div className={styles.row}>
          <h6>Your notes</h6>
          <p>{notes}</p>
        </div>
      )}

      <div className={styles.row}>
        <h6>Learn more</h6>
        <a
          href={`https://en.wikipedia.org/wiki/${cityName}`}
          target="_blank"
          rel="noreferrer"
        >
          Check out {cityName} on Wikipedia &rarr;
        </a>
      </div>

      <div>
        <BackButton></BackButton>
      </div> 
    </div>
  );
}

export default City;
