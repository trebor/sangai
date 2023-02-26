import { Source, Layer } from 'react-map-gl';

import spaces from 'data/public_space.json';

const configuration = {
  id: 'space',
  type: 'circle',
  paint: {
    'circle-color': '#ff00ff',
    'circle-opacity': 0.5
  }
};

const SpaceLayer = () => {
  return (
    <Source type="geojson" data={spaces}>
      <Layer {...configuration} />
    </Source>
  );
}

export default SpaceLayer;
