import { number } from "zod";

export interface Video {
  id: number;
  title: string;
  url: string;
  video_id: string;
  channel_id: string;
  channel_name: string;
  thumb: string | null;
  description: string | null;
  category: string;
  created_at: Date;
  updated_at: Date;
}

export interface Timer {
  id: number;
  created_at: Date;
  created_dat: Date;
  userId: number;
}
