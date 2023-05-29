import List from "@mui/material/List";
import Avatar from "@mui/material/Avatar";
import Switch from "@mui/material/Switch";
import InfoIcon from "@mui/icons-material/Info";
import BubbleChart from "@mui/icons-material/BubbleChart";
import ScatterPlot from "@mui/icons-material/ScatterPlot";
import FeedbackIcon from "@mui/icons-material/Feedback";
import { useTheme } from "@mui/material/styles";
import { useRecoilState, useRecoilValue } from "recoil";

import { ABOUT_URL, FEEDBACK_URL } from "utility";
import DrawerItem from "components/DrawerItem";
import { showClustersState } from "state";

const CheckIcon = ({ Icon }) => {
  const showClusters = useRecoilValue(showClustersState);
  const { palette } = useTheme();

  return (
    <Avatar
      sx={{
        bgcolor: showClusters ? palette.primary.main : "inital",
        width: 25,
        height: 25,
        mt: -0.3,
      }}
    >
      <Icon />
    </Avatar>
  );
};

const Configure = () => {
  const [showClusters, setShowClusters] = useRecoilState(showClustersState);

  return (
    <List>
      <DrawerItem
        label="Cluster Goods"
        tooltip={
          showClusters
            ? "Click to show goods on the map separately"
            : "Click to cluster  goods on the map"
        }
      >
        <Switch
          onChange={({ target: { checked } }) => setShowClusters(checked)}
          checked={showClusters}
          checkedIcon={<CheckIcon Icon={BubbleChart} />}
          icon={<CheckIcon Icon={ScatterPlot} />}
          sx={{ ml: -0.5 }}
        />
      </DrawerItem>
      <DrawerItem
        label="About"
        href={ABOUT_URL}
        tooltip="Click to visit project description"
      >
        <InfoIcon fontSize="large" />
      </DrawerItem>
      <DrawerItem
        label="Feedback"
        href={FEEDBACK_URL}
        tooltip="Click to provide project feedback"
      >
        <FeedbackIcon fontSize="large" />
      </DrawerItem>
    </List>
  );
};

export default Configure;
