import styles from "./CountryItem.module.css";
import Prototypes from 'prop-types';

function CountryItem({ country }) {
  return (
    <li className={styles.countryItem}>
      <span>{country.emoji}</span>
      <span>{country.country}</span>
    </li>
  );
}

CountryItem.propTypes={
  country:Prototypes.object.isRequired,
}

export default CountryItem;
