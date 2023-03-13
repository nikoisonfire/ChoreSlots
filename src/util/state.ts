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
    lastRoll?: Chore[];
  };
  toggleChecked: (item: string) => void;
  reset: () => void;
  setLast: (choices: Chore[]) => void;
};

const defaultState: Partial<GlobalState> = {
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
    lastRoll: [],
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
