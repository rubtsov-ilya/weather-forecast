const useGetWeatherDesc = (codeNumber: number): string => {
  let description: string = '';
  switch (codeNumber) {
  case 0:
    description = 'Ясно';
    break;
  case 1:
    description = 'Малооблачно';
    break;
  case 2:
    description = 'Переменная облачность';
    break;
  case 3:
    description = 'Пасмурно';
    break;
  case 45:
  case 48:
    description = 'Туман';
    break;
  case 51:
    description = 'Легкая морось';
    break;
  case 53:
    description = 'Умеренная морось';
    break;
  case 55:
    description = 'Сильная морось';
    break;
  case 56:
  case 57:
  case 66:
  case 67:
    description = 'Ледяной дождь';
    break;
  case 61:
    description = 'Небольшой дождь';
    break;
  case 63:
  case 65:
    description = 'Дождь';
    break;
  case 71:
    description = 'Небольшой снег';
    break;
  case 73:
    description = 'Снег';
    break;
  case 75:
  case 77:
    description = 'Снежные зерна';
    break;
  case 80:
  case 81:
  case 82:
    description = 'Ливень';
    break;
  case 85:
  case 86:
    description = 'Снегопад';
    break;
  case 95:
    description = 'Гроза';
    break;
  case 96:
  case 99:
    description = 'Гроза с градом';
    break;
  default:
    description = 'Неизвестное значение';
    break
  }
  return description;
}

export default useGetWeatherDesc