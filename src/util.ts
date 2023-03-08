import { Chore } from "./Chore";
import chores from "./chores.json";

export const getAllChores = () => {
  return [
    ...chores.Bathroom,
    ...chores.Kitchen,
    ...chores.Laundry,
    ...chores.Misc,
  ];
};
export const replaceImgSrc = (metaUrl: string) => {
  const chores = getAllChores();

  return chores.map((value) => {
    const img = new URL(`./assets/chores/${value.icon}`, metaUrl);
    return {
      ...value,
      icon: img.href,
    };
  });
};
