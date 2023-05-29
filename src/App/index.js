import Box from '@mui/material/Box';
import { Suspense } from "react"
import { ThemeProvider } from '@mui/material/styles';
import { useRecoilValue } from 'recoil';

import './App.css';
import Map from './Map';
import TopBar from './TopBar';
import LeftBar from './LeftBar';
import Spinner from 'components/Spinner';
import DrawerHeader from "components/DrawerHeader";
import { themeState } from 'state';

export default function App() {
  return (
    <ThemeProvider theme={useRecoilValue(themeState)}>
      <Box height="100%" display="flex" flexDirection="column">
        <Suspense fallback={<Spinner />}>
          <Box sx={{ display: 'flex', flexGrow: 1 }}>
            <LeftBar />
            <TopBar />
            <Box
              display="flex"
              flexDirection="column"
              flexGrow="1"
            >
              <DrawerHeader />
              <Suspense fallback={<Spinner />}>
                <Box flexGrow="1">
                  <Map />
                </Box>
              </Suspense>
            </Box>
          </Box>
        </Suspense>
      </Box>
    </ThemeProvider>
  );
}
