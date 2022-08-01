import styles from "../styles/Contents.module.css";
interface InformationProps {
  Icon: any;
  list: string;
  contents: string;
  link: string | null;
}
export default function Information({
  Icon,
  list,
  contents,
  link,
}: InformationProps) {
  return (
    <div className={styles.infomation}>
      <div className={styles.subTitle}>
        {Icon ? <Icon className={styles.icon} /> : ""}
        <span>{list}</span>
      </div>
      <div className={styles.infoContents}>
        {link ? (
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.linkText}
          >
            {contents}
          </a>
        ) : (
          contents
        )}
      </div>
    </div>
  );
}
