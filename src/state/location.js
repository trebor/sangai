import { atom, selector } from "recoil";

import {
  fetchProvinces,
  fetchDistricts,
  fetchMunicipalities,
  fetchWards,
  fetchWardsGeojson,
} from "api";

// provinces

export const provincesState = selector({
  key: "provinces",
  get: fetchProvinces,
});

export const selectedProvinceState = atom({
  key: "selectedProvince",
  default: selector({
    key: "selectedProvincesDefault",
    get: ({ get }) => get(provincesState)[0],
  }),
});

// districts

export const districtsState = selector({
  key: "districts",
  get: ({ get }) => fetchDistricts(get(selectedProvinceState).id),
});

export const selectedDistrictState = atom({
  key: "selecteDistrict",
  default: selector({
    key: "selectedDistrictsDefault",
    get: ({ get }) => get(districtsState)[0],
  }),
});

// municipalities

export const municipalitiesState = selector({
  key: "municipalities",
  get: ({ get }) => fetchMunicipalities(get(selectedDistrictState).id),
});

export const selectedMunicipalityState = atom({
  key: "selectedMunicipality",
  default: selector({
    key: "selectedMunicipalityDefault",
    get: ({ get }) => get(municipalitiesState)[0],
  }),
});

// wards

export const wardsState = selector({
  key: "wardsjson",
  get: ({ get }) => {
    const id = get(selectedMunicipalityState).id;
    return fetchWards(id);
  },
});

export const locationLevelsMetaState = selector({
  key: "locationLevelsMata",
  get: ({ get }) => {
    return [
      {
        id: "province",
        title: "Province",
        optionsState: provincesState,
        selectedState: selectedProvinceState,
      },
      {
        id: "district",
        title: "District",
        optionsState: districtsState,
        selectedState: selectedDistrictState,
      },
      {
        id: "municipality",
        title: "Municipality",
        optionsState: municipalitiesState,
        selectedState: selectedMunicipalityState,
      },
      {
        id: "ward",
        title: "Ward",
        optionsState: wardsState,
        selectedState: selectedWardState,
      },
    ];
  },
});

export const locationLevelsState = selector({
  key: "locationLevels",
  get: ({ get }) =>
    get(locationLevelsMetaState).map((level) => ({
      ...level,
      options: get(level.optionsState),
      selected: get(level.selectedState),
    })),
  set: ({ get, set }, { item, levelId }) => {
    const { selectedState } = get(locationLevelsMetaState).find(
      (d) => d.id === levelId
    );
    set(selectedState, item);
  },
});

export const selectedWardState = atom({
  key: "selectedWard",
  default: selector({
    key: "selectedWardsDefault",
    get: ({ get }) => get(wardsState)[0],
  }),
});

export const wardsGeojsonState = selector({
  key: "wardsGeojson",
  get: fetchWardsGeojson,
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
        (d) =>
          d.properties.new_ward_n === wardId &&
          d.properties.sddmm === municipalityId
      ),
    };
  },
});
