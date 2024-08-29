import styles from "./CountryList.module.css";

import Spinner from "./Spinner";
import Message from "./Message";//if there's no city,then there's no country
import CountryItem from "./CountryItem";//each country
import { useCustomCitiesContext } from "../context/CitiesContext";

function CountryList() {
  const {cities,isLoading} = useCustomCitiesContext();//to get countries using cities[]

  if (isLoading) return <Spinner></Spinner>;

  if (!cities.length)
    return (
      <Message message="Add your first city by clicking on the map"></Message>
    );

    //TODO: understand this below logic.
  const countries = cities.reduce((array, cityObj) => {
    if (!array.map((el) => el.country).includes(cityObj.country))
      //takes out countries,then check if current country is there or not.If not then add
      return [...array, { country: cityObj.country, emoji: cityObj.emoji }];
    else return array;
  }, []);

  return (
    <ul className={styles.countryList}>
      {countries.map((country) => (
        <CountryItem country={country} key={country.country}></CountryItem>
      ))}
    </ul>
  );
}

export default CountryList;
