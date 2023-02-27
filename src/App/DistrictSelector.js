import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import { useRecoilState, useRecoilValue } from "recoil";

import { districtsState, selectedDistrictState } from "state";

export default function SelectVariants() {
  const [district, setDistrict] = useRecoilState(selectedDistrictState);
  const districts = useRecoilValue(districtsState);

  const handleChange = (event) => {
    setDistrict(event.target.value);
  };

  return (
    <div>
      <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="demo-simple-select-standard-label">District</InputLabel>
        <Select
          value={district}
          onChange={handleChange}
          label="District"
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {districts.map(d => (<MenuItem key={d} value={d}>{d}</MenuItem>))}
        </Select>
      </FormControl>
    </div>
  );
}
