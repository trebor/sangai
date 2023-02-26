import { Source, Layer } from 'react-map-gl';
import { useRecoilValue } from 'recoil';
import { publicGoodsState } from "state";

const configuration = {
  id: 'space',
  type: 'circle',
  paint: {
    'circle-color': [
      'match', ['get','type'],
      'water', '#0000ff',
      'space', '#00ff00',
      'red',
    ],
    'circle-opacity': 0.2
  }
};

const PublicGoodsLayer = () => {
  const publicGoods = useRecoilValue(publicGoodsState);

  return (
    <Source type="geojson" data={publicGoods}>
      <Layer {...configuration} />
    </Source>
  );
}

export default PublicGoodsLayer;
