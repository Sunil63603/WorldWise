import PropTypes from "prop-types";
import styles from "./CityItem.module.css";
import { Link } from "react-router-dom";//each and every city item is a link.(as clicking on it changes the url)
import { useCustomCitiesContext } from "../context/CitiesContext";//used to get 'currentCityObj' which contains all the details of current city.

//this function is used to display date in standard format
const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(date));

function CityItem({ cityObj }) {
  //TODO:add guard clause if cityObj is undefined.
  const {currentCityObj} = useCustomCitiesContext(); //TODO:Is currentCityObj used anywhere in this code.Yes,it is used only to highlight active cityItem.(using currentCityObj.id) and also we will be using currentCityObj.id to delete city.
  const {deleteCity} = useCustomCitiesContext();//this is used to delte city(using id) from API.
  const { cityName, emoji, date,id,position } = cityObj;

  //to handle when user clicks on 'X'(delete city) button
  function handleClick(e)
  {
    e.preventDefault();
    deleteCity(id);
  }
  
  //!alert click on berlin highlights 'berlin'✅, but after that if i click on geolocation then highlight must be removed.❌
  return (
    <li>
      <Link to={`${id}?lat=${position.lat}&lng=${position.lng}`} className={`${styles.cityItem} ${id === currentCityObj.id?styles['cityItem--active']:''}`}>
        <span className={styles.emoji}>{emoji}</span>
        <h3 className={styles.name}>{cityName}</h3>
        <time className={styles.date}>({formatDate(date)})</time>
        <button className={styles.deleteBtn} onClick={(e)=>{handleClick(e)}}>&times;</button>
      </Link>
    </li>
  );
}

CityItem.propTypes = {
  cityObj: PropTypes.object.isRequired,
};

export default CityItem;
