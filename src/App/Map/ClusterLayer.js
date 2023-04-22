import { Layer, Source } from 'react-map-gl';
import { useRecoilValue } from "recoil";

import { publicGoodsGeojsonState, showClustersState } from "state";

const CLUSTER_COLOR = "#ddd";

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
]

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

const ClusteredLayers = ({ id, cluster }) => {
  const publicGoodsGeojson = useRecoilValue(publicGoodsGeojsonState);
  const showClusters = useRecoilValue(showClustersState);
  const visible = cluster ? showClusters : !showClusters;
  const sourceId = `goods-${id}`;

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

const ClusterLayer = () => (
  <>
    <ClusteredLayers id="clustered" cluster={true} />
    <ClusteredLayers id="separate" cluster={false} />
  </>
);

export default ClusterLayer;
