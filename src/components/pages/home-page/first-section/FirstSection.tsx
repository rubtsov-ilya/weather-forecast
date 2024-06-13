import styles from "./FirstSection.module.scss";
import { FC } from "react";

const FirstSection: FC = () => {
  return (
    <section className={styles["first-section"]}>
      <div className="container">
        <div className={styles["first-section__content"]}>
        </div>
      </div>
    </section>
  )
}

export default FirstSection