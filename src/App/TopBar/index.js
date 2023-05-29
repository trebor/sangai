import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import MenuIcon from '@mui/icons-material/Menu';
import MuiAppBar from '@mui/material/AppBar';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { useRecoilState } from "recoil";

import LocationSelect from "./LocationSelect";
import { isDrawOpenState } from "state";
import { HEADER_DRAWER_WIDTH } from "utility";

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: HEADER_DRAWER_WIDTH,
    width: `calc(100% - ${HEADER_DRAWER_WIDTH}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

export default function TopBar() {
  const [ isDrawOpen, setIsDrawOpen] = useRecoilState(isDrawOpenState);

  return (
    <AppBar {...{ position: "fixed", open: isDrawOpen }}>
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={() => setIsDrawOpen(true)}
          edge="start"
          sx={{
            p: 1.5,
            ml: -2,
            ...(isDrawOpen && { display: 'none' }),
          }}
        >
          <MenuIcon fontSize="large" />
        </IconButton>
        <Box display="flex" flexGrow="1" alignItems="center">
          <Typography variant="h2" sx={{
            mr: -0.5,
            ml: -1.5,
          }}>🇳🇵</Typography>
          <Typography
            variant="h4"
            sx={{
              display: "block",
              flexGrow: 1,
              pt: 1.2,
              mr: 1
            }}
          >
            San̐gai
          </Typography>
        </Box>
        <LocationSelect />
      </Toolbar>
    </AppBar>
  );
}
