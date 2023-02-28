import ControlPanel from './ControlPanel';
import { geoBounds } from "d3-geo";
import ReactMapGl, { useMap } from 'react-map-gl';
import { useEffect, useState } from 'react';

import './mapbox-gl.css';
import './map.css';
import WardLayer from "./WardLayer";
import PublicGoodsLayer from "./PublicGoodsLayer";
import { useRecoilValue } from 'recoil';
import {
  selectedWardState,
  districtGeojsonState,
  wardGeojsonState
} from "state";

const MAPBOX_TOKEN = 'pk.eyJ1IjoidHJlYm9yZXNxdWUiLCJhIjoiY2o1eDNwaXN6MDBjczJ3cW81ODB5MXVhaiJ9.laxgliFuMkrQdZEMiEofaw';

const MapInteraction = () => {
  const { current: map } = useMap();
  const districtGeojson = useRecoilValue(districtGeojsonState);
  const wardGeojson = useRecoilValue(wardGeojsonState);
  // const selectedWard = useRecoilValue(selectedWardState);
  // console.log('districtGeojson', districtGeojson);
  // console.log('selectedWard', selectedWard);
  console.log('wardGeojson', wardGeojson);
  // new_ward_n

  useEffect(() => {
    map.fitBounds(geoBounds(districtGeojson), {padding: 40, duration: 1000});
  }, [districtGeojson, wardGeojson, map]);

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
