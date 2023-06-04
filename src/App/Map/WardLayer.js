import { difference } from '@turf/turf';
import { useRecoilValue } from "recoil";
import { Source, Layer } from "react-map-gl";

import { wardGeojsonState } from "state";

const ENTIRE_EARTH = {
  coordinates: [
    [
      [-180, -90],
      [ 180, -90],
      [ 180,  90],
      [-180,  90],
      [-180, -90]
    ]
  ],
  type: "Polygon"
};

const LAYER_CONFIGURATION = {
  id: "wards",
  type: "fill",
  paint: {
    "fill-color": "#000000",
    "fill-opacity": 0.1,
  },
};

const WardLayer = () => {
  const { features, ...wardGeojson } = useRecoilValue(wardGeojsonState);

  const data = {
    ...wardGeojson,
    features: features.map(feature => difference(ENTIRE_EARTH, feature))
  };

  return (
    <Source id="ward" type="geojson" data={data}>
      <Layer {...LAYER_CONFIGURATION} />
    </Source>
  );
};

export default WardLayer;
