import { index } from "d3-array";
import { atom, selector, selectorFamily } from "recoil";
import { GOODS_PROPERTIES_BY_ID, goodTypeToImage } from "utility";
import {
  selectedProvinceState,
  selectedDistrictState,
  selectedMunicipalityState,
  selectedWardState,
} from "state";

import { fetchGoodTypes, fetchPublicGoods } from "api";

export const showClustersState = atom({
  key: "showClusters",
  default: false,
});

export const imagesLoadedState = atom({
  key: "imagesLoaded",
  default: false,
});

export const goodTypesState = selector({
  key: "goodTypes",
  get: ({ get }) =>
    fetchGoodTypes()
      .then((goodTypes) => {
        const typePromises = goodTypes
          .map((goodType) => ({
            ...goodType,
            ...GOODS_PROPERTIES_BY_ID[goodType.id],
          }))
          .map((type) =>
            goodTypeToImage(type).then((image) => ({
              ...type,
              image,
            }))
          );
        return Promise.all(typePromises);
      })
      .then((types) => types.sort((a, b) => a.name.localeCompare(b.name))),
});

export const goodTypesMapState = selector({
  key: "goodTypesMap",
  get: ({ get }) => index(get(goodTypesState), (d) => d.id),
});

export const selectedGoodTypesState = atom({
  key: "selectedGoodTypes",
  default: selector({
    key: "selectedGoodTypesDefault",
    get: ({ get }) => [get(goodTypesState)[0]],
  }),
});

export const publicGoodsState = selector({
  key: "publicGoods",
  get: ({ get }) =>
    get(selectedGoodTypesState)
      .map((goodType) => get(publicGoodState(goodType)))
      .flat(),
});

export const publicGoodState = selectorFamily({
  key: "publicGoods",
  get:
    (goodType) =>
    ({ get }) =>
      fetchPublicGoods(
        get(selectedProvinceState).id,
        get(selectedDistrictState).id,
        get(selectedMunicipalityState).id,
        get(selectedWardState).id,
        goodType.id
      ),
});

export const publicGoodsGeojsonState = selector({
  key: "publicGoodsGeojson",
  get: ({ get }) => ({
    type: "FeatureCollection",
    name: "goods",
    features: get(publicGoodsState).map(
      ({ shape: { properties, ...restShape }, ...rest }) => ({
        ...restShape,
        properties: {
          ...properties,
          ...rest,
        },
      })
    ),
  }),
});
