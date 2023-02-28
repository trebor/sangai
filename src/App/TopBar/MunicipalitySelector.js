import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import { useRecoilState, useRecoilValue } from "recoil";

import { municipalitiesState, selectedMunicipalityState } from "state";

export default function MunicipalitySelector() {
  const [municipality, setMunicipality] = useRecoilState(selectedMunicipalityState);
  const municipalities = useRecoilValue(municipalitiesState);

  const handleChange = (event) => {
    setMunicipality(event.target.value);
  };

  return (
    <div>
      <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="demo-simple-select-standard-label">Municipality</InputLabel>
        <Select
          value={municipality}
          onChange={handleChange}
          label="Municipality"
        >
          {municipalities.map(d => (
            <MenuItem key={d.id} value={d}>{d.name}</MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
