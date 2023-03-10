import { index } from "d3-array";
import { schemeTableau10 } from "d3-scale-chromatic";
import { atom, selector, selectorFamily } from "recoil";
import {
  faGraduationCap,
  faHouseMedical,
  faTree,
  faRestroom,
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

// icons and colors for each good type

const goodsPropertiesById = ({
  schools: {
    icon: faGraduationCap,
    color: schemeTableau10[1]
  },
  health_centers: {
    icon: faHouseMedical,
    color: schemeTableau10[2]
  },
  public_space: {
    icon: faTree,
    color: schemeTableau10[4]
  },
  public_toilets: {
    icon: faRestroom,
    color: schemeTableau10[6]
  },
  public_water: {
    icon: faFaucet,
    color: schemeTableau10[0]
  },
  roads: {
    icon: faRoad,
    color: schemeTableau10[9]
  },
  solid_waste: {
    icon: faTrash,
    color: schemeTableau10[8]
  },
});

export const goodTypesState = selector({
  key: "goodTypes",
  get: ({ get }) => fetchGoodTypes().then(goodTypes => goodTypes
      .map(goodType => ({
        ...goodType,
        ...goodsPropertiesById[goodType.id],
      }))
      .sort((a, b) => a.name.localeCompare(b.name))
  ),
});

export const goodTypesMapState = selector({
  key: "goodTypesMap",
  get: ({ get }) => index(get(goodTypesState), d => d.id)
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
