import ClearDaySvg from '../assets/images/weather-page-images/weather-svg/day/Weather=Clear,Moment=Day.svg?react'
import ClearNightSvg from '../assets/images/weather-page-images/weather-svg/night/Weather=Clear,Moment=Night.svg?react'
import FewCloudsDaySvg from '../assets/images/weather-page-images/weather-svg/day/Weather=FewClouds,Moment=Day.svg?react'
import FewCloudsNightSvg from '../assets/images/weather-page-images/weather-svg/night/Weather=FewClouds,Moment=Night.svg?react'
import CloudyDaySvg from '../assets/images/weather-page-images/weather-svg/day/Weather=Cloudy,Moment=Day.svg?react'
import CloudyNightSvg from '../assets/images/weather-page-images/weather-svg/night/Weather=Cloudy,Moment=Night.svg?react'
import RainDaySvg from '../assets/images/weather-page-images/weather-svg/day/Weather=Rain,Moment=Day.svg?react'
import RainNightSvg from '../assets/images/weather-page-images/weather-svg/night/Weather=Rain,Moment=Night.svg?react'
import SnowDaySvg from '../assets/images/weather-page-images/weather-svg/day/Weather=Snow,Moment=Day.svg?react'
import SnowNightSvg from '../assets/images/weather-page-images/weather-svg/night/Weather=Snow,Moment=Night.svg?react'
import StormDaySvg from '../assets/images/weather-page-images/weather-svg/day/Weather=Storm,Moment=Day.svg?react'
import StormNightSvg from '../assets/images/weather-page-images/weather-svg/night/Weather=Storm,Moment=Night.svg?react'

/* svg for DaysForecast */
import ClearSvg from '../assets/images/weather-page-images/days-forecast-svg/Weather=Clear,Moment=Day.svg?react'
import FewCloudsSvg from '../assets/images/weather-page-images/days-forecast-svg/Weather=FewClouds,Moment=Day.svg?react'
import CloudySvg from '../assets/images/weather-page-images/days-forecast-svg/Weather=Cloudy,Moment=Day.svg?react'
import RainSvg from '../assets/images/weather-page-images/days-forecast-svg/Weather=Rain,Moment=Day.svg?react'
import SnowSvg from '../assets/images/weather-page-images/days-forecast-svg/Weather=Snow,Moment=Day.svg?react'
import StormSvg from '../assets/images/weather-page-images/days-forecast-svg/Weather=Storm,Moment=Day.svg?react'

const useGetSvgIcon = (codeNumber: number, dayTime?: 'day' | 'night'): React.FunctionComponent<React.SVGProps<SVGSVGElement>> | null => {
      let iconSvg: React.FunctionComponent<React.SVGProps<SVGSVGElement>> | null = null;
      if (dayTime === 'day') {
        switch (codeNumber) {
        case 0:
          iconSvg = ClearDaySvg;
          break;
        case 1:
        case 2:
          iconSvg = FewCloudsDaySvg;
          break;
        case 3:
        case 45:
        case 48:
          iconSvg = CloudyDaySvg;
          break;
        case 51:
        case 53:
        case 55:
        case 56:
        case 57:
        case 61:
        case 63:
        case 65:
        case 66:
        case 67:
        case 80:
        case 81:
        case 82:
          iconSvg = RainDaySvg;
          break;
        case 71:
        case 73:
        case 75:
        case 77:
        case 85:
        case 86:
          iconSvg = SnowDaySvg;
          break;
        case 95:
        case 96:
        case 99:
          iconSvg = StormDaySvg;
          break;
        default:
          iconSvg = ClearDaySvg;
          break
      }
    } 
    else if (dayTime === 'night') {
      switch (codeNumber) {
        case 0:
          iconSvg = ClearNightSvg;
          break;
        case 1:
        case 2:
          iconSvg = FewCloudsNightSvg;
          break;
        case 3:
        case 45:
        case 48:
          iconSvg = CloudyNightSvg;
          break;
        case 51:
        case 53:
        case 55:
        case 56:
        case 57:
        case 61:
        case 63:
        case 65:
        case 66:
        case 67:
        case 80:
        case 81:
        case 82:
          iconSvg = RainNightSvg;
          break;
        case 71:
        case 73:
        case 75:
        case 77:
        case 85:
        case 86:
          iconSvg = SnowNightSvg;
          break;
        case 95:
        case 96:
        case 99:
          iconSvg = StormNightSvg;
          break;
        default:
          iconSvg = ClearNightSvg;
          break
      }
    } else if (!dayTime) {
      switch (codeNumber) {
        case 0:
          iconSvg = ClearSvg;
          break;
        case 1:
        case 2:
          iconSvg = FewCloudsSvg;
          break;
        case 3:
        case 45:
        case 48:
          iconSvg = CloudySvg;
          break;
        case 51:
        case 53:
        case 55:
        case 56:
        case 57:
        case 61:
        case 63:
        case 65:
        case 66:
        case 67:
        case 80:
        case 81:
        case 82:
          iconSvg = RainSvg;
          break;
        case 71:
        case 73:
        case 75:
        case 77:
        case 85:
        case 86:
          iconSvg = SnowSvg;
          break;
        case 95:
        case 96:
        case 99:
          iconSvg = StormSvg;
          break;
        default:
          iconSvg = ClearSvg;
          break
      }
    }
    return iconSvg;
  }

export default useGetSvgIcon