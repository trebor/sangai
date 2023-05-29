import Box from "@mui/material/Box";
import List from "@mui/material/List";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { useRecoilState, useRecoilValue } from "recoil";
import DrawerItem from "components/DrawerItem";
import { goodTypesState, selectedGoodTypesState } from "state";

const Good = ({ good, isOpen }) => {
  const { title, color, icon } = good;
  const [selectedGoods, setSelectedGoods] = useRecoilState(
    selectedGoodTypesState
  );
  const isSelected = selectedGoods.includes(good);

  const handleChange = () => {
    const updatedSelection = isSelected
      ? selectedGoods.filter((d) => d.id !== good.id)
      : [good, ...selectedGoods];
    setSelectedGoods(updatedSelection);
  };

  return (
    <DrawerItem
      tooltip={`${isSelected ? "Hide" : "Show"} ${title}`}
      onClick={handleChange}
      label={title}
    >
      <Box position="relative">
        <FontAwesomeIcon icon={icon} size="2xl" color={color} />
        <CheckCircleIcon
          color="secondary"
          sx={{
            position: "absolute",
            left: "50%",
            bottom: "-0.3em",
            background: "white",
            borderRadius: "50%",
            visibility: isSelected ? "visible" : "hidden",
          }}
        />
      </Box>
    </DrawerItem>
  );
};

const GoodsSelect = ({ isOpen }) => {
  const goods = useRecoilValue(goodTypesState);

  return (
    <List>
      {goods.map((good) => (
        <Good key={good.id} {...{ good, isOpen }} />
      ))}
    </List>
  );
};

export default GoodsSelect;
