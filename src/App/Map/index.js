import mapboxgl from "mapbox-gl";
import { geoBounds } from "d3-geo";
import { useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import ReactMapGl, { NavigationControl, useMap } from 'react-map-gl';

import './mapbox-gl.css';
import './map.css';
import WardLayer from "./WardLayer";
import ClusterLayer from "./ClusterLayer";
import { CUSTOM_MAP_STYLE, MAPBOX_TOKEN } from "utility";
import {
  goodTypesState,
  imagesLoadedState,
  publicGoodsGeojsonState,
  wardGeojsonState
} from "state";

// this fixes an error in production
// eslint-disable-next-line import/no-webpack-loader-syntax
mapboxgl.workerClass = require("worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker").default;

const MapInteraction = () => {
  const { current: map } = useMap();
  const wardGeojson = useRecoilValue(wardGeojsonState);
  const [ imagesLoaded, setImagesLoaded ] = useRecoilState(imagesLoadedState);
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

  // if haven't, load images

  useEffect(() => {
    if (!imagesLoaded) {
      setTimeout(() => {
        types.map(({ id, image }) => map.addImage(id, image));
      });
      setImagesLoaded(true);
    }
  }, [ map, types, imagesLoaded, setImagesLoaded ]);

  return null;
}

const Map = () => {
  return (
    <>
      <ReactMapGl
        mapStyle={CUSTOM_MAP_STYLE}
        mapboxAccessToken={MAPBOX_TOKEN}
      >
        <NavigationControl visualizePitch />
        <MapInteraction/>
        <WardLayer />
        <ClusterLayer />
      </ReactMapGl>
    </>
  );
}

export default Map;
