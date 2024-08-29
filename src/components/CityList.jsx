import styles from "./CityList.module.css";
import Spinner from "./Spinner";
import Message from "./Message";
import CityItem from "./CityItem";//to display each city as list item
import { useCustomCitiesContext } from "../context/CitiesContext";//to get cities[] and isLoading

function CityList() {
  const {cities,isLoading} = useCustomCitiesContext();//cities[]
  
  if (isLoading) return <Spinner></Spinner>;//if isLoading then show spinner

  if (!cities.length)//if cities[] is empty then display message
    return (
      <Message message="Add your first city by clicking on the map"></Message>
    );

  return (
    <>
      <ul className={styles.cityList}>
        {cities.map((cityObj) => (
          <CityItem
            cityObj={cityObj}
            key={cityObj.id}
          ></CityItem>
        ))}
      </ul>
    </>
  );
}



export default CityList;
