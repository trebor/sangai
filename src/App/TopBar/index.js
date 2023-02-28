import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

import DistrictSelector from "./DistrictSelector";
import ProvinceSelector from "./ProvinceSelector";
import MunicipalitySelector from "./MunicipalitySelector";

export default function TopBar() {
  return (
    <Box>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h3">🇳🇵</Typography>
          <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
            San̐gai
          </Typography>
          <ProvinceSelector />
          <DistrictSelector />
          <MunicipalitySelector />
        </Toolbar>
      </AppBar>
    </Box>
  );
}
