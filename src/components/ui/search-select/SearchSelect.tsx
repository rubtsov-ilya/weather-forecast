import { FC, useEffect, useLayoutEffect, useState } from 'react';
import './SearchSelect.scss';
import Select from 'react-select';
import { SingleValue } from 'react-select';

import { useDispatch } from 'react-redux';

import citiesDb from '../../../../data_base/cities-db.json';
import { ISelectOptions } from '../../../interfaces/SelectOptions.interface';
import { setCityInfo } from '../../../redux/slices/cityInfoSlice';
import useCityInfo from '../../../hooks/useCityInfo';

interface SearchSelectProps {
  isCityPage?: boolean;
}

const SearchSelect: FC<SearchSelectProps> = ({ isCityPage }) => {
  const [inputValue, setInputValue] = useState<string>('');
  const [menuIsOpen, setMenuIsOpen] = useState<boolean>(false);
  const locationSearchParams: URLSearchParams = new URLSearchParams(
    window.location.search,
  );
  const { latitude, longitude } = useCityInfo();
  const dispatch = useDispatch();

  useLayoutEffect(() => {
    if (inputValue.length > 0) {
      setMenuIsOpen(true);
    } else {
      setMenuIsOpen(false);
    }
  }, [inputValue]);

  useEffect(() => {
    const latValue: string | null = locationSearchParams.get('lat');
    const lonValue: string | null = locationSearchParams.get('lon');
    if (latValue && lonValue) {
      if (latValue === latitude && lonValue === longitude) {
        return;
      } else {
        const newCity = citiesDb.find(
          (city) => city.latitude === latValue && city.longitude === lonValue,
        );
        if (newCity) {
          dispatch(
            setCityInfo({
              regionType: newCity.regionType,
              region: newCity.region,
              areaType: newCity.areaType,
              area: newCity.area,
              city: newCity.city,
              latitude: newCity.latitude,
              longitude: newCity.longitude,
              label: newCity.label,
              value: newCity.value,
              shortenedAddress: newCity.shortenedAddress,
            }),
          );
        } else {
          return;
        }
      }
    }
  }, []);

  useEffect(() => {
    if (latitude && longitude) {
      locationSearchParams.set('lat', latitude);
      locationSearchParams.set('lon', longitude);
      const newUrl = `?${locationSearchParams.toString()}`;
      window.history.pushState({}, '', newUrl);
    }
  }, [latitude, longitude]);

  const handleChangeSelect = (
    selectValue: SingleValue<ISelectOptions>,
  ): void => {
    if (selectValue) {
      dispatch(
        setCityInfo({
          regionType: selectValue.regionType,
          region: selectValue.region,
          areaType: selectValue.areaType,
          area: selectValue.area,
          city: selectValue.city,
          latitude: selectValue.latitude,
          longitude: selectValue.longitude,
          label: selectValue.label,
          value: selectValue.value,
          shortenedAddress: selectValue.shortenedAddress,
        }),
      );
    }
  };

  const NoOptionsMessage = (): React.ReactElement => (
    <div className="custom-select__no-options-message">Ничего не найдено</div>
  );

  return (
    <Select
      placeholder="Поиск города"
      onInputChange={(inputValue: string) => setInputValue(inputValue)}
      onChange={handleChangeSelect}
      isSearchable={true}
      isLoading={false}
      className={
        isCityPage ? 'custom-select custom-select--city-page' : 'custom-select'
      }
      classNamePrefix="custom-select"
      name="color"
      options={citiesDb}
      menuIsOpen={menuIsOpen}
      hideSelectedOptions={true}
      components={{
        NoOptionsMessage,
      }}
    />
  );
};

export default SearchSelect;
