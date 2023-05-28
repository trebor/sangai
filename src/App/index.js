import Box from '@mui/material/Box';
import { Suspense } from "react"
import { ThemeProvider } from '@mui/material/styles';
import { useRecoilValue } from 'recoil';

import './App.css';
import Map from './Map';
import TopBar from './TopBar2';
import LeftBar from './LeftBar';
import Spinner from 'components/Spinner';
import DrawerHeader from "components/DrawerHeader";
import { themeState } from 'state';

export default function App() {
  return (
    <ThemeProvider theme={useRecoilValue(themeState)}>
      <Box sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}>
        <Suspense fallback={<Spinner />}>
          <Box sx={{ display: 'flex' }}>
            <TopBar position="fixed" />
            <LeftBar position="fixed" />
            <Box component="main" sx={{ flexGrow: 1 }}>
              <DrawerHeader />
            </Box>
          </Box>
          <Map />
        </Suspense>
      </Box>
    </ThemeProvider>
  );
}
