import { styled } from '@mui/material/styles';

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  height: "4.5rem",
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

export default DrawerHeader;
