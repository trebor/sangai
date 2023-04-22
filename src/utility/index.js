import { schemeSet1 } from "d3-scale-chromatic";
import {
  faGraduationCap,
  faHouseMedical,
  faTree,
  faRestroom,
  faFaucet,
  faRoad,
  faTrash,
} from '@fortawesome/free-solid-svg-icons'

export const DEFAULT_DISTRICT = "Dhankuta";
export const API_HOST_NAME = "sangai.sujit.net.np";
export const FEEDBACK_URL = "https://github.com/trebor/sangai/issues";
export const ABOUT_URL = "https://github.com/trebor/sangai/#readme";
export const GOODS_PROPERTIES_BY_ID = ({
  schools: {
    icon: faGraduationCap,
    color: schemeSet1[3],
  },
  health_centers: {
    icon: faHouseMedical,
    color: schemeSet1[0],
  },
  public_space: {
    icon: faTree,
    color: schemeSet1[2]
  },
  public_toilets: {
    icon: faRestroom,
    color: schemeSet1[4]
  },
  public_water: {
    icon: faFaucet,
    color: schemeSet1[1]
  },
  roads: {
    icon: faRoad,
    color: schemeSet1[8]
  },
  solid_waste: {
    icon: faTrash,
    color: schemeSet1[6]
  },
});

export const titelize = (string, replacementMap = {}) => {
  if (string === null) return "NULL";
  if (typeof string === "undefined") return "UNDEFINED";
  const safeString =
    typeof string === "string" || string instanceof String
      ? string
      : string.toString();

  const capitalizedString = safeString
    .replace(/_/g, " ")
    .replace(/(^\s+|\s+$)/g, "")
    .toLowerCase()
    .replace(
      /([^a-z0-9]|^)([a-z0-9])(?=[a-z0-9]{0})/g,
      (_, g1, g2) => g1 + g2.toUpperCase()
    );

  return Object.entries(replacementMap).reduce(
    (string, [key, value]) =>
      string.replace(new RegExp(`\\b${key}\\b`, "ig"), value),
    capitalizedString
  );
}

export const getUserLang = () =>
  (navigator.language || navigator.userLanguage)

export const goodTypeToImage = (
  type,
  {
    outset = 200,
    opacity = 1,
    cornerFactor = 0.25
  } = {}
) => new Promise(resolve => {
  const {
    color,
    icon: { icon : [ width, height,,, path ] }
  } = type;
  const size = Math.max(width, height) + outset;
  const radius = size / 2;
  const corner = size * cornerFactor;
  const translate = [width, height].map(dim => (size - dim) / 2);

  const svgXml = `
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      viewBox="0 0 ${size} ${size}"
      width="${size}"
      height="${size}"
    >
      <g opacity="${opacity}">
        <rect
          rx="${corner}"
          ry="${corner}"
          width="${size}"
          height="${size}"
          fill="white"
         />
        <_circle r="${radius}" cx="${radius}" cy="${radius}" fill="white" />
        <g transform="translate(${translate})">
         <path d="${path}" fill="${color}" />
        </g>
      </g>
    </svg>`;

  const svgBlob = new Blob([svgXml], {
    type: 'image/svg+xml;charset=utf-8'
  });

  const image = new Image(size, size);
  image.src = URL.createObjectURL(svgBlob)
  image.addEventListener("load", () => resolve(image));
});
