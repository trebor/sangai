import ControlPanel from './ControlPanel';
import { geoBounds } from "d3-geo";
import ReactMapGl, { useMap } from 'react-map-gl';
import { useEffect, useState } from 'react';

import './mapbox-gl.css';
import './map.css';
import WardLayer from "./WardLayer";
import PublicGoodsLayer from "./PublicGoodsLayer";
import { useRecoilValue } from 'recoil';
import { filteredWardsGeojsonState } from "state";

const MAPBOX_TOKEN = 'pk.eyJ1IjoidHJlYm9yZXNxdWUiLCJhIjoiY2o1eDNwaXN6MDBjczJ3cW81ODB5MXVhaiJ9.laxgliFuMkrQdZEMiEofaw';

const MapInteraction = () => {
  const { current: map } = useMap();
  const wardsGeojson = useRecoilValue(filteredWardsGeojsonState);

  useEffect(() => {
    map.fitBounds(geoBounds(wardsGeojson), {padding: 40, duration: 1000});
  }, [wardsGeojson, map]);

  return null;
}

const Map = () => {
  const [mapStyle, setMapStyle] = useState(null);

  return (
    <>
      <ReactMapGl
        mapStyle={mapStyle && mapStyle.toJS()}
        styleDiffing
        mapboxAccessToken={MAPBOX_TOKEN}
      >
        <MapInteraction/>
        <WardLayer />
        <PublicGoodsLayer />
      </ReactMapGl>
      <div style={{visibility: "hidden"}}>
        <ControlPanel onChange={setMapStyle} />
      </div>
    </>
  );
}

export default Map;
