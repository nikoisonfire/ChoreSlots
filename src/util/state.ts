import { create } from "zustand";
import { devtools } from "zustand/middleware";

type GlobalState = {
  toggleChecked: (item: string) => void;
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
  };
};

export const useGlobal = create<GlobalState>()(
  devtools((set) => ({
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
    },
    toggleChecked: (item: string) =>
      set((state: any) => {
        state.data.checked[item] = !state.data.checked[item];
        return state;
      }),
  }))
);

// Add Persistance
