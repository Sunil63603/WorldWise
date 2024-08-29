import PageNav from "../components/PageNav"; //to display all pages horizontally at the top.
import styles from "./Homepage.module.css";
import { NavLink } from "react-router-dom"; //when clicked on "Start tracking now" button, '/appLayout' would be added to url and also additionally NavLink indicates whether link is active or not

export default function Homepage() {
  return (
    <main className={styles.homepage}>
      <PageNav></PageNav>

      <section>
        <h1>
          You travel the world.
          <br />
          WorldWise keeps track of your adventures.
        </h1>
        <h2>
          A world map that tracks your footsteps into every city you can think
          of. Never forget your wonderful experiences, and show your friends how
          you have wandered the world.
        </h2>
        <NavLink to="/login" className="cta">
          Start tracking now
        </NavLink>
      </section>
    </main>
  );
}
