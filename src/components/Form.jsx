// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

import { useEffect, useState } from "react";//useEffect is used to get details of a city using its lat&lng present in url
import Button from "./Button";
import styles from "./Form.module.css";
import BackButton from "./BackButton";
import Message from './Message';
import Spinner from './Spinner';
import { useUrlPosition } from "../hooks/useUrlPosition";//to get lat and lng from url
import DatePicker from 'react-datepicker';//to allow user to pick date of visit using calender
import 'react-datepicker/dist/react-datepicker.css';
import { useCustomCitiesContext } from "../context/CitiesContext";//we are using this to call function(addNewCity) which adds new city into the server.
import { useNavigate } from "react-router-dom";//after adding new city,we should navigate to the 'appLayout/cities'<div className=""></div>


function convertToEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

//!alert: form should not be displayed if i click on visited city in 'map' because i have already visited that city so,why one more form?

function Form() 
{
  //call useUrlPosition hook and get the lat and lng into this function
  const [mapLat, mapLng] = useUrlPosition();//custom react hook 

  const {addNewCity} = useCustomCitiesContext();//addNewCity is a function present in CitiesContext.jsx which add new city into the fake API
  const {isLoading} = useCustomCitiesContext();//'isLoading' to indicate user about adding a new city.

  const navigate = useNavigate();//to change page view to 'cities' after adding new city.

  //details which should be stored into 'cities.json' when user adds city.
  const [cityName, setCityName] = useState("");
  const [country, setCountry] = useState("");country
  const [date, setDate] = useState(null);
  const [notes, setNotes] = useState("");
  const [emoji,setEmoji] = useState('');

  //error handling states/variables while geocoding(lat&lng->details)
  const [geocodingError,setGeocodingError] = useState(``);
  const [isLoadingGeocoding,setIsLoadingGeocoding] = useState(false);//to get user current location

  const BASE_URL = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${mapLat}&longitude=${mapLng}`;
  
  //using a reverse geocoding api , try to get name(details) of the city with lat=mapLat and lng=mapLng
  useEffect(function(){
    if(!mapLat && !mapLng)
    {
      return;
    }  

    async function fetchCityData()
    {
      try
      {
        setIsLoadingGeocoding(true);
        setGeocodingError(``);//to clear previous error
        if (mapLat && mapLng)
        {
          const res = await fetch(BASE_URL);
          const jsonData = await res.json();
          const city = jsonData.city || jsonData.locality || jsonData.principalSubdivision || jsonData.countryName || jsonData.continent || '';
          
          if(!jsonData.countryCode)//guard clause
          {
            throw new Error('It doesnt seem to be a city,Click somewhere else and try again🐶');
          }
          
          //storing details of the city👇
          setCityName(city);
          setEmoji(convertToEmoji(jsonData.countryCode));
          setCountry(jsonData.countryName);
        }
      }
      catch(error)
      {
        setGeocodingError(error.message);
      }
      finally
      {
        setIsLoadingGeocoding(false);
      }       
    }
    fetchCityData();
  }, [mapLat, mapLng,BASE_URL]);

  if(!mapLat && !mapLng)
  {
    return <Message message='Start by clicking on some city in map displayed here👉'></Message>
  }  


  if(isLoadingGeocoding) return <Spinner></Spinner>;

  if(geocodingError) return <Message message={geocodingError}></Message>

  //function to add new city into the cities.json
  const handleAddCity = async (e) => 
  {
    //'add' is a button inside form,so preventDefault
    e.preventDefault();

    const newCity = {//create object using state variables.
      cityName,
      country,
      emoji,
      date,
      notes,
      position: {
        lat: mapLat,
        lng: mapLng,
      },
      id: Math.floor(Math.random() * 10000000).toString(),
    };

    await addNewCity(newCity);//calling function present in CitiesContext.jsx to add new city into the fake API.

    navigate('/appLayout/cities');//navigate to 'cities' page
    //even 'back' button does the same thing.
  };

  return (
    // even click on 'back' button would have been considered as 'submit' hence,preventDefault in 'back' button logic
    <form className={`${styles.form} ${isLoading?styles.loading:''}`} onSubmit={(e)=>{handleAddCity(e)}}>
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
        <span className={styles.flag}>{emoji}</span>
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>
        <DatePicker
          id='date'
          selected={date}
          onChange={(date) => setDate(date)}//here we receive 'date' instead of event 
          dateFormat="dd/MM/yyyy"
        />
        {/* 👆logic to display calender so that user can pick date of visit*/}
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        <Button type="primary" onClick={(e)=>{handleAddCity(e)}}>
          Add
        </Button>
        <BackButton></BackButton>
      </div>
    </form>
  );
}  

export default Form;
