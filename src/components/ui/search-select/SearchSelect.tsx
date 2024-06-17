import { FC, useLayoutEffect, useState } from 'react'
import './SearchSelect.scss'
import Select from "react-select";
import { SingleValue } from 'react-select';
import citiesDb from '../../../../data_base/cities-db.json'

interface SearchSelectProps {
  isCityPage?: boolean;
}

const SearchSelect: FC<SearchSelectProps> = ({ isCityPage }) => {
  const [inputValue, setInputValue] = useState<string>('');
  const [menuIsOpen, setMenuIsOpen] = useState<boolean>(false);

  useLayoutEffect(() => {
    if (inputValue.length > 0) {
      setMenuIsOpen(true);
    } else {
      setMenuIsOpen(false);
    }
    
  }, [inputValue])

  const NoOptionsMessage = () => (
    <div className="custom-select__no-options-message">
      Ничего не найдено
    </div>
  );

  return (
    <Select
      placeholder='Поиск города'
      onInputChange={(inputValue: string) => setInputValue(inputValue)}
      isSearchable={true}
      isLoading={false}
      className={ isCityPage ? `custom-select custom-select--city-page` : "custom-select"}
      classNamePrefix="custom-select"
      name="color"
      options={citiesDb}
      menuIsOpen={menuIsOpen}
      hideSelectedOptions={true}
      components={{
        NoOptionsMessage
      }}
    />
  )
}

export default SearchSelect