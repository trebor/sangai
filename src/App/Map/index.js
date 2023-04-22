import mapboxgl from "mapbox-gl";
import ControlPanel from './ControlPanel';
import { geoBounds } from "d3-geo";
import ReactMapGl, { useMap } from 'react-map-gl';
import { useEffect, useState } from 'react';

import './mapbox-gl.css';
import './map.css';
import WardLayer from "./WardLayer";
import ClusterLayer from "./ClusterLayer";
import { useRecoilValue } from 'recoil';
import { goodTypesState, publicGoodsGeojsonState, wardGeojsonState } from "state";

// this fixes an error in production
// eslint-disable-next-line import/no-webpack-loader-syntax
mapboxgl.workerClass = require("worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker").default;

const MAPBOX_TOKEN = 'pk.eyJ1IjoidHJlYm9yZXNxdWUiLCJhIjoiY2o1eDNwaXN6MDBjczJ3cW81ODB5MXVhaiJ9.laxgliFuMkrQdZEMiEofaw';

const MapInteraction = () => {
  const { current: map } = useMap();
  const wardGeojson = useRecoilValue(wardGeojsonState);
  const publicGoodsGeojson = useRecoilValue(publicGoodsGeojsonState);
  const types = useRecoilValue(goodTypesState);

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


  // load images... in a bit

  setTimeout(() => {
    types.map(({ id, image }) => map.addImage(id, image));
  });

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
        /* interactiveLayerIds={[ */
        /*   "clusters", */
        /*   "cluster-count", */
        /*   "unclustered-point", */
        /*   "unclustered-symbol", */
        /* ]} */
      >
        <MapInteraction/>
        <WardLayer />
        <ClusterLayer />
      </ReactMapGl>
      <div style={{visibility: "hidden"}}>
        <ControlPanel onChange={setMapStyle} />
      </div>
    </>
  );
}

export default Map;
