import { Chore } from "./Chore.js";
//@ts-ignore
import { ics } from "./util/ics.js";
import { daysOfTheWeek } from "./util/util.js";

import gcal from "./assets/gcal.png";
import outlook from "./assets/outlook.png";
import ical from "./assets/ical.png";

const AddToCalendar = (props: { chores: Array<Chore> }) => {
  const chores = props.chores;
  const getUpcomingWeekdays = (): string[] => {
    let buffer: string[] = [];
    daysOfTheWeek.forEach((value, index) => {
      let d = new Date();
      // Monday => index: 0 + 1, ...
      d.setDate(d.getDate() + ((index + 1 + 7 - d.getDay()) % 7 || 7));
      buffer.push(d.toLocaleDateString("en-EN"));
    });
    // return format '3/19/2023'
    return buffer;
  };

  const generateCalendarEvents = () => {
    const cal = ics();
    const upcoming = getUpcomingWeekdays();
    console.log(upcoming);
    if (chores.length > 0) {
      chores.forEach((value, index) => {
        cal.addEvent(
          `[${value.time} min] ${value.name}`,
          `Spend ${value.time} mintues doing/cleaning ${value.name}`,
          "",
          upcoming[index],
          upcoming[index],
          {
            freq: "WEEKLY",
          }
        );
      });
    }
  };

  return (
    <div className="calButtonDiv">
      <button
        type="button"
        onClick={generateCalendarEvents}
        className="calendarButton"
      >
        <img src={gcal} />
        <img src={outlook} />
        <img src={ical} />
        Download Calendar (Google, Outlook, iCal)
      </button>
    </div>
  );
};

export default AddToCalendar;
