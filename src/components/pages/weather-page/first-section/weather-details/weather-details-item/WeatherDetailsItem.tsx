import { FC } from 'react'
import styles from './WeatherDetailsItem.module.scss'

interface WeatherDetailsItemProps {
  Svg: React.FunctionComponent<React.SVGProps<SVGSVGElement> & {title?: string | undefined;}>;
  text: string;
  value: number | undefined;
  unit: string;
}

const WeatherDetailsItem: FC<WeatherDetailsItemProps> = ({Svg, text, value, unit}) => {
  return (
    <div className={styles["details-item"]}>
          <div className={styles["details-item__desc-wrapper"]}>
            <Svg className={styles["details-item__svg-icon"]}/>
            <p className={styles["details-item__desc"]}>{text}</p>
          </div>
          {value && <p className={styles["details-item__value"]}>{Math.round(value)}<span className={styles["details-item__value-span"]}>{unit}</span></p>}
    </div>
  )
}

export default WeatherDetailsItem