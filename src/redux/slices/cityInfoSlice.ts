import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IInitialState {
  regionType: null | string;
  region: null | string;
  areaType: null | string;
  area: null | string;
  city: null | string;
  latitude: null | string;
  longitude: null | string;
  label: null | string;
  value: null | string;
  shortenedAddress: null | string;
}

const initialState: IInitialState = {
  regionType: null,
  region: null,
  areaType: null,
  area: null,
  city: null,
  latitude: null,
  longitude: null,
  label: null,
  value: null,
  shortenedAddress: null
};

const cityInfoSlice = createSlice({
  name: 'cityInfo',
  initialState,
  selectors: {
    selectCityInfo: state => state,
  },
  reducers: {
    setCityInfo(state, action: PayloadAction<IInitialState>) {
      state.regionType = action.payload.regionType;
      state.region = action.payload.region;
      if (action.payload.areaType === '') {
        state.areaType = null;
      } else {
        state.areaType = action.payload.areaType;
      }
      if (action.payload.area === '') {
        state.area = null;
      } else {
        state.area = action.payload.area;
      }
      state.city = action.payload.city;
      state.latitude = action.payload.latitude;
      state.longitude = action.payload.longitude;
      state.label = action.payload.label;
      state.value = action.payload.value;
      state.shortenedAddress = action.payload.shortenedAddress;
    },
    /* removeUser(state) {
      state.email = null;
      state.token = null;
      state.uid = null;
      state.uMockid = null;
    } */
  },
});

export const { setCityInfo } = cityInfoSlice.actions
export const { selectCityInfo } = cityInfoSlice.selectors
export default cityInfoSlice.reducer
