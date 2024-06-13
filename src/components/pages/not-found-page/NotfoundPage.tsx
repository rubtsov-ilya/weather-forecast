import { FC } from "react";
import styles from "./NotfoundPage.module.sass";

const NotfoundPage: FC = () => {
  return (
    <main className={styles["notfound-section"]}>
      <div className="container">
        <div className={styles["notfound-section__content"]}>
          <h1 className={styles["notfound-section__title"]}>
            A página não existe
          </h1>
        </div>
      </div>
    </main>
  );
}

export default NotfoundPage