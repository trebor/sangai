import { Source, Layer } from 'react-map-gl';
import { useRecoilValue } from 'recoil';
import { goodTypesState, publicGoodsState } from "state";


const PublicGoodsLayer = () => {
  const publicGoods = useRecoilValue(publicGoodsState);
  const goodTypes = useRecoilValue(goodTypesState);

  const shape = {
    type: "FeatureCollection",
    name: "goods",
    features: publicGoods.map(d => d.shape)
  };

  const configuration = {
    id: 'goods',
    type: 'circle',
    paint: {
      'circle-color': [
        'match', ['get','type'],
        ...goodTypes.map(({ id, color }) => [id, color]).flat(),
        "black"
      ],
      'circle-opacity': 0.4
    }
  };

  console.log('shape', shape);
  console.log('configuration', configuration);

  return (
    <Source type="geojson" data={shape}>
      <Layer {...configuration} />
    </Source>
  );
}

export default PublicGoodsLayer;
