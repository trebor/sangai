import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';

export default function ItemSelector({ item, items, setItem, title }) {
  const handleChange = (event) => {
    setItem(event.target.value);
  };

  return (
    <div>
      <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="demo-simple-select-standard-label">Province</InputLabel>
        <Select
          value={item}
          onChange={handleChange}
          label={title}
        >
          {items.map(d => (
            <MenuItem key={d.id} value={d}>{d.name}</MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
