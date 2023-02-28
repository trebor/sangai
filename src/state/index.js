import { createTheme } from '@mui/material/styles';
import { atom, selector } from "recoil";
import { orange as primary } from '@mui/material/colors';

import {
  fetchGoodTypes,
  fetchPublicGoods,
  fetchProvinces,
  fetchDistricts,
  fetchMunicipalities,
  fetchWardsGeojson
} from "api";

// goods

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
  get: fetchPublicGoods
});

// provinces

export const provincesState = selector({
  key: "provinces",
  get: fetchProvinces
});

export const selectedProvinceState = atom({
  key: "selectedProvince",
  default: selector({
    key: "selectedProvincesDefault",
    get: ({ get }) => get(provincesState)[0]
  })
});

// districts

export const districtsState = selector({
  key: "districts",
  get: ({ get }) => fetchDistricts(get(selectedProvinceState).id)
});

export const selectedDistrictState = atom({
  key: "selecteDistrict",
  default: selector({
    key: "selectedDistrictsDefault",
    get: ({ get }) => get(districtsState)[0]
  })
});

// municipalities

export const municipalitiesState = selector({
  key: "municipalities",
  get: ({ get }) => fetchMunicipalities(get(selectedDistrictState).id)
});

export const selectedMunicipalityState = atom({
  key: "selectedMunicipality",
  default: selector({
    key: "selectedMunicipalityDefault",
    get: ({ get }) => get(municipalitiesState)[0]
  })
});

// wards

export const wardsState = selector({
  key: "wardsjson",
  get: ({ get }) => {
    return [
      { id: 1, name: "Ward 1" },
      { id: 1, name: "Ward 7" },
    ]
  }
});

export const selectedWardState = atom({
  key: "selectedWard",
  default: selector({
    key: "selectedWardsDefault",
    get: ({ get }) => get(wardsState)[0]
  })
});

export const wardsGeojsonState = selector({
  key: "wardsGeojson",
  get: fetchWardsGeojson
});

export const filteredWardsGeojsonState = selector({
  key: "filteredWardsGeojson",
  get: ({ get }) => {
    const wardsGeojson = get(wardsGeojsonState);
    const selectedDistrict = get(selectedDistrictState).name.toLowerCase();

    return {
      ...wardsGeojson,
      features: wardsGeojson.features.filter(
        d => d.properties.district.toLowerCase() === selectedDistrict)
    }
  }
});

// theme

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
