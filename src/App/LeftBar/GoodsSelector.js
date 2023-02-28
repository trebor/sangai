import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
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
    <Box flex="1 1 0">
      <Typography variant="h5" align="center" sx={{p: 2}}>
        Public Goods
      </Typography>
      <ToggleButtonGroup
        color="primary"
        orientation="vertical"
        value={selectedGoods}
        onChange={handleChange}
        aria-label="Public Good"
        sx={{minWidth: "12em"}}
      >
        {goods.map(good => (
          <ToggleButton key={good.id} value={good}>
            <Box sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%"
            }}>
              <span>{good.name}</span>
              <Box style={{
                minHeight: "2em",
                minWidth: "2em",
                maxHeight: "2em",
                maxWidth: "2em",
                marginLeft: 8,
                background: good.color,
                borderRadius: 4
              }}/>
            </Box>
          </ToggleButton>
        ))}
      </ToggleButtonGroup>
    </Box>
  )
}
