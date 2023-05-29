import { createTheme } from '@mui/material/styles';
import { orange as primary } from '@mui/material/colors';
import { blue as secondary } from '@mui/material/colors';
import { atom } from "recoil";

const themeOverride = {
  palette: {
    primary,
    secondary,
    background: {
      default: "#e4f0e2"
    }
  }
}

export const themeState = atom({
  key: "theme",
  default: createTheme(themeOverride),
  dangerouslyAllowMutability: true
});
