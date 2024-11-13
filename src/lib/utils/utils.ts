import { UUID } from "uuidjs";

export const getDeviceId = () => {
  let uuid = localStorage.getItem("uuid");
  if (!uuid) {
    uuid = UUID.genV6().toString();
    localStorage.setItem("uuid", uuid);
  }
  return uuid;
};
