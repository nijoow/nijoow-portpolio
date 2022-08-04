import { prefix } from "../../config/config";
import styles from "../../styles/works/Works.module.css";

interface WorkProps {
  url: string;
  imgSrc: string;
}
const Work = ({ url, imgSrc }: WorkProps) => {
  return (
    <div className={styles.card}>
      <img
        src={`${prefix}/images/works/${imgSrc}`}
        width="768"
        height="432"
        className={styles.cardImg}
      ></img>
      <a href={url} target="_blank" rel="noopener noreferrer">
        <div className={styles.cardOverlay}>
          <span>사이트 바로가기 &gt;</span>
        </div>
      </a>
    </div>
  );
};
export default Work;
