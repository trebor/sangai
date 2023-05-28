import List from '@mui/material/List';
import Avatar from '@mui/material/Avatar';
import Switch from '@mui/material/Switch';
import BubbleChart from '@mui/icons-material/BubbleChart';
import { useTheme } from '@mui/material/styles';
import ScatterPlot from '@mui/icons-material/ScatterPlot';
import { useRecoilState } from "recoil";

import DrawerItem from "components/DrawerItem";
import { showClustersState } from "state";

const CheckIcon = ({ Icon }) => {
  const { palette } = useTheme();

  return (
    <Avatar
      sx={{
        bgcolor: palette.primary.main,
        width: 25,
        height: 25,
        mt: -0.3
      }}>
      <Icon />
    </Avatar>
  );
}

const ClusterSelect = () => {
  const [ showClusters, setShowClusters ] = useRecoilState(showClustersState);

  return (
    <List>
      <DrawerItem label="Cluster" >
        <Switch
          _sx={{ background: "lightgreen" }}
          onChange={({ target: { checked }}) => setShowClusters(checked)}
          checked={showClusters}
          checkedIcon={<CheckIcon Icon={BubbleChart} />}
          icon={<CheckIcon Icon={ScatterPlot} />}
        />
      </DrawerItem>
    </List>
  );
}

export default ClusterSelect;
