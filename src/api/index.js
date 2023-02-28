import waters from 'data/public_water.json';
import spaces from 'data/public_space.json';
import wardsGeoJson from 'data/nepal-wards.json';
import { API_HOST_NAME, getUserLang } from "utility";

export const fetchPublicGoods = () => {
  return Promise.resolve({
    type: 'FeatureCollection',
    features: [
      ...applyType(waters.features, "water"),
      ...applyType(spaces.features, "space"),
    ]
  });
};

const applyType = (features, type) => features.map(d => {
  d.properties.type = type
  return d;
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


