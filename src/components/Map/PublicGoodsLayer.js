import { Source, Layer } from 'react-map-gl';
import { useRecoilValue } from 'recoil';
import { publicGoodsState } from "state";

const configuration = {
  id: 'goods',
  type: 'circle',
  paint: {
    'circle-color': [
      'match', ['get','type'],
      'water', '#0000ff',
      'space', '#00ff00',
      'schools', '#ff2288',
      'red',
    ],
    'circle-opacity': 0.4
  }
};

const PublicGoodsLayer = () => {
  const publicGoods = useRecoilValue(publicGoodsState);
  console.log('publicGoods', publicGoods);

  const shape = {
    type: "FeatureCollection",
    name: "goods",
    features: publicGoods.map(d => d.shape)
  };

  console.log('shape', shape);

  return (
    <Source type="geojson" data={shape}>
      <Layer {...configuration} />
    </Source>
  );
}

export default PublicGoodsLayer;
