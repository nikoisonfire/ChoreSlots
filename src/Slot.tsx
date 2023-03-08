import { Chore } from "./Chore";

import seven from "./assets/seven.png";
import { useEffect, useState } from "react";
import { replaceImgSrc } from "./util";
import { shuffle } from "lodash";

const Slot = ({
  day,
  data,
  showDefault,
  spinning,
}: {
  day: string;
  data: Chore;
  showDefault: boolean;
  spinning: boolean;
}) => {
  const img = new URL(`./assets/chores/${data.icon}`, import.meta.url);

  const defData = shuffle(replaceImgSrc(import.meta.url));

  let classNames = spinning ? "animate" : "";

  return (
    <div className="slot">
      <div className="chore">
        {showDefault ? (
          <ul>
            <li className={classNames}>
              <img src={seven} className="lucky" />
            </li>
            {defData.map((value) => (
              <li className={classNames}>
                <img src={value.icon} />
                <span>{value.name}</span>
              </li>
            ))}
          </ul>
        ) : (
          <ul className={showDefault ? "" : "removeTrf"}>
            <li className={classNames}>
              <img src={img.href} />
              <span>{data.name}</span>
            </li>
          </ul>
        )}
      </div>
      <span className="day">{day}</span>
    </div>
  );
};

export default Slot;
