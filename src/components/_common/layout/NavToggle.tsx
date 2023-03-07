import React from 'react';
import styles from '@styles/_common/NavBar.module.css';
const NavToggle = ({ isNavShow, setIsNavShow }: any) => {
  return (
    <div className={styles.navToggleContainer}>
      <input
        type="checkbox"
        id="navToggle"
        className={styles.navToggle}
        onClick={() => {
          setIsNavShow(!isNavShow);
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
