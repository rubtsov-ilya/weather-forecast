import { useSelector } from 'react-redux';

import { selectCityInfo } from '../redux/slices/cityInfoSlice';

const useCityInfo = () => {
  const {
    regionType,
    region,
    areaType,
    area,
    city,
    latitude,
    longitude,
    label,
    value,
    shortenedAddress,
  } = useSelector(selectCityInfo);

  return {
    regionType,
    region,
    areaType,
    area,
    city,
    latitude,
    longitude,
    label,
    value,
    shortenedAddress,
  };
};

/* const { regionType, region, areaType, area, city, latitude, longitude, label, value } = useCityInfo() получить в компоненте */

export default useCityInfo;
