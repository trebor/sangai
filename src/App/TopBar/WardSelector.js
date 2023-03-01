import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import { useRecoilState, useRecoilValue } from "recoil";

import { wardsState, selectedWardState } from "state";

export default function WardSelector() {
  const [ward, setWard] = useRecoilState(selectedWardState);
  const wards = useRecoilValue(wardsState);

  const handleChange = (event) => {
    setWard(event.target.value);
  };

  return (
    <div>
      <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="demo-simple-select-standard-label">Ward</InputLabel>
        <Select
          value={ward}
          onChange={handleChange}
          label="Ward"
        >
          {wards.map(d => (
            <MenuItem key={d.id} value={d}>{d.name}</MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
