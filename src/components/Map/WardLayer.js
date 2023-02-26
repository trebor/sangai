import { Source, Layer } from 'react-map-gl';

import wards from 'data/nepal-wards.json';

const configuration = {
  id: 'wards',
  type: 'fill',
  paint: {
    'fill-outline-color': '#000000',
    'fill-color':'#0088ff',
    'fill-opacity': 0.1
  }
};

const WardLayer = () => {
  wards.features = wards.features
    .filter(d => d.properties.district === "DHANKUTA");

  return (
    <Source type="geojson" data={wards}>
      <Layer {...configuration} />
    </Source>
  );
}

export default WardLayer;
