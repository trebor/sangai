import { selector } from "recoil";
import { fetchPublicGoods, fetchWards } from "api";

export const publicGoodsState = selector({
  key: "publicGoods",
  get: () => fetchPublicGoods()
});

export const wardsState = selector({
  key: "wards",
  get: () => fetchWards()
});

export const filteredWardsState = selector({
  key: "filteredWards",
  get: ({ get }) => {
    const wards = get(wardsState);

    return {
      ...wards,
      features: wards.features.filter(d => d.properties.district === "DHANKUTA")
    }
  }
});
