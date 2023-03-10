import { Marker } from 'react-map-gl';
import { useRecoilValue } from 'recoil';
import { goodTypesMapState, publicGoodsGeojsonState } from "state";

const PublicGoodsMarker = ({ feature, scale = 0.03, opacity = 0.9 }) => {
  const goodTypesMap = useRecoilValue(goodTypesMapState);

  const {
    geometry: { coordinates : [longitude, latitude] },
    properties: { type }
  } = feature;

  const {
    color,
    icon: { icon : [ width, height,,, path ] }
  } = goodTypesMap.get(type);

  return (
    <Marker {...{ longitude, latitude }} _anchor="center" >
      <svg width={width} height={height} transform={`scale(${scale})`}>
        <path d={path} fill={color} opacity={opacity}/>
      </svg>
    </Marker>
  );
}


const PublicGoodsLayer = () => {
  const publicGoodsGeojson = useRecoilValue(publicGoodsGeojsonState);

  return (
    <>
      { publicGoodsGeojson.features.map((feature, i) =>
        <PublicGoodsMarker key={i} {...{feature}} />
      )}
    </>
  );
}

export default PublicGoodsLayer;
