import Options from "./Options";
import chores from "./util/chores.json";

import bedding from "./assets/chores/bedding.png";
import Slot from "./Slot";
import { useGlobal } from "./util/state";
import { set, shuffle } from "lodash";
import { useState } from "react";
import { Chore } from "./Chore";
import {
  calcTotalTime,
  daysOfTheWeek,
  getAllChores,
  pickRandomSelectedChore,
} from "./util/util";
import AddToCalendar from "./AddToCalendar";

const Slots = () => {
  const store = useGlobal((state) => state.data);

  const [choices, setChoices] = useState(pickRandomSelectedChore(store));
  const [spinning, setSpinning] = useState(false);
  const [deff, setDeff] = useState(true);
  const [total, setTotal] = useState(0);

  const handleSpinClick = (e: React.FormEvent) => {
    setDeff(true);
    setSpinning(true);
    setTimeout(() => {
      const ch = pickRandomSelectedChore(store);
      setChoices(ch);
      setDeff(false);
      setTotal(calcTotalTime(ch));
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
        {!deff ? (
          <>
            <AddToCalendar chores={choices} />
            <div className="time">
              <strong>Total time:</strong> {total} minutes -{" "}
              <strong>Average/Day:</strong> {Math.floor(total / 7)} minutes
            </div>
          </>
        ) : null}
        <button type="button" className="spinner" onClick={handleSpinClick}>
          spin
        </button>
        <Options />
      </div>
    </div>
  );
};

export default Slots;
