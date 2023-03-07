export type Chore = {
  id: string;
  name: string;
  time: number;
  icon: string;
  type: "Kitchen" | "Misc" | "Bathroom" | "Laundry";
};
