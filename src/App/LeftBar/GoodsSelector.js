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

const Good = ({ good, isOpen }) => {
  const { name, color, icon } = good;
  const [ selectedGoods, setSelectedGoods ] = useRecoilState(
    selectedGoodTypesState
  );
  const isSelected = good => selectedGoods.includes(good);

  const handleChange = () => {
    const updatedSelection = isSelected(good)
          ? selectedGoods.filter(d => d.id !== good.id)
          : [good, ...selectedGoods];
    setSelectedGoods(updatedSelection);
  }

  return (
    <ListItem
      disablePadding
      sx={{ display: 'block' }}
      onClick={handleChange}
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
            invisible={!isSelected(good)}
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

  return (
    <List sx={{ mt: 1 }}>
      {goods.map(good => (
        <Good key={good.id} {...{ good, isOpen }} />
      ))}
    </List>
  );
}

export default GoodsSelector;
