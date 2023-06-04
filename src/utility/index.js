import { schemeSet1 } from "d3-scale-chromatic";
import {
  faGraduationCap,
  faHouseMedical,
  faTree,
  faRestroom,
  faFaucet,
  faRoad,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";

// constans

export const HEADER_DRAWER_WIDTH = 205;
export const MAPBOX_TOKEN =
  "pk.eyJ1IjoidHJlYm9yZXNxdWUiLCJhIjoiY2o1eDNwaXN6MDBjczJ3cW81ODB5MXVhaiJ9.laxgliFuMkrQdZEMiEofaw";
export const CUSTOM_MAP_STYLE =
  "mapbox://styles/treboresque/clhxswny2007g01pvf92rggc6";
export const DEFAULT_DISTRICT = "Dhankuta";
export const API_HOST_NAME = "sangai.sujit.net.np";
export const FEEDBACK_URL = "https://github.com/trebor/sangai/issues";
export const ABOUT_URL = "https://github.com/trebor/sangai/#readme";
export const GOODS_PROPERTIES_BY_ID = {
  schools: {
    icon: faGraduationCap,
    color: schemeSet1[3],
    nameField: "Name of the educational institute",
    title: "Schools",
  },
  health_centers: {
    icon: faHouseMedical,
    color: schemeSet1[0],
    nameField: "Name of the health institute",
    title: "Health Centers",
  },
  public_space: {
    icon: faTree,
    color: schemeSet1[2],
    nameField: "Name of the public space",
    title: "Public Spaces",
  },
  public_toilets: {
    icon: faRestroom,
    color: schemeSet1[4],
    nameField: "Name of the public toilet",
    title: "Public Toilets",
  },
  public_water: {
    icon: faFaucet,
    color: schemeSet1[1],
    nameField: "Name of the public water point",
    title: "Water Points",
  },
  roads: {
    icon: faRoad,
    color: schemeSet1[8],
    nameField: "Name of the road",
    title: "Roads",
  },
  solid_waste: {
    icon: faTrash,
    color: schemeSet1[6],
    nameField: "Name of the road solid waste management",
    title: "Trash",
  },
};

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
};

export const getUserLang = () => navigator.language || navigator.userLanguage;

export const goodTypeToImage = (
  type,
  {
    iconSize = 600,
    borderFactor = 0.03,
    cornerFactor = 0.2,
    outsetFactor = 0.4,
    opacity = 1,
    background = "white",
    _background = "rgba(255, 255, 255, 0.6)"
  } = {}
) =>
  new Promise((resolve) => {
    const {
      color,
      icon: {
        icon: [width, height, , , path],
      },
    } = type;
    const maxDim = Math.max(width, height);
    const size = maxDim + outsetFactor * maxDim;
    const borderSize = size * borderFactor;
    const corner = size * cornerFactor;
    const iconTranslate = [borderSize, borderSize].map(d => -2 * d);
    const centerTranslate = [width, height].map((dim) => (size - dim) / 2);

    const svgXml = `
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      viewBox="0 0 ${size} ${size}"
      width="${size}"
      height="${size}"
    >
      <g opacity="${opacity}" transform="translate(${iconTranslate})">
        <rect
          x="${borderSize}"
          y="${borderSize}"
          rx="${corner}"
          ry="${corner}"
          width="${size - borderSize * 2}"
          height="${size - borderSize * 2}"
          stroke="#ddd"
          stroke-width="${borderSize}"
          fill="${background}"
         />
        <g transform="translate(${centerTranslate})">
         <path d="${path}" fill="${color}" />
        </g>
      </g>
    </svg>`;

    const svgBlob = new Blob([svgXml], {
      type: "image/svg+xml;charset=utf-8",
    });

    const image = new Image(iconSize, iconSize);
    image.src = URL.createObjectURL(svgBlob);
    image.addEventListener("load", () => resolve(image));
  });
