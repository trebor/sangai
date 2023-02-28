export const DEFAULT_DISTRICT = "Dhankuta";
export const API_HOST_NAME = "sangai.sujit.net.np";

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
  (navigator.language || navigator.userLanguage).split("-")[0]

