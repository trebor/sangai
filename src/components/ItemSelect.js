import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';

export default function ItemSelector({ item, items, setItem, title }) {
  const onlyOneOption = items.length === 1;
  const handleChange = (event) => {
    setItem(event.target.value);
  };

  return (
    <div>
      <FormControl variant="standard" sx={{ mx: 2, _minWidth: 120 }}>
        {
          onlyOneOption ? (
            <>
              <Typography variant="caption" sx={{fontWeight: "light"}}>
                {title}
              </Typography>
              <Typography>{items[0].name}</Typography>
            </>
          ) : (
            <>
              <InputLabel>{title}</InputLabel>
              <Select value={item} onChange={handleChange} label={title}>
                {items.map(d => (
                  <MenuItem key={d.id} value={d}>{d.name}</MenuItem>
                ))}
              </Select>
            </>
          )
        }
      </FormControl>
    </div>
  );
}
