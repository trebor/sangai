import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRecoilState, useRecoilValue } from "recoil";

import { goodTypesState, selectedGoodTypesState } from "state";

export default function GoodSelector() {
  const goods = useRecoilValue(goodTypesState);
  const [selectedGoods, setSelectedGoods] = useRecoilState(
    selectedGoodTypesState
  );

  const handleChange = (event, values) => {
    setSelectedGoods(values);
  }

  return (
    <Box>
      <Typography variant="h5" align="center" sx={{p: 2}}>
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
    </Box>
  )
}
