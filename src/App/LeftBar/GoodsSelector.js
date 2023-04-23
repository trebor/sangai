import Box from '@mui/material/Box';
import Switch from '@mui/material/Switch';
import Typography from '@mui/material/Typography';
import ToggleButton from '@mui/material/ToggleButton';
import FormControlLabel from '@mui/material/FormControlLabel';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRecoilState, useRecoilValue } from "recoil";

import {
  goodTypesState,
  selectedGoodTypesState,
  showClustersState
} from "state";

// import Avatar from '@mui/material/Avatar';
// import BubbleChart from '@mui/icons-material/BubbleChart';
// import ScatterPlot from '@mui/icons-material/ScatterPlot';
//
// const CheckIcon = ({ icon }) => (
//   <Avatar  sx={{ bgColor: "primary", mt: -0.4, width: 25, height: 25 }}>
//     {icon}
//   </Avatar>
// );

export default function GoodSelector() {
  const goods = useRecoilValue(goodTypesState);
  const [ showClusters, setShowClusters ] = useRecoilState(showClustersState);
  const [ selectedGoods, setSelectedGoods ] = useRecoilState(
    selectedGoodTypesState
  );

  const handleChange = (event, values) => {
    setSelectedGoods(values);
  }

  return (
    <Box>
      <Typography variant="h4" align="center" sx={{p: 2}}>
        Public Goods
      </Typography>
      <ToggleButtonGroup
        color="primary"
        orientation="vertical"
        value={selectedGoods}
        onChange={handleChange}
        aria-label="Public Good"
        sx={{minWidth: "12em", width: "18em"}}
      >
        {goods.map(good => (
          <ToggleButton key={good.id} value={good}>
            <Box sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%"
            }}>
              <FontAwesomeIcon
                icon={good.icon}
                size="2x"
                color={good.color}
              />
              <span>{good.name}</span>
            </Box>
          </ToggleButton>
        ))}
      </ToggleButtonGroup>
    <Box sx={{ p: 2, pb: 5}}>
        <FormControlLabel
          style={{width: "100%" }}
          control={
            <Switch
              onChange={({ target }) => setShowClusters(target.checked)}
              checked={showClusters}
              /* checkedIcon={<CheckIcon icon={<BubbleChart />}/>} */
              /* icon={<CheckIcon icon={<ScatterPlot />}/>} */
            />}
          label="Cluster Goods"
        />
      </Box>
    </Box>
  )
}
