export type BestPlayer = {
  name: string;
  points: number;
  assists: number;
  rebounds: number;
  blocks: number;
  photo: any;
};

export type Match = {
  id: string;
  date: string;
  stadium: "Sainte Claire" | "Ezmeri" | "Gym 75";
  score: string;
  opponent: {
    name: string;
    logo: string;
  };
  bestPlayer?: BestPlayer;
};

export const calendarData: Match[] = [
  {
    id: "1",
    date: "2026-01-25",
    stadium: "Sainte Claire",
    score: "0 - 0",
    opponent: {
      name: "Falcons",
      logo: "https://cdn-icons-png.flaticon.com/512/616/616554.png",
    },
  },
  {
    id: "2",
    date: "2026-01-27",
    stadium: "Ezmeri",
    score: "0 - 0",
    opponent: {
      name: "Raptors",
      logo: "https://cdn-icons-png.flaticon.com/512/616/616430.png",
    },
    bestPlayer: {
      name: "Jean Pierre",
      points: 22,
      assists: 6,
      rebounds: 8,
      blocks: 2,
      photo: require("../assets/images/2.jpg"),
    },
  },
  {
    id: "3",
    date: "2026-01-29",
    stadium: "Gym 75",
    score: "0 - 0",
    opponent: {
      name: "Wolves",
      logo: "https://cdn-icons-png.flaticon.com/512/616/616408.png",
    },
  },
  {
    id: "4",
    date: "2026-02-01",
    stadium: "Sainte Claire",
    score: "0 - 0",
    opponent: {
      name: "Bulls",
      logo: "https://cdn-icons-png.flaticon.com/512/616/616529.png",
    },
  },
  {
    id: "5",
    date: "2026-02-03",
    stadium: "Ezmeri",
    score: "0 - 0",
    opponent: {
      name: "Tigers",
      logo: "https://cdn-icons-png.flaticon.com/512/616/616528.png",
    },
  },
  {
    id: "6",
    date: "2026-02-05",
    stadium: "Gym 75",
    score: "0 - 0",
    opponent: {
      name: "Hawks",
      logo: "https://cdn-icons-png.flaticon.com/512/616/616554.png",
    },
  },
  {
    id: "7",
    date: "2026-02-08",
    stadium: "Sainte Claire",
    score: "0 - 0",
    opponent: {
      name: "Lions",
      logo: "https://cdn-icons-png.flaticon.com/512/616/616412.png",
    },
  },
  {
    id: "8",
    date: "2026-02-10",
    stadium: "Ezmeri",
    score: "0 - 0",
    opponent: {
      name: "Panthers",
      logo: "https://cdn-icons-png.flaticon.com/512/616/616451.png",
    },
  },
];
