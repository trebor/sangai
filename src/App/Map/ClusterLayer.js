import Box from "@mui/material/Box";
import { useMap } from "react-map-gl";
import Typography from "@mui/material/Typography";
import { scalePow } from "d3-scale";
import { group, extent } from "d3-array";
import { useRecoilValue } from "recoil";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Layer, Source, Popup } from "react-map-gl";
import { useCallback, useEffect, useState } from "react";

import {
  goodTypesState,
  publicGoodsGeojsonState,
  showClustersState,
} from "state";

const CLUSTER_RADIUS = 55;
const CLUSTER_COLOR = "#fff";
const CLUSTER_COUNT_UPTOS = [10, 25, 50, 100, 1000];

const clusterRadiusScale = scalePow()
  .exponent(0.1)
  .domain(extent(CLUSTER_COUNT_UPTOS))
  .range([CLUSTER_RADIUS * 0.4, CLUSTER_RADIUS]);

const CLUSTERS = CLUSTER_COUNT_UPTOS.map((upto) => ({
  upto,
  radius: clusterRadiusScale(upto),
  color: CLUSTER_COLOR,
}));

const clusterLayer = {
  id: "clusters",
  type: "circle",
  source: "publicGoodsClusters",
  filter: ["has", "point_count"],
  paint: {
    "circle-opacity": 0.7,
    "circle-stroke-opacity": 0.1,
    "circle-stroke-color": "black",
    "circle-stroke-width": 1,
    "circle-color": [
      "step",
      ["get", "point_count"],
      ...CLUSTERS.map(({ upto, color }) => [color, upto]).flat(),
      CLUSTER_COLOR,
    ],
    "circle-radius": [
      "step",
      ["get", "point_count"],
      ...CLUSTERS.map(({ upto, radius }) => [radius, upto]).flat(),
      100,
    ],
  },
};

const clusterCountLayer = {
  id: "cluster-count",
  type: "symbol",
  source: "publicGoodsClusters",
  filter: ["has", "point_count"],
  layout: {
    "text-field": "{point_count_abbreviated}",
    "text-font": ["DIN Offc Pro Medium", "Arial Unicode MS Bold"],
    "text-size": 34,
  },
  paint: {
    "text-color": "#444",
  },
};

const unclusteredSymboleLayer = {
  id: "unclustered-symbol",
  type: "symbol",
  source: "publicGoodsClusters",
  filter: ["!", ["has", "point_count"]],
  layout: {
    "icon-image": ["get", "type"], // reference the image
    "icon-size": 0.04,
    "icon-allow-overlap": true,
  },
};

const layers = [clusterLayer, clusterCountLayer, unclusteredSymboleLayer];

const ClusteredLayers = ({ id, cluster, onItemEnter, onItemExit }) => {
  const { current: map } = useMap();
  const publicGoodsGeojson = useRecoilValue(publicGoodsGeojsonState);
  const showClusters = useRecoilValue(showClustersState);
  const visible = cluster ? showClusters : !showClusters;
  const sourceId = `goods-${id}`;
  const clusterLayerId = `${sourceId}-clusters`;
  const unclusteredLayerId = `${sourceId}-unclustered-symbol`;

  const handleMove = useCallback(
    ({ point, lngLat, features }) => {
      const [
        {
          layer: { id },
        },
      ] = features;
      if (id === unclusteredLayerId) {
        onItemEnter({ point: lngLat, features });
        return;
      }

      const [
        {
          properties: { cluster_id, point_count },
        },
      ] = map.queryRenderedFeatures(point, { layers: [id] });

      map
        .getSource(sourceId)
        .getClusterLeaves(cluster_id, point_count, 0, (err, features) => {
          if (err) throw new Error(err);
          onItemEnter({ point: lngLat, features });
        });
    },
    [map, onItemEnter, sourceId, unclusteredLayerId]
  );

  const handleLeave = useCallback(() => {
    onItemExit();
  }, [onItemExit]);

  useEffect(() => {
    map.on("mousemove", clusterLayerId, handleMove);
    map.on("mousemove", unclusteredLayerId, handleMove);
    map.on("mouseleave", clusterLayerId, handleLeave);
    map.on("mouseleave", unclusteredLayerId, handleLeave);
    // eslint-disable-next-line
  }, []);

  return (
    <Source
      id={sourceId}
      type="geojson"
      data={publicGoodsGeojson}
      cluster={cluster}
      clusterRadius={CLUSTER_RADIUS}
    >
      {layers.map((layer) => (
        <Layer
          key={layer.id}
          {...{
            ...layer,
            source: sourceId,
            id: `${sourceId}-${layer.id}`,
            layout: {
              ...(layer.layout || {}),
              visibility: visible ? "visible" : "none",
            },
          }}
        />
      ))}
    </Source>
  );
};

const ClusterPopupContent = ({ features }) => {
  const goods = useRecoilValue(goodTypesState);
  const groups = group(features, (d) => d.properties.type);
  const goodsWithGroups = goods
    .map((good) => ({ good, group: groups.get(good.id) }))
    .filter((d) => !!d.group);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", px: 1 }}>
      <Box sx={{ typography: "h6", py: 1 }}>Public Goods</Box>
      {goodsWithGroups.map(({ good, group }) => (
        <Box
          key={good.id}
          sx={{ display: "flex", alignItems: "baseline", px: 1 }}
        >
          <Box
            sx={{
              width: "1.5em",
              textAlign: "right",
              typography: "h6",
              fontWeight: "bold",
              pr: 1,
            }}
          >
            {group.length}
          </Box>
          <FontAwesomeIcon
            icon={good.icon}
            size="xl"
            color={good.color}
            fixedWidth
          />
          <Typography
            noWrap
            sx={{
              typography: "body2",
              textTransform: "uppercase",
              pl: 1,
            }}
          >
            {good.title}
          </Typography>
        </Box>
      ))}
    </Box>
  );
};

const FeaturePopupContent = ({ feature: { properties } }) => {
  const { color, icon, nameField } = useRecoilValue(goodTypesState).find(
    (d) => d.id === properties.type
  );
  const { tole } = JSON.parse(properties.address);
  const details = JSON.parse(properties.properties);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", px: 1 }}>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <FontAwesomeIcon icon={icon} size="3x" color={color} fixedWidth />
        <Box sx={{ typography: "h6", pl: 1, _alignSelf: "center" }}>
          {details[nameField]}
        </Box>
      </Box>
      <Box typography="body1">{tole}</Box>
    </Box>
  );
};

const FeaturesPopup = ({ handleClose, popupProperties }) => {
  if (!popupProperties || !popupProperties.features || !popupProperties.point) {
    return null;
  }

  const {
    features,
    point: { lng, lat },
  } = popupProperties;

  return (
    <Popup
      longitude={lng}
      latitude={lat}
      onClose={handleClose}
      closeButton={false}
      closeOnMove={true}
      maxWidth="250px"
      offset={20}
    >
      {features.length > 1 ? (
        <ClusterPopupContent {...{ features }} />
      ) : (
        <FeaturePopupContent feature={features[0]} />
      )}
    </Popup>
  );
};

const ClusterLayer = () => {
  const [popupProperties, setPopupProperties] = useState(null);

  return (
    <>
      <ClusteredLayers
        id="clustered"
        cluster={true}
        onItemEnter={setPopupProperties}
        onItemExit={() => setPopupProperties(null)}
      />
      <ClusteredLayers
        id="separate"
        cluster={false}
        onItemEnter={setPopupProperties}
        onItemExit={() => setPopupProperties(null)}
      />
      <FeaturesPopup
        popupProperties={popupProperties}
        handleClose={() => setPopupProperties({})}
      />
    </>
  );
};

export default ClusterLayer;
