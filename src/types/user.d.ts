export type PostInput = {
  name: string;
  last_name: string;
  carnet: string;
  password: string;
  role: "librarian" | "student";
};

export type PostLoginInput = {
  carnet: string;
  password: string;
};
