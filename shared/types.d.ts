import { WebSocket } from "ws";

export type User = {
  id: string;
  name: string;
  socket: WebSocket;
  send: (event: Event) => void;
  error: (msg: string) => void;
  isHost?: boolean;
};

export type ImageResults = {
  label: string;
  confidence: number;
};

export type Event = {
  event: string;
};

export type ImageResult = {
  confidence: number;
  label: string;
};

export type UserEvent = Event & {
  event: "user_update";
  guild_id: string;
  users: { name: string; id: string }[];
};

export type NewRoundEvent = Event & {
  event: "new_round";
  total_rounds: number;
  word: string;
};

export type VictoryEvent = Event & {
  event: "victory";
  victor_user_id: string;
};

export type CanvasEvent = Event & {
  event: "draw";
  images: { user_id: string; content: string; confidence: number }[];
};

export type ErrorEvent = Event & {
  event: "error";
  error: string;
};

export type Action = {
  action: string;
  name?: string;
  image?: string;
};

export type SetProfileAction = {
  action: "set_profile";
  name: string;
};

export type UpdateImageAction = {
  action: "draw";
  image: string;
};

export type StartAction = {
  action: "begin";
};

export type ReadyAction = {
  action: "finished";
};
