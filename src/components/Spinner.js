import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";

export default function Spinner() {
  return (
    <Box
      sx={{
        display: "flex",
        flex: "1 1 0",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <CircularProgress sx={{ mr: 2 }} />
      <Typography variant="h3">Loading...</Typography>
    </Box>
  );
}
