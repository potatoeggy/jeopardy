export type * from "./actions";

export type NameColor = "red" | "blue" | "yellow" | "green";

export type SerialisedUser = {
  id: string;
  name: string;
  points: number;
};

export type HostUser = SerialisedUser & {
  color: NameColor;
};
