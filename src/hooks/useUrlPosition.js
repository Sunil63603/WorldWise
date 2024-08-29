//write a function to get lat and lng from url and return it.     

import { useSearchParams } from "react-router-dom";//to get search params(lat&lng) from url.

export function useUrlPosition()
{
  //** 1. get lat and lng from url ***/
  const [searchParams] = useSearchParams();
  const lat = searchParams.get('lat');
  const lng = searchParams.get('lng');

  return [lat,lng];
}