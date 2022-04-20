export type Action =
  | SetProfileAction
  | PressedAction
  | ReadyAction
  | ErrorAction
  | UserAction
  | ChangeColorAction
  | FinalQuestionAction;

export type SetProfileAction = {
  action: "setname";
  name: string;
};

export type PressedAction = {
  action: "pressed";
  id?: string;
};

export type ReadyAction = {
  action: "ready";
  ids?: string[];
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

export type FinalQuestionAction = {
  action: "final";
  id?: string;
  message: string; // two-way
};
