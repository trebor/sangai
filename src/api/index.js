import waters from 'data/public_water.json';
import spaces from 'data/public_space.json';
import wards from 'data/nepal-wards.json';

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

export const fetchWards = () => Promise.resolve(wards);
