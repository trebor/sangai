import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import ArrowDropDown from '@mui/icons-material/ArrowDropDown';

export default function ItemSelector({ item, items, setItem, title }) {
  const onlyOneOption = items.length === 1;
  const handleChange = (event) => {
    setItem(event.target.value);
  };

  return (
    <div>
      <FormControl fullWidth variant="standard" sx={{ mt: 1 }}>
        <InputLabel sx={{ fontWeight: "bold" }}>{title}</InputLabel>
        <Select
          disabled={onlyOneOption}
          IconComponent={!onlyOneOption ? ArrowDropDown : () => null}
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
