import mapboxgl from "mapbox-gl";
import ControlPanel from './ControlPanel';
import { geoBounds } from "d3-geo";
import ReactMapGl, { useMap } from 'react-map-gl';
import { useEffect, useState } from 'react';

import './mapbox-gl.css';
import './map.css';
import WardLayer from "./WardLayer";
import PublicGoodsLayer from "./PublicGoodsLayer";
import { useRecoilValue } from 'recoil';
import { publicGoodsGeojsonState, wardGeojsonState } from "state";

// this fixes an error in production
// eslint-disable-next-line import/no-webpack-loader-syntax
mapboxgl.workerClass = require("worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker").default;

const MAPBOX_TOKEN = 'pk.eyJ1IjoidHJlYm9yZXNxdWUiLCJhIjoiY2o1eDNwaXN6MDBjczJ3cW81ODB5MXVhaiJ9.laxgliFuMkrQdZEMiEofaw';

const MapInteraction = () => {
  const { current: map } = useMap();
  const wardGeojson = useRecoilValue(wardGeojsonState);
  const publicGoodsGeojson = useRecoilValue(publicGoodsGeojsonState);

  useEffect(() => {
    const contentGeojson = {
      type:"FeatureCollection",
      features: [
        ...wardGeojson.features,
        ...publicGoodsGeojson.features,
      ]
    };

    map.fitBounds(geoBounds(contentGeojson), {padding: 40, duration: 1000});
  }, [wardGeojson, publicGoodsGeojson, map]);

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
