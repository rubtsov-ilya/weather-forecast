const useGetBgInImageWrapper = (codeNumber: number, dayTime: 'day' | 'night'): string => {
  let bgPath: string = '';
  if (dayTime === 'day') {
    switch (codeNumber) {
    case 0:
      bgPath = '/assets/day/Weather=clear.png';
      break;
    case 1:
    case 2:
      bgPath = '/assets/day/Weather=fewClouds.png';
      break;
    case 3:
    case 45:
    case 48:
      bgPath = '/assets/day/Weather=cloudy.png';
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
      bgPath = '/assets/day/Weather=rain.png';
      break;
    case 71:
    case 73:
    case 75:
    case 77:
    case 85:
    case 86:
      bgPath = '/assets/day/Weather=snow.png';
      break;
    case 95:
    case 96:
    case 99:
      bgPath = '/assets/day/Weather=storm';
      break;
    default:
      bgPath = '/assets/day/Weather=clear.png';
      break
  }} else if (dayTime === 'night') {
    switch (codeNumber) {
    case 0:
      bgPath = '/assets/night/Weather=clear.png';
      break;
    case 1:
    case 2:
      bgPath = '/assets/night/Weather=fewClouds.png';
      break;
    case 3:
    case 45:
    case 48:
      bgPath = '/assets/night/Weather=cloudy.png';
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
      bgPath = '/assets/night/Weather=rain.png';
      break;
    case 71:
    case 73:
    case 75:
    case 77:
    case 85:
    case 86:
      bgPath = '/assets/night/Weather=snow.png';
      break;
    case 95:
    case 96:
    case 99:
      bgPath = '/assets/night/Weather=storm';
      break;
    default:
      bgPath = '/assets/night/Weather=clear.png';
      break
  }}

  return bgPath;
}

export default useGetBgInImageWrapper