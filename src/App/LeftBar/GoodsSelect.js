import List from '@mui/material/List';
import Badge from '@mui/material/Badge';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { useRecoilState, useRecoilValue } from "recoil";
import DrawerItem from "components/DrawerItem";
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
    <DrawerItem
      onClick={handleChange}
      label={name}
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
    </DrawerItem>
  );
}

const GoodsSelect = ({ isOpen }) => {
  const goods = useRecoilValue(goodTypesState);

  return (
    <List>
      {goods.map(good => (
        <Good key={good.id} {...{ good, isOpen }} />
      ))}
    </List>
  );
}

export default GoodsSelect;
