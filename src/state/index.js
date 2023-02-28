import { createTheme } from '@mui/material/styles';
import { atom, selector } from "recoil";
import { orange as primary } from '@mui/material/colors';

import { titelize, DEFAULT_DISTRICT } from "utility";
import { fetchGoodTypes, fetchPublicGoods, fetchWards } from "api";


export const goodTypesState = selector({
  key: "goodTypes",
  get: fetchGoodTypes,
});

export const selectedGoodTypesState = atom({
  key: "selectedGoodTypes",
  default: selector({
    key: "selectedGoodTypesDefault",
    get: ({ get }) => get(goodTypesState).slice(0, 1)
  })
});

export const publicGoodsState = selector({
  key: "publicGoods",
  get: () => fetchPublicGoods()
});

export const wardsState = selector({
  key: "wards",
  get: fetchWards
});

export const districtsState = selector({
  key: "districts",
  get: ({ get }) => {
    const wards = get(wardsState);
    return [...new Set(wards.features.map(d => d.properties.district))]
      .map(titelize).sort();
  }
});

export const selectedDistrictState = atom({
  key: "selecteDistrict",
  default: DEFAULT_DISTRICT
});

export const filteredWardsState = selector({
  key: "filteredWards",
  get: ({ get }) => {
    const wards = get(wardsState);
    const selectedDistrict = get(selectedDistrictState).toLowerCase();

    return {
      ...wards,
      features: wards.features.filter(
        d => d.properties.district.toLowerCase() === selectedDistrict)
    }
  }
});

const themeOverride = {
  palette: {
    primary,
  }
}

export const themeState = atom({
  key: "theme",
  default: createTheme(themeOverride),
  dangerouslyAllowMutability: true
});
