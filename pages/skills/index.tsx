import Seo from "../../components/_common/Seo";
import styles from "../../styles/skills/Skills.module.css";
import { prefix } from "../../config/config";

interface SkillProps {
  fileName: string;
  name: string;
}
export default function Skills() {
  const skillsFront = [
    { id: 1, fileName: "html.svg", name: "HTML" },
    { id: 2, fileName: "css.svg", name: "CSS" },
    { id: 3, fileName: "javascript.svg", name: "JAVASCRIPT" },
    { id: 4, fileName: "react.svg", name: "REACT JS" },
    { id: 5, fileName: "sass.svg", name: "SASS" },
    // { id: 6, fileName: "bootstrap.svg", name: "BOOTSTRAP" },
    { id: 7, fileName: "typescript.svg", name: "TYPESCRIPT" },
    { id: 8, fileName: "next.svg", name: "NEXT JS" },
  ];
  const skillsEtc = [
    { id: 1, fileName: "git.svg", name: "GIT" },
    { id: 1, fileName: "illustrator.svg", name: "ILLUSTRATOR" },
    { id: 2, fileName: "photoshop.svg", name: "PHOTOSHOP" },
    { id: 3, fileName: "premiere.png", name: "PREMIERE" },
    { id: 4, fileName: "aftereffect.png", name: "AFTER EFFECT" },
    // /{ id: 6, fileName: "arduino.svg", name: "ARDUINO" },
  ];
  const Skill = ({ fileName, name }: SkillProps) => {
    return (
      <div className={styles.skill}>
        <img
          src={`${prefix}/images/skills/${fileName}`}
          width="60"
          height="60"
        />
        <span className={styles.skillName}>{name}</span>
      </div>
    );
  };
  return (
    <>
      <Seo customMeta={{ title: "Skills" }} />
      <section>
        <div className="title">Front-End Skills</div>
        <div className={styles.skillsContainer}>
          {skillsFront.map((skill) => {
            return (
              <Skill
                key={skill.name}
                name={skill.name}
                fileName={skill.fileName}
              />
            );
          })}
        </div>
        <div className="title">Etc Skills</div>
        <div className={styles.skillsContainer}>
          {skillsEtc.map((skill) => {
            return (
              <Skill
                key={skill.id}
                name={skill.name}
                fileName={skill.fileName}
              />
            );
          })}
        </div>
      </section>
    </>
  );
}
