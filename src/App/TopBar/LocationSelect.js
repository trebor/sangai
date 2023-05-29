import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Dialog from '@mui/material/Dialog';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import DialogTitle from '@mui/material/DialogTitle';
import { debounce } from "lodash";
import DialogContent from '@mui/material/DialogContent';
import { useRef, useState } from "react";
import { useEventListener } from 'usehooks-ts'
import { useRecoilState, useRecoilValue } from "recoil";

import ItemSelect from "components/ItemSelect";
import { locationLevelsState } from "state";
import { wardsState, selectedWardState } from "state";
import { districtsState, selectedDistrictState } from "state";
import { provincesState, selectedProvinceState } from "state";
import { municipalitiesState, selectedMunicipalityState } from "state";

const LocationSelectDialog = () => {
  const [
    municipality,
    setMunicipality
  ] = useRecoilState(selectedMunicipalityState);
  const [province, setProvince] = useRecoilState(selectedProvinceState);
  const [district, setDistrict] = useRecoilState(selectedDistrictState);
  const [ward, setWard] = useRecoilState(selectedWardState);

  return (
    <DialogContent>
      <Stack spacing={2}>
        <ItemSelect
          items={useRecoilValue(provincesState)}
          item={province}
          setItem={setProvince}
          title="Province"
        />
        <ItemSelect
          items={useRecoilValue(districtsState)}
          item={district}
          setItem={setDistrict}
          title="District"
        />
        <ItemSelect
          items={useRecoilValue(municipalitiesState)}
          item={municipality}
          setItem={setMunicipality}
          title="Municipality"
        />
        <ItemSelect
          items={useRecoilValue(wardsState)}
          item={ward}
          setItem={setWard}
          title="Ward"
        />
      </Stack>
    </DialogContent>
  );
}

const LevelLabel = ({ level }) => (
  <Chip sx={{ mx: 0.2, fontWeight: "bold" }} label={level.name} />
);

const HideBox = ({ children, sx = {}, ...rest }) => {
  const boxRef = useRef();

  const handleResize = () => {
    const { current } = boxRef;
    const { children } = current;
    const { y, width } = children[0].getBoundingClientRect();

    for(let i = 1; i < children.length; i++){
      const child = children[i];
      const { y: childY } = child.getBoundingClientRect();
      child.style.maxWidth = (childY === y ? null : `${width}px`);
    }
  }

  useEventListener(
    'resize',
    debounce(handleResize, 100, { leading: true })
  );

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
        ...sx
      }}
      {...{...rest}}
    >
      {children}
    </Box>)
};

const LocationSelect = () => {
  const [ isOpen, setIsOpen ] = useState(false);
  const levels = useRecoilValue(locationLevelsState);

  return (
    <Box>
      <HideBox onClick={() => setIsOpen(!isOpen)}>
        {
          [...levels].reverse().map(
            ({ id, selected }) => (<LevelLabel key={id} level={selected} />)
          )
        }
      </HideBox>
      <Dialog onClose={() => setIsOpen(false)} open={isOpen}>
        <IconButton
          sx={{position: "absolute", right: "0.1rem", top: "0.1rem"}}
          onClick={() => setIsOpen(false)}
        >
          <CloseIcon />
        </IconButton>
        <DialogTitle>
          Choose Location
        </DialogTitle>
        <LocationSelectDialog />
      </Dialog>
    </Box>
  );
}

export default LocationSelect;
