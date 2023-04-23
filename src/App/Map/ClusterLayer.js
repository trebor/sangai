import Box from '@mui/material/Box';
import { group } from "d3-array";
import { useMap } from 'react-map-gl';
import Typography from '@mui/material/Typography';
import { useRecoilValue } from "recoil";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Layer, Source, Popup } from 'react-map-gl';
import { useCallback, useEffect, useState } from 'react';

import {
  goodTypesState,
  publicGoodsGeojsonState,
  showClustersState
} from "state";

const CLUSTER_COLOR = "#fff";
const CLUSTERS = [
  {
    upto: 10,
    radius: 30,
    color: CLUSTER_COLOR
  },
  {
    upto: 20,
    radius: 40,
    color: CLUSTER_COLOR
  },
  {
    upto: 50,
    radius: 50,
    color: CLUSTER_COLOR
  },
  {
    upto: 100,
    radius: 60,
    color: CLUSTER_COLOR
  },
  {
    upto: 1000,
    radius: 100,
    color: CLUSTER_COLOR
  },
];

const clusterLayer = {
  id: 'clusters',
  type: 'circle',
  source: 'publicGoodsClusters',
  filter: ['has', 'point_count'],
  paint: {
    'circle-opacity': 0.7,
    'circle-stroke-opacity': 0.1,
    'circle-stroke-color': 'black',
    'circle-stroke-width': 1,
    'circle-color': ['step', ['get', 'point_count'],
      ...CLUSTERS.map(({ upto, color }) => [ color, upto ]).flat(),
      CLUSTER_COLOR
    ],
    'circle-radius': ['step', ['get', 'point_count'],
      ...CLUSTERS.map(({ upto, radius }) => [ radius, upto ]).flat(),
      100
    ]
  }
};

const clusterCountLayer = {
  id: 'cluster-count',
  type: 'symbol',
  source: 'publicGoodsClusters',
  filter: ['has', 'point_count'],
  layout: {
    'text-field': '{point_count_abbreviated}',
    'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
    'text-size': 36,
  },
  paint: {
    'text-color': "#444",
  }
};

export const unclusteredPointLayer = {
  id: 'unclustered-point',
  type: 'circle',
  source: 'publicGoodsClusters',
  filter: ['!', ['has', 'point_count']],
  paint: {
    'circle-color': '#11b4da',
    'circle-radius': 4,
    'circle-stroke-width': 1,
    'circle-stroke-color': '#fff'
  }
};

const unclusteredSymboleLayer = {
  id: 'unclustered-symbol',
  type: 'symbol',
  source: 'publicGoodsClusters',
  filter: ['!', ['has', 'point_count']],
  layout: {
    'icon-image': ["get", "type"], // reference the image
    'icon-size': 0.04,
    'icon-allow-overlap': true,
  },
};

const layers = [
  clusterLayer,
  clusterCountLayer,
  unclusteredSymboleLayer
]

const ClusteredLayers = ({ id, cluster, onItemEnter, onItemExit }) => {
  const { current: map } = useMap();
  const publicGoodsGeojson = useRecoilValue(publicGoodsGeojsonState);
  const showClusters = useRecoilValue(showClustersState);
  const visible = cluster ? showClusters : !showClusters;
  const sourceId = `goods-${id}`;
  const clusterLayerId = `${sourceId}-clusters`;
  const unclusteredLayerId = `${sourceId}-unclustered-symbol`;

  const handleMove = useCallback(({ point, lngLat, features }) => {
    const [{ layer: { id } }] = features;
    if (id === unclusteredLayerId) {
      onItemEnter({ point: lngLat, features });
      return;
    }

    const [{ properties: { cluster_id, point_count }}] = map
          .queryRenderedFeatures(point, { layers: [id] });

    map.getSource(sourceId).getClusterLeaves(
      cluster_id,
      point_count,
      0,
      (err, features) => {
        if (err) throw new Error(err);
        onItemEnter({ point: lngLat, features });
      }
    );
  }, [map, onItemEnter, sourceId, unclusteredLayerId]);

  const handleLeave = useCallback(() => {
    onItemExit()
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
      clusterRadius={100}
    >
      {
        layers.map(layer => (
          <Layer
            key={layer.id }
            {...{
              ...layer,
              source: sourceId,
              id: `${sourceId}-${layer.id}`,
              layout: {
                ...(layer.layout || {}),
                visibility: visible ? "visible" : "none"
              }
            }}
          />
        ))
      }
    </Source>
  );
}

const FeaturesPopup = ({ handleClose, popupProperties }) => {
  const goods = useRecoilValue(goodTypesState);

  if (!popupProperties) {
    return null;
  }

  const { features, point: { lng, lat }} = popupProperties;
  const groups = group(features, d => d.properties.type);
  const goodsWithGroups = goods
    .map(good => ({ good, group: groups.get(good.id)}))
    .filter(d => !!d.group);

  return (
    <Popup
      longitude={lng}
      latitude={lat}
      onClose={handleClose}
      closeButton={false}
      maxWidth="300px"
    >
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <Box sx={{ typography: "h4", py: 1, alignSelf: "center" }}>
          Public Goods
        </Box>
        {goodsWithGroups.map(({ good, group }) => (
          <Box sx={{ display: "flex", alignItems: "baseline", p: 1 }}>
            <FontAwesomeIcon
              icon={good.icon}
              size="xl"
              color={good.color}
              fixedWidth
            />
            <Box sx={{
              width: "2em",
              textAlign:"right",
              typography: "h6",
              fontWeight: 'bold',
              px: 1
            }}>
              {group.length}
            </Box>
            <Typography noWrap sx={{
              typography: "body2",
              textTransform: 'uppercase'
            }}>
              {good.name}
            </Typography>
          </Box>
        ))}
      </Box>
    </Popup>
  );
}

const ClusterLayer = () => {
  const [ popupProperties, setPopupProperties ] = useState(null);

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
