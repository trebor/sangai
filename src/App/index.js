import './App.css';

import Box from '@mui/material/Box';
import Map from 'components/Map';
import TopBar from './TopBar';

function App() {
  return (
    <Box sx={{
      height: "100%",
      display: "flex",
      flexDirection: "column",
    }}>
      <TopBar />
      <Box sx={{ display: "flex", flex: "1 1 0" }}>
        <Map />
      </Box>
    </Box>
  );
}

export default App;
