import Tooltip from "@mui/material/Tooltip";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListItemButton from "@mui/material/ListItemButton";
import { useRecoilValue } from "recoil";

import { isDrawOpenState } from "state";

const DrawerItem = ({ children, onClick, label, href, tooltip, sx }) => {
  const isOpen = useRecoilValue(isDrawOpenState);

  return (
    <Tooltip title={tooltip} placement="right" arrow disableFocusListener>
      <ListItem disablePadding sx={{ display: "block", ...sx }}>
        <ListItemButton
          href={href}
          target="_blank"
          onClick={onClick}
          sx={{
            minHeight: 48,
            justifyContent: isOpen ? "initial" : "center",
            px: 1,
          }}
        >
          <ListItemIcon
            sx={{
              minWidth: 58,
              mr: isOpen ? 0.5 : "auto",
              justifyContent: "center",
            }}
          >
            {children}
          </ListItemIcon>
          <ListItemText primary={label} sx={{ opacity: isOpen ? 1 : 0 }} />
        </ListItemButton>
      </ListItem>
    </Tooltip>
  );
};

export default DrawerItem;
