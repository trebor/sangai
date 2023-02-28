import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import { useRecoilState, useRecoilValue } from "recoil";

import { provincesState, selectedProvinceState } from "state";

export default function ProvinceSelector() {
  const [province, setProvince] = useRecoilState(selectedProvinceState);
  const provinces = useRecoilValue(provincesState);

  const handleChange = (event) => {
    setProvince(event.target.value);
  };

  return (
    <div>
      <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="demo-simple-select-standard-label">Province</InputLabel>
        <Select
          value={province}
          onChange={handleChange}
          label="Province"
        >
          {provinces.map(d => (
            <MenuItem key={d.id} value={d}>{d.name}</MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
