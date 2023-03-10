import { scaleOrdinal } from "d3-scale";
import { schemeTableau10 } from "d3-scale-chromatic";
import { atom, selector, selectorFamily } from "recoil";
import {
  faSchool,
  faHouseMedical,
  faTree,
  faToilet,
  faFaucet,
  faRoad,
  faTrash,
}from '@fortawesome/free-solid-svg-icons'

import {
  selectedProvinceState,
  selectedDistrictState,
  selectedMunicipalityState,
  selectedWardState
} from "state";

import { fetchGoodTypes, fetchPublicGoods } from "api";

// fontawesome icons for each good type

const goodsIconById = ({
  schools: faSchool,
  health_centers: faHouseMedical,
  public_space: faTree,
  public_toilets: faToilet,
  public_water: faFaucet,
  roads: faRoad,
  solid_waste: faTrash,
});

export const goodColorsState = atom({
  key: "goodColors",
  default: scaleOrdinal(schemeTableau10),
});

export const goodTypesState = selector({
  key: "goodTypes",
  get: ({ get }) => fetchGoodTypes().then(goodTypes => goodTypes
      .map(goodType => ({
        ...goodType,
        color: get(goodColorsState)(goodType.id),
        icon: goodsIconById[goodType.id]
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

export const publicGoodsGeojsonState = selector({
  key: "publicGoodsGeojson",
  get: ({ get }) => ({
    type: "FeatureCollection",
    name: "goods",
    features: get(publicGoodsState).map(d => d.shape)
  })
});
