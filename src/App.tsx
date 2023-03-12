import { useState } from "react";
import reactLogo from "./assets/react.svg";
import Slots from "./Slots";

import slot from "./assets/slot.svg";

function App() {
  const [count, setCount] = useState(0);
  const date = new Date().getFullYear();

  return (
    <div className="App">
      <header>
        <div className="logo">
          <img src={slot} />
          <h1>Chore Slots</h1>
        </div>
        <h2>
          Generate a weekly plan to do your household chores one at a time{" "}
          <br />- instead of feeling exhausted by doing them all in one day.
        </h2>
        <h3>
          Zen habit: 15 minutes per day instead of 3 hours on your weekend free
          time
        </h3>
      </header>
      <section className="slots">
        <Slots />
      </section>
      <footer>&copy; {date} - powered by ❤️ using react, vite, AWS</footer>
    </div>
  );
}

export default App;
