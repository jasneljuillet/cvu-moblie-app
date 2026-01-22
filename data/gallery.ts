import { randomHeight } from "@/utils/randomHeight";

randomHeight;

export type MediaItem = {
  id: string;
  type: "image" | "video";
  source: any;
  height: number;
};

export const galleryData: MediaItem[] = [
  {
    id: "1",
    type: "image",
    source: require("../assets/images/1.jpg"),
    height: randomHeight(),
  },
  {
    id: "2",
    type: "image",
    source: require("../assets/images/2.jpg"),
    height: randomHeight(),
  },
  {
    id: "3",
    type: "video",
    source: require("../assets/videos/3.mp4"),
    height: randomHeight(),
  },
  {
    id: "10",
    type: "video",
    source: require("../assets/videos/2.mp4"),
    height: randomHeight(),
  },
  {
    id: "4",
    type: "image",
    source: require("../assets/images/6.jpg"),
    height: randomHeight(),
  },
  {
    id: "5",
    type: "image",
    source: require("../assets/images/4.jpg"),
    height: randomHeight(),
  },

  {
    id: "8",
    type: "video",
    source: require("../assets/videos/1.mp4"),
    height: randomHeight(),
  },
  {
    id: "6",
    type: "image",
    source: require("../assets/images/5.jpg"),
    height: randomHeight(),
  },
  {
    id: "7",
    type: "video",
    source: require("../assets/videos/4.mp4"),
    height: randomHeight(),
  },
];
export const shuffleGallery = () =>
  [...galleryData].sort(() => Math.random() - 0.5);
