import Box from '@mui/material/Box';
import { ThemeProvider } from '@mui/material/styles';
import { useRecoilValue } from 'recoil';

import './App.css';
import Map from './Map';
import TopBar from './TopBar';
import LeftBar from './LeftBar';
import { themeState } from 'state';

function App() {
  return (
    <ThemeProvider theme={useRecoilValue(themeState)}>
      <Box sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}>
        <TopBar />
        <Box sx={{ display: "flex", flex: "1 1 0" }}>
          <LeftBar />
          <Map />
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default App;
