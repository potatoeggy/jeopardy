export type Action =
  | SetProfileAction
  | PressedAction
  | ReadyAction
  | ErrorAction
  | UserAction
  | ChangeColorAction;

export type SetProfileAction = {
  action: "setname";
  name: string;
};

export type PressedAction = {
  action: "pressed";
};

export type ReadyAction = {
  action: "ready";
};

export type ErrorAction = {
  action: "error";
  error: string;
};

export type UserAction = {
  action: "user";
  userIds: string[]; // ids
};

export type ChangeColorAction = {
  action: "color";
  number: number;
};
