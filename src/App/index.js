import Box from '@mui/material/Box';
import { Suspense } from "react"
import { ThemeProvider } from '@mui/material/styles';
import { useRecoilValue } from 'recoil';

import './App.css';
import Map from './Map';
// import TopBar from './TopBar2';
import LeftBar from './LeftBar';
import Spinner from 'components/Spinner';
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
          {/* <TopBar /> */}
          {/* <Box sx={{ display: "flex", flex: "1 1 0" }}> */}
            <LeftBar />
            {/* <Suspense fallback={<Spinner />}> */}
            {/*   <Map /> */}
            {/* </Suspense> */}
          {/* </Box> */}
        </Suspense>
      </Box>
    </ThemeProvider>
  );
}
