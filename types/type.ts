import { number } from "zod";

export interface Video {
  id: number;
  title: string;
  url: string;
  video_id: string;
  channel_id: string;
  channel_name: string;
  thumb?: string;
  description: string | null;
  category: string;
}

export interface Timer {
  id: number;
  created_at: Date;
  created_dat: Date;
  userId: number;
}
