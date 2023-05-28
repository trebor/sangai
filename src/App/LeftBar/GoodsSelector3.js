import List from '@mui/material/List';
import Badge from '@mui/material/Badge';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { useRecoilState, useRecoilValue } from "recoil";
import {
  goodTypesState,
  selectedGoodTypesState,
} from "state";

const Good = ({ good: { name, color, icon }, isOpen }) => {
  return (
    <ListItem
      disablePadding
      sx={{ display: 'block' }}
    >
      <ListItemButton
        sx={{
          minHeight: 48,
          justifyContent: isOpen ? 'initial' : 'center',
          px: 2.5,
        }}
      >
        <ListItemIcon
          sx={{
            minWidth: 40,
            mr: isOpen ? 3 : 'auto',
            justifyContent: 'center',
          }}
        >
          <Badge
            color="secondary"
            variant="dot"
            /* anchorOrigin={{ horizontal: "left", vertical: 'top' }} */
          >
            <FontAwesomeIcon
              icon={icon}
              size="2xl"
              color={color}
            />
          </Badge>
        </ListItemIcon>
        <ListItemText
          primary={name}
          sx={{ opacity: isOpen ? 1 : 0 }}
        />
      </ListItemButton>
    </ListItem>
  );
}

const GoodsSelector = ({ isOpen }) => {
  const goods = useRecoilValue(goodTypesState);
  const [ selectedGoods, setSelectedGoods ] = useRecoilState(
    selectedGoodTypesState
  );

  const handleChange = (event, values) => {
    setSelectedGoods(values);
  }

  return (
    <List sx={{ mt: 1 }}>
      {goods.map(good => (
        <Good key={good.id} {...{ good, isOpen }} />
      ))}
    </List>
  );
}

export default GoodsSelector;
