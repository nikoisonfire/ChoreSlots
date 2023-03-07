import { Chore } from "./Chore";

const Slot = ({ day, data }: { day: string; data: Chore }) => {
  const img = new URL(`./assets/chores/${data.icon}`, import.meta.url);
  return (
    <div className="slot">
      <div className="chore">
        <ul>
          <li>
            <img src={img.href} />
            <span>{data.name}</span>
          </li>
        </ul>
      </div>
      <span className="day">{day}</span>
    </div>
  );
};

export default Slot;
