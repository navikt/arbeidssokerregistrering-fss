import packageInfo from "../../package.json";
import { amplitudeLogger } from "./amplitude-utils";

const appname = packageInfo.name;
const appversion = packageInfo.version;

const prefix = {
  appname,
  appversion,
};

export function uniLogger(name: string, values?: Record<string, unknown>) {
  const data = values || {};
  amplitudeLogger(name, { ...prefix, ...data });
  return true;
}
