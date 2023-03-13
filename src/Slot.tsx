import { Chore } from "./Chore";

import seven from "./assets/seven.png";
import { useEffect, useState } from "react";
import { replaceImgSrc } from "./util/util";
import { shuffle } from "lodash";
import React from "react";

const Slot = (props: {
  day: string;
  data: Chore;
  showDefault: boolean;
  spinning: boolean;
}) => {
  const { day, data, showDefault, spinning } = props;
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
            <li>
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
