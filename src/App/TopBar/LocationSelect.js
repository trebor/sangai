import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import Dialog from "@mui/material/Dialog";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import DialogTitle from "@mui/material/DialogTitle";
import { debounce } from "lodash";
import DialogContent from "@mui/material/DialogContent";
import { useEventListener } from "usehooks-ts";
import { useEffect, useRef, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";

import ItemSelect from "components/ItemSelect";
import { locationLevelsState } from "state";

const LocationSelectDialog = ({ setIsOpen }) => {
  const [levels, setLevel] = useRecoilState(locationLevelsState);

  return (
    <DialogContent>
      <Stack spacing={2}>
        {levels.map(({ id, title, options, selected }, i) => (
          <ItemSelect
            key={id}
            items={options}
            item={selected}
            setItem={(item) => {
              setLevel({ item, levelId: id });
              if (i === levels.length - 1) {
                setIsOpen(false);
              }
            }}
            title={title}
          />
        ))}
      </Stack>
    </DialogContent>
  );
};

const LevelLabel = ({ level }) => (
  <Chip
    sx={{
      borderRadius: "6px",
      mx: 0.3,
      fontWeight: "bold",
    }}
    label={level.name}
  />
);

const HideBox = ({ children, sx = {}, ...rest }) => {
  const boxRef = useRef();

  const handleResize = debounce(() => {
    const { current } = boxRef;
    const { children } = current;
    const { y, width } = children[0].getBoundingClientRect();

    for (let i = 1; i < children.length; i++) {
      const child = children[i];
      const { y: childY } = child.getBoundingClientRect();
      child.style.maxWidth = childY === y ? null : `${width}px`;
    }
  }, 100, { leading: true });

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(handleResize, []);
  useEventListener("resize", handleResize);

  return (
    <Box
      ref={boxRef}
      sx={{
        mt: 1.5,
        height: "2em",
        display: "flex",
        flexDirection: "row-reverse",
        flexWrap: "wrap",
        justifyContent: "end",
        minWidth: "0px",
        overflow: "hidden",
        ...sx,
      }}
      {...{ ...rest }}
    >
      {children}
    </Box>
  );
};

const LocationSelect = () => {
  const [isOpen, setIsOpen] = useState(false);
  const levels = useRecoilValue(locationLevelsState);

  return (
    <Box>
      <HideBox onClick={() => setIsOpen(!isOpen)}>
        {[...levels].reverse().map(({ id, selected }) => (
          <LevelLabel key={id} level={selected} />
        ))}
      </HideBox>
      <Dialog onClose={() => setIsOpen(false)} open={isOpen}>
        <IconButton
          sx={{ position: "absolute", right: "0.1rem", top: "0.1rem" }}
          onClick={() => setIsOpen(false)}
        >
          <CloseIcon />
        </IconButton>
        <DialogTitle>Choose Location</DialogTitle>
        <LocationSelectDialog {...{ setIsOpen }} />
      </Dialog>
    </Box>
  );
};

export default LocationSelect;
