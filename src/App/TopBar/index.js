import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Button from '@mui/material/Button';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

import LocationSelect from "./LocationSelect";
import { ABOUT_URL, FEEDBACK_URL } from "utility";

export default function TopBar() {
  return (
    <Box>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h2">🇳🇵</Typography>
          <Typography variant="h4">San̐gai</Typography>
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
          <LocationSelect />
        </Toolbar>
      </AppBar>
    </Box>
  );
}
