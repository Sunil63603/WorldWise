import styles from './Map.module.css'

//useState is used to set the position of map.
import { useEffect, useState } from "react";//'useEffect' is used to update map position,when user clicks on any city on map/clicks on any city from 'cities' component of sidebar and also when user uses his 'geolocation'

import { MapContainer, Marker, Popup, TileLayer, useMap, useMapEvents } from "react-leaflet";
//MapContainer is where map is displayed.
// Marker is 'pin' to indicate visitd cities on map.
//Popup is used to display name of particular city where Marker is pinned.
//TileLayer->to use different map layers.
//'useMap' is used to display map,as per mapLat and mapLng from url.
//'useMapEvents' is used to get lat and lng where user has clicked on map.

import { useNavigate } from "react-router-dom"//to change url and display <form>
import { useCustomCitiesContext } from '../context/CitiesContext';//get cities[].loop over cities[] and then pin markers on map
import { useGeolocation } from '../hooks/useGeolocation';//used to get user's location.
import { useUrlPosition } from '../hooks/useUrlPosition';//used to get lat&lng from url
import Button from './Button';//geoLocation button

function Map() {
  const citiesObj = useCustomCitiesContext();//loop over cities[] and pin 'Markers' for visited cities on map
  const {cities} = citiesObj;//cities[]
  const [mapPosition,setMapPosition] = useState([40,0]);//used to display 'map' at some lat and lng. 


  //👇custom react hooks ie.useGeolocation and useUrlPosition

  //get user's geo location and then try to navigate the map to that geo location.
  const {isLoading:isLoadingPosition,position:geolocationPosition,getPosition} = useGeolocation();
  //loading indicates status of getting geolocation
  //geolocationPosition contains current location of user.
  //getPosition() is used to get user's current location 

  //custom hook return lat and lng which is present in the url.
  const [mapLat,mapLng] = useUrlPosition();
  
  //👆custom react hooks ie.useGeolocation and useUrlPosition



  //👇👇useEffect to set map position in two scenarios

  useEffect(
    function(){
      if(mapLat && mapLng) {
        setMapPosition([mapLat,mapLng])
      }
    },[mapLat,mapLng]//runs when user clicks on map or any visited city(which are present in the sidebar) 
  )

  useEffect(
    function()
    {
      if(geolocationPosition)
      {
        const {lat,lng} = geolocationPosition;
        setMapPosition([lat,lng]);
      }
    },[geolocationPosition]
  )

  //👆👆useEffect to set map position in two scenarios
  
  return (
    <div className={styles.mapContainer}>
      {!geolocationPosition && <Button type='position' onClick={getPosition}>{isLoadingPosition?'Loading...':'use your Geolocation'}</Button>}
      <MapContainer 
      center={mapPosition}
      zoom={6} scrollWheelZoom={false} className={styles.map}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />
        {
          cities.map((city)=>
            <Marker position={[city.position.lat,city.position.lng]} key={city.id}>
              <Popup>
                <span>{city.cityName}</span>
              </Popup>
            </Marker>
          )
        }
        {/* 👇these two components are used to change view and display form.But all other components where used for displaying something on screen(UI)👇 */}
        <ChangeCenter position={mapPosition}></ChangeCenter>
        <DetectClick></DetectClick>
      </MapContainer>
    </div>
  )
}

//when center is changed,then view of the map is used(this feature is used to change mapView when we click on any city)
function ChangeCenter({position})
{
  const map = useMap();
  map.setView(position);
}

function DetectClick() 
{
  const navigate = useNavigate();

  useMapEvents({
    click:(e)=>{
      //'e' is not built by DOM,it is coming from the leaflet library.
      const {lat,lng} = e.latlng;//now update 'lat' and 'lng' in the url
      navigate(`form?lat=${lat}&lng=${lng}`)},
  })
}

export default Map
