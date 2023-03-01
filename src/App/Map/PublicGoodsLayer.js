import { Source, Layer } from 'react-map-gl';
import { useRecoilValue } from 'recoil';
import { goodTypesState, publicGoodsGeojsonState } from "state";


const PublicGoodsLayer = () => {
  const publicGoodsGeojson = useRecoilValue(publicGoodsGeojsonState);
  const goodTypes = useRecoilValue(goodTypesState);

  const configuration = {
    id: 'goods',
    type: 'circle',
    paint: {
      'circle-color': [
        'match', ['get','type'],
        ...goodTypes.map(({ id, color }) => [id, color]).flat(),
        "black"
      ],
      'circle-opacity': 0.9,
    }
  };

  return (
    <Source type="geojson" data={publicGoodsGeojson}>
      <Layer {...configuration} />
    </Source>
  );
}

export default PublicGoodsLayer;
