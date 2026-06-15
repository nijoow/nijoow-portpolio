import { cn } from '@/lib/utils';

interface NavToggleProps {
  isNavShow: boolean;
  setIsNavShow: React.Dispatch<React.SetStateAction<boolean>>;
}

const BAR_BASE = 'bg-purple-medium dark:bg-purple-regular h-0.5 rounded';

const NavToggle = ({ isNavShow, setIsNavShow }: NavToggleProps) => {
  return (
    <div className="ml-auto block md:hidden">
      <input
        type="checkbox"
        id="navToggle"
        className="hidden"
        onClick={() => {
          setIsNavShow(!isNavShow);
        }}
      />
      <label
        htmlFor="navToggle"
        className={cn(
          'flex h-5 w-5 origin-center transform flex-col justify-between transition-all duration-300 group-focus:-rotate-45',
          isNavShow && '-rotate-45',
        )}
      >
        <span
          className={cn(
            BAR_BASE,
            'origin-right transform transition-all delay-150 duration-300',
            isNavShow ? 'w-1/2 -translate-y-px -rotate-90' : 'w-2/3',
          )}
        ></span>
        <span className={BAR_BASE}></span>
        <span
          className={cn(
            BAR_BASE,
            'origin-left transform self-end transition-all delay-150 duration-300',
            isNavShow ? 'w-1/2 translate-y-px -rotate-90' : 'w-2/3',
          )}
        ></span>
      </label>
    </div>
  );
};
export default NavToggle;
