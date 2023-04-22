import { Layer, Source } from 'react-map-gl';
import { useRecoilValue } from "recoil";

import { publicGoodsGeojsonState } from "state";

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
    'text-size': 12
  },
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

const ClusterLayer = () => {
  const publicGoodsGeojson = useRecoilValue(publicGoodsGeojsonState);

  return (
    <Source
      id="publicGoodsClusters"
      type="geojson"
      data={publicGoodsGeojson}
      cluster={true}
      clusterRadius={100}
    >
      <Layer {...clusterLayer} />
      <Layer {...clusterCountLayer} />
      {/* <Layer {...unclusteredPointLayer} /> */}
      <Layer {...unclusteredSymboleLayer} />
    </Source>
  );
}

export default ClusterLayer;
