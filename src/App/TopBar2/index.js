import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Button from '@mui/material/Button';
import Toolbar from '@mui/material/Toolbar';
import MenuIcon from '@mui/icons-material/Menu';
import MuiAppBar from '@mui/material/AppBar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { styled, useTheme } from '@mui/material/styles';

import LocationSelect from "./LocationSelect";
import { HEADER_DRAWER_WIDTH } from "utility";
import { ABOUT_URL, FEEDBACK_URL } from "utility";

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

export default function TopBar({ position, open, handleDrawerOpen }) {
  return (
    <AppBar {...{ position, open }}>
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={handleDrawerOpen}
          edge="start"
          sx={{
            p: 1.5,
            ml: -2,
            ...(open && { display: 'none' }),
          }}
        >
            <MenuIcon fontSize="large" />
        </IconButton>
        <Typography variant="h2" sx={{ pl: 0, ml: -1.5 }}>🇳🇵</Typography>
        <Typography sx={{pt: 0.5}} variant="h4">San̐gai</Typography>
        <Box sx={{
          pl: 2,
          pt: 2,
          display: "flex",
          flexGrow: 1,
          justifyContent: "start",
          alignItems: "end",
        }}>
          <Button
            component={Link}
            href={ABOUT_URL}
            target="_blank"
            sx={{ color: "inherit" }}
          >
            About
          </Button>
          <Button
            component={Link}
            href={FEEDBACK_URL}
            target="_blank"
            sx={{ color: "inherit" }}
          >
            Feedback
          </Button>
        </Box>
        {/* <LocationSelect /> */}
      </Toolbar>
    </AppBar>
  );
}
