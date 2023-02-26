import { Source, Layer } from 'react-map-gl';

import waters from 'data/public_water.json';

const configuration = {
  id: 'water',
  type: 'circle',
  paint: {
    'circle-color': '#0000ff',
    'circle-opacity': 0.5
  }
};

const WaterLayer = () => {
  return (
    <Source type="geojson" data={waters}>
      <Layer {...configuration} />
    </Source>
  );
}

export default WaterLayer;
