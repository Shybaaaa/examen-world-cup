export type Team = {
  id: number;
  name: string;
  code: string;
  confederation: string;
  fifaRanking: number;
};

export type Tier = {
  id: string;
  label: string;
  color: string;
};

export type Assignments = Record<number, string | null>;
