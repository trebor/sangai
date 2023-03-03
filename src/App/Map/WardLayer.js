import { Source, Layer } from 'react-map-gl';
import { useRecoilValue } from 'recoil';
import { wardGeojsonState } from "state";

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
  const wardGeojson = useRecoilValue(wardGeojsonState);

  return (
    <Source type="geojson" data={wardGeojson}>
      <Layer {...configuration} />
    </Source>
  );
}

export default WardLayer;