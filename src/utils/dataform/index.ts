import checkError from "./validation";

export default function dataForm<T>(form: HTMLFormElement): T | null {
  const elements = [
    ...Array.from(new Set(
      Object.values(form.elements).filter((el) => el.nodeName === "INPUT")
    )),
  ] as HTMLInputElement[];

  if (elements.length === 0) return null;

  let data: { [key in string]: any } = {};

  for (const [index, elem] of Object.entries(elements)) {
    const { name, value } = elem;

    if (checkError(elem) === true) return null;

    if (value !== "") data[name] = value;

    if (Number(index) === elements.length - 1)
      elements.forEach((el) => (el.value = ""));
  }

  return data as T;
}
