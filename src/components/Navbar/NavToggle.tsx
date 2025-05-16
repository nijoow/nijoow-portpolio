const NavToggle = ({ isNavShow, setIsNavShow }: any) => {
  return (
    <div className={'ml-auto block md:hidden'}>
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
        className={`flex h-5 w-5 origin-center transform cursor-pointer flex-col justify-between transition-all duration-300 group-focus:-rotate-[45deg] ${
          isNavShow ? '-rotate-[45deg]' : ''
        }`}
      >
        <span
          className={`h-[2px] origin-right transform rounded bg-purple-medium transition-all delay-150 duration-300 dark:bg-purple-regular ${
            isNavShow ? 'w-1/2 -translate-y-[1px] -rotate-90' : 'w-2/3'
          }`}
        ></span>
        <span
          className={`h-[2px] rounded bg-purple-medium dark:bg-purple-regular`}
        ></span>
        <span
          className={`h-[2px] origin-left transform self-end rounded bg-purple-medium transition-all delay-150 duration-300 dark:bg-purple-regular ${
            isNavShow ? 'w-1/2 translate-y-[1px] -rotate-90' : 'w-2/3'
          }`}
        ></span>
      </label>
    </div>
  );
};
export default NavToggle;
