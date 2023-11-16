import { checkJson } from "./json";

export function env(key?: string) {
  const env = process.env?.[`REACT_APP${key ? "__" + key.toUpperCase() : "_"}`];
  return checkJson(env);
}
