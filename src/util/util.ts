import { shuffle } from "lodash";
import { Chore } from "../Chore";
import chores from "./chores.json";

export const getAllChores = (): Array<Chore> => {
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

export const pickRandomSelectedChore = (store: unknown): Array<Chore> => {
  const chore_arr: Chore[] = getAllChores();
  const reduced_chores = chore_arr.filter(
    //@ts-ignore
    (el) => store.checked[el.id] === true
  );
  // const len = reduced_chores.length;
  // const choice = Math.floor(Math.random() * len);
  // return reduced_chores[choice];
  let shuff = shuffle(reduced_chores);
  if (shuff.length > 7) {
    shuff.length = 7;
  }
  return shuff;
};

export const calcTotalTime = (choices: Array<Chore>): number => {
  return choices.reduce((acc, cur) => acc + cur.time, 0);
};

export const daysOfTheWeek = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];
