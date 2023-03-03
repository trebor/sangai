import { useRecoilState, useRecoilValue } from "recoil";

import { municipalitiesState, selectedMunicipalityState } from "state";
import { provincesState, selectedProvinceState } from "state";
import { districtsState, selectedDistrictState } from "state";
import { wardsState, selectedWardState } from "state";
import ItemSelect from "components/ItemSelect";

export default function LocationSelect() {
  const [
    municipality,
    setMunicipality
  ] = useRecoilState(selectedMunicipalityState);
  const [province, setProvince] = useRecoilState(selectedProvinceState);
  const [district, setDistrict] = useRecoilState(selectedDistrictState);
  const [ward, setWard] = useRecoilState(selectedWardState);

  return (
    <>
      <ItemSelect
        items={useRecoilValue(provincesState)}
        item={province}
        setItem={setProvince}
        title="Provinces"
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
    </>
  );
}
