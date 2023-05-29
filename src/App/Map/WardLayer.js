import { Source, Layer } from "react-map-gl";
import { useRecoilValue } from "recoil";
import { wardGeojsonState } from "state";

const configuration = {
  id: "wards",
  type: "fill",
  paint: {
    "fill-color": "#000000",
    "fill-opacity": 0.1,
  },
};

const WardLayer = () => {
  const wardGeojson = useRecoilValue(wardGeojsonState);

  return (
    <Source id="ward" type="geojson" data={wardGeojson}>
      <Layer {...configuration} />
    </Source>
  );
};

export default WardLayer;
