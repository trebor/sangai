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
export const fetchWards = (municipalityId) =>
apiFetch(`location/municipality/${municipalityId}/`).then(
  wards => wards.map(({ name, id}) =>
    ({ name: `Ward ${name}`, id: name, mapId: parseInt(id) })
  ));

const apiHost = window.location.host.startsWith("localhost")
  ? `https://${API_HOST_NAME}`
  : "";

const apiFetch = path => fetch(
  `${apiHost}/api/${path}?ln=${getUserLang()}`,
  { mode: 'cors' }
)
  .then((response) => response.json());


