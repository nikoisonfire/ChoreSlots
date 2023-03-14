import { create } from "zustand";
import { devtools, persist, createJSONStorage } from "zustand/middleware";
import { Chore } from "../Chore";

export type GlobalState = {
  data: {
    checked: {
      floors: boolean;
      dust: boolean;
      windows: boolean;
      tidyup: boolean;
      plants: boolean;
      mowlawn: boolean;
      laundry: boolean;
      iron: boolean;
      bedding: boolean;
      curtains: boolean;
      countertops: boolean;
      fridge: boolean;
      microwave: boolean;
      mealprep: boolean;
      tossfood: boolean;
      kitchensink: boolean;
      sink: boolean;
      toilet: boolean;
      shower: boolean;
      towels: boolean;
    };
    lastRoll: Chore[];
  };
  toggleChecked: (item: string) => void;
  reset: () => void;
  setLast: (choices: Chore[]) => void;
};

export const defaultState: Partial<GlobalState> = {
  data: {
    checked: {
      floors: true,
      dust: true,
      windows: false,
      tidyup: false,
      plants: false,
      mowlawn: false,
      laundry: true,
      iron: false,
      bedding: false,
      curtains: false,
      countertops: false,
      fridge: false,
      microwave: false,
      mealprep: false,
      tossfood: false,
      kitchensink: true,
      sink: true,
      toilet: true,
      shower: true,
      towels: false,
    },
    lastRoll: [
      {
        id: "floors",
        name: "Floors (Vacuum/ mop)",
        type: "Misc",
        prefix: "Clean",
        time: 30,
        icon: "vacuum.png",
      },
      {
        id: "laundry",
        name: "Laundry",
        type: "Laundry",
        time: 10,
        icon: "laundry.png",
        prefix: "Do",
      },
      {
        id: "toilet",
        name: "Toilet",
        type: "Bathroom",
        prefix: "Clean",
        time: 7,
        icon: "toilet.png",
      },
      {
        id: "shower",
        name: "Shower/Tub",
        type: "Bathroom",
        time: 7,
        prefix: "Clean",
        icon: "tub.png",
      },
      {
        id: "kitchensink",
        name: "Kitchen sink",
        prefix: "Clean",
        type: "Kitchen",
        time: 10,
        icon: "kitchen-sink.png",
      },
      {
        id: "sink",
        name: "Sink/Faucet",
        type: "Bathroom",
        prefix: "Clean",
        time: 5,
        icon: "sink.png",
      },
      {
        id: "dust",
        name: "Dust furniture",
        type: "Misc",
        prefix: "Clean",
        time: 10,
        icon: "dusting.png",
      },
    ],
  },
};

export const useGlobal = create<Partial<GlobalState>>()(
  devtools(
    persist(
      (set) => ({
        ...defaultState,
        toggleChecked: (item: string) =>
          set((state: any) => {
            state.data.checked[item] = !state.data.checked[item];
            return state;
          }),
        reset: () => set(() => ({ ...defaultState })),
        setLast: (choices: Chore[]) =>
          set((state: GlobalState) => ({
            data: {
              ...state.data,
              lastRoll: choices,
            },
          })),
      }),
      {
        name: "chore-storage",
        storage: createJSONStorage(() => localStorage),
      }
    )
  )
);

// Add Persistance
