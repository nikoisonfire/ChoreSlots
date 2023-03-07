import Options from "./Options";
import chores from "./chores.json";

import bedding from "./assets/chores/bedding.png";
import Slot from "./Slot";
import { useGlobal } from "./state";
import { shuffle } from "lodash";

const Slots = () => {
  const store = useGlobal((state) => state.data);

  const pickRandomSelectedChore = () => {
    const chore_arr = [
      ...chores.Bathroom,
      ...chores.Kitchen,
      ...chores.Laundry,
      ...chores.Misc,
    ];
    const reduced_chores = chore_arr.filter(
      (el) => store.checked[el.id] === true
    );
    // const len = reduced_chores.length;
    // const choice = Math.floor(Math.random() * len);
    // return reduced_chores[choice];
    return shuffle(reduced_chores);
  };

  const choices = pickRandomSelectedChore();

  const daysOfTheWeek = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  return (
    <div>
      <div className="slots">
        {choices.map((val, idx) => (
          <Slot data={val} day={daysOfTheWeek[idx]} key={val.id} />
        ))}
      </div>
      <div className="settings">
        <button type="button" className="spinner">
          spin
        </button>
        <Options />
      </div>
    </div>
  );
};

export default Slots;
