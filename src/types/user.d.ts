export type PostInput = {
  name: string;
  last_name: string;
  carnet: string;
  password: string;
};

export type PostLoginInput = {
  carnet: string;
  password: string;
};
