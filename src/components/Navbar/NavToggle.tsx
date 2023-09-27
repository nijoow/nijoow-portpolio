import React from 'react'

const NavToggle = ({ isNavShow, setIsNavShow }: any) => {
  return (
    <div className={'md:hidden block ml-auto'}>
      <input
        type="checkbox"
        id="navToggle"
        className={'hidden'}
        onClick={() => {
          setIsNavShow(!isNavShow)
        }}
      />
      <label
        htmlFor="navToggle"
        className={`w-5 h-5 transform transition-all duration-300 group-focus:-rotate-[45deg] origin-center cursor-pointer flex flex-col justify-between ${
          isNavShow ? '-rotate-[45deg] ' : ''
        }`}
      >
        <span
          className={`h-[2px] rounded transform transition-all duration-300 origin-right delay-150 bg-purple-medium dark:bg-purple-regular ${
            isNavShow ? '-translate-y-[1px] w-1/2 -rotate-90 ' : 'w-2/3'
          }`}
        ></span>
        <span
          className={`h-[2px] rounded bg-purple-medium dark:bg-purple-regular`}
        ></span>
        <span
          className={`h-[2px] rounded transform transition-all self-end duration-300 origin-left delay-150 bg-purple-medium dark:bg-purple-regular ${
            isNavShow ? 'translate-y-[1px] w-1/2 -rotate-90 ' : 'w-2/3'
          }`}
        ></span>
      </label>
    </div>
  )
}
export default NavToggle
