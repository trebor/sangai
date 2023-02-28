import wardsGeoJson from 'data/nepal-wards.json';
import { API_HOST_NAME, getUserLang } from "utility";

export const fetchPublicGoods = (
  provinceId,
  districtId,
  municipalityId,
  wardNo,
  goodTypeId
) =>apiFetch(
  `${provinceId}/${districtId}/${municipalityId}/${wardNo}/${goodTypeId}/`
).then(goods => {
  return goods.map(good => ({
    ...good,
    shape: {
      ...good.shape,
      properties: { type: goodTypeId }
    }
  }));
});

export const fetchWardsGeojson = () => Promise.resolve(wardsGeoJson);
export const fetchGoodTypes = () => apiFetch("good-type/");
export const fetchProvinces = () => apiFetch("location/provinces/");
export const fetchDistricts = (provinceId) =>
  apiFetch(`location/province/${provinceId}/`);
export const fetchMunicipalities = (districtId) =>
  apiFetch(`location/district/${districtId}/`);
export const fetchWards2 = (municipalityId) =>
  apiFetch(`location/ward/${municipalityId}/`);

const apiFetch = path => fetch(
  `https://${API_HOST_NAME}/api/${path}?ln=${getUserLang()}`,
  { mode: 'cors' }
)
  .then((response) => response.json());


