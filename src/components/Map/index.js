import './mapbox-gl.css';
import './map.css';

import ReactMapGl from 'react-map-gl';
import ControlPanel from './ControlPanel';
import { useState } from 'react';

import PublicGoodsLayer from "./PublicGoodsLayer";
import WardLayer from "./WardLayer";

const MAPBOX_TOKEN = 'pk.eyJ1IjoidHJlYm9yZXNxdWUiLCJhIjoiY2o1eDNwaXN6MDBjczJ3cW81ODB5MXVhaiJ9.laxgliFuMkrQdZEMiEofaw';

const Map = () => {
  const [mapStyle, setMapStyle] = useState(null);


  return (
    <>
      <ReactMapGl
        initialViewState={{
          latitude: 27.0,
          longitude: 87.340469,
          zoom: 10
        }}
        mapStyle={mapStyle && mapStyle.toJS()}
        styleDiffing
        mapboxAccessToken={MAPBOX_TOKEN}
      >
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
