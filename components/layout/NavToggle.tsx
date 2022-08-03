import React from "react";
import styles from "../../styles/_common/NavBar.module.css";
import { useContext } from "react";
import { UserContext } from "../../context/context";

const NavToggle = () => {
  const { dispatch } = useContext(UserContext);

  return (
    <div className={styles.navToggleContainer}>
      <input
        type="checkbox"
        id="navToggle"
        className={styles.navToggle}
        onClick={() => {
          dispatch({ type: "toggleNav" });
        }}
      />
      <label htmlFor="navToggle">
        <span></span>
        <span></span>
        <span></span>
      </label>
    </div>
  );
};

export default NavToggle;
