import { useContext } from "react";
import { UserContext } from "../../context/context";
const Footer = () => {
  const { currentTheme } = useContext(UserContext);

  return (
    <footer className={currentTheme}>
      <div>
        &copy; {new Date().getFullYear()} Lee Woo Jin. All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
