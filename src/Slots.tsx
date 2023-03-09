import Options from "./Options";
import chores from "./chores.json";

import bedding from "./assets/chores/bedding.png";
import Slot from "./Slot";
import { useGlobal } from "./state";
import { set, shuffle } from "lodash";
import { useState } from "react";
import { Chore } from "./Chore";
import { getAllChores } from "./util";

const Slots = () => {
  const store = useGlobal((state) => state.data);

  const pickRandomSelectedChore = () => {
    const chore_arr = getAllChores();
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

  const [choices, setChoices] = useState(pickRandomSelectedChore());

  const daysOfTheWeek = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  const [spinning, setSpinning] = useState(false);
  const [deff, setDeff] = useState(true);

  const spin = () => {
    setSpinning(true);
    setTimeout(() => {
      setChoices(pickRandomSelectedChore());
      setDeff(false);
    }, 5000);
  };

  return (
    <div>
      <div className="slots">
        {choices.map((val, idx) => (
          <Slot
            spinning={spinning}
            data={val}
            showDefault={deff}
            day={daysOfTheWeek[idx]}
            key={val.id}
          />
        ))}
      </div>
      <div className="settings">
        <button type="button" className="spinner" onClick={() => spin()}>
          spin
        </button>
        <Options />
      </div>
    </div>
  );
};

export default Slots;
