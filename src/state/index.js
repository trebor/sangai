import { createTheme } from '@mui/material/styles';
import { schemeTableau10 } from "d3-scale-chromatic";
import { scaleOrdinal } from "d3-scale";
import { orange as primary } from '@mui/material/colors';
import { atom, selector, selectorFamily } from "recoil";

import {
  fetchGoodTypes,
  fetchPublicGoods,
  fetchProvinces,
  fetchDistricts,
  fetchMunicipalities,
  fetchWards,
  fetchWardsGeojson
} from "api";

// goods

export const goodColorsState = atom({
  key: "goodColors",
  default: scaleOrdinal(schemeTableau10),
});

export const goodTypesState = selector({
  key: "goodTypes",
  get: ({ get }) => fetchGoodTypes().then(goodTypes => goodTypes
      .map(goodType => ({
        ...goodType,
        color: get(goodColorsState)(goodType.id)
      }))
      .sort((a, b) => a.name.localeCompare(b.name))
  ),
});

export const selectedGoodTypesState = atom({
  key: "selectedGoodTypes",
  default: selector({
    key: "selectedGoodTypesDefault",
    get: ({ get }) => [get(goodTypesState)[0]]
  })
});

export const publicGoodsState = selector({
  key: "publicGoods",
  get: ({ get }) => get(selectedGoodTypesState)
    .map(goodType => get(publicGoodState(goodType)))
    .flat()
});

export const publicGoodState = selectorFamily({
  key: "publicGoods",
  get: (goodType) => ({ get }) => fetchPublicGoods(
    get(selectedProvinceState).id,
    get(selectedDistrictState).id,
    get(selectedMunicipalityState).id,
    get(selectedWardState).id,
    goodType.id
  )
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
    const id = get(selectedMunicipalityState).id;
    return fetchWards(id);
  },
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

export const wardGeojsonState = selector({
  key: "wardGeojson",
  get: ({ get }) => {
    const wardsGeojson = get(wardsGeojsonState);
    const municipalityId = get(selectedMunicipalityState).id - 1;
    const wardId = get(selectedWardState).id;

    return {
      ...wardsGeojson,
      features: wardsGeojson.features.filter(
        d => d.properties.new_ward_n === wardId
          && d.properties.sddmm === municipalityId
      )
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
