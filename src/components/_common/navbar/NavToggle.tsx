import React from 'react';
import styles from '@styles/_common/NavBar.module.css';
const NavToggle = ({ isNavShow, setIsNavShow }: any) => {
  return (
    <div className={' md:hidden block'}>
      <input
        type="checkbox"
        id="navToggle"
        className={'hidden'}
        onClick={() => {
          setIsNavShow(!isNavShow);
        }}
      />
      <label
        htmlFor="navToggle"
        className={`w-5 h-5 transform transition-all duration-300 group-focus:-rotate-[45deg] origin-center cursor-pointer flex flex-col justify-between ${
          isNavShow ? '-rotate-[45deg] ' : ''
        }`}
      >
        <span
          className={`h-[2px] w-1/2 rounded transform transition-all duration-300 origin-right delay-75 bg-purple-light ${
            isNavShow ? '-translate-y-[1px] -rotate-90 ' : ''
          }`}
        ></span>
        <span className={`h-[2px] rounded bg-purple-light`}></span>
        <span
          className={`h-[2px] w-1/2 rounded transform transition-all self-end duration-300 origin-left delay-75 bg-purple-light ${
            isNavShow ? 'translate-y-[1px] -rotate-90 ' : ''
          }`}
        ></span>
      </label>
    </div>
  );
};
export default NavToggle;
