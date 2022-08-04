import { useAppSelector } from "../../../store/config";

const Footer = () => {
  const { currentTheme } = useAppSelector((state) => state.theme);

  return (
    <footer className={currentTheme}>
      <div>
        &copy; {new Date().getFullYear()} Lee Woo Jin. All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
