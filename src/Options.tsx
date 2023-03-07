import { useEffect, useState } from "react";
import { Chore } from "./Chore";
import chores from "./chores.json";
import { useGlobal } from "./state";

const Options = () => {
  return (
    <div className="options">
      {Object.keys(chores).map((key) => (
        <OptionsPanel key={key} items={chores[key]} name={key} />
      ))}
    </div>
  );
};

const OptionsPanel = ({
  name,
  items,
}: {
  name: string;
  items: Array<Chore>;
}) => {
  return (
    <div className="option-panel">
      <h3>{name}</h3>
      <ul>
        {items.map((element) => (
          <ChoreOption key={element.name} data={element} />
        ))}
      </ul>
    </div>
  );
};

const ChoreOption = ({ data }: { data: Chore }) => {
  const store = useGlobal((state) => state.data);
  const tChecked = useGlobal((state) => state.toggleChecked);

  const [checked, setChecked] = useState(store.checked[data.id]);

  const img = new URL(`./assets/chores/${data.icon}`, import.meta.url);
  return (
    <li
      className={checked ? "checked" : ""}
      onClick={() => {
        tChecked(data.id);
        return setChecked((state: boolean) => !state);
      }}
      key={data.name}
    >
      <img src={img.href} />
      <span>{data.name}</span>
      <span className="time">{data.time}&thinsp;min</span>
    </li>
  );
};

export default Options;
