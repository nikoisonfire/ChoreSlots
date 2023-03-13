import Options from "./Options";
import chores from "./util/chores.json";

import bedding from "./assets/chores/bedding.png";
import Slot from "./Slot";
import { useGlobal } from "./util/state";
import { isEqual, set, shuffle } from "lodash";
import { useEffect, useState } from "react";
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
  const setLast = useGlobal((state) => state.setLast);

  const defaultChoice =
    store?.lastRoll && store?.lastRoll.length > 0
      ? store?.lastRoll
      : pickRandomSelectedChore(store);

  console.log("From store? ", isEqual(defaultChoice, store?.lastRoll));

  const [choices, setChoices] = useState(defaultChoice);
  const [spinning, setSpinning] = useState(false);
  const [deff, setDeff] = useState(!isEqual(defaultChoice, store?.lastRoll));
  const [total, setTotal] = useState(0);

  const handleSpinClick = (e: React.FormEvent) => {
    setDeff(true);
    setSpinning(true);
    setTimeout(() => {
      const ch = pickRandomSelectedChore(store);
      if (ch) {
        setChoices(ch);
        //@ts-ignore
        setLast(ch);
        setDeff(false);
        setTotal(calcTotalTime(ch));
      }
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
