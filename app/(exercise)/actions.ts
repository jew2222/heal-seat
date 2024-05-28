"use server";
import db from "lib/db";
const YOUTUBE_SEARCH_API_URL = "https://www.googleapis.com/youtube/v3/search";
const VIDEO_API_URL = "https://www.googleapis.com/youtube/v3/videos";

//type categoryType = "POSTURE" | "EYE" | "UPPER" | "LOWER";

export async function fetchAndSaveVideos(query: string, category: string) {
  const MAX_RESULT = 50;
  const queryWithAdditionalKeywords = `${query} "앉아서 할 수 있는 운동"`;
  const url = `${YOUTUBE_SEARCH_API_URL}?key=${process.env.NEXT_PUBLIC_YOUTUBE_API_KEY}&q=${encodeURIComponent(queryWithAdditionalKeywords)}&part=snippet&type=video&maxResults=${MAX_RESULT}&videoEmbeddable=true&safeSearch=strict`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (!data.items) {
      console.error("No items found in the YouTube API response.");
      return [];
    }

    const videos = data.items
      /* 섬네일이 있는 데이터만
      .filter(
        (item: any) =>
          item.snippet.thumbnails && item.snippet.thumbnails.default
      )
      */
      .map((item: any) => {
        return {
          title: item.snippet.title,
          url: `https://www.youtube.com/watch?v=${item.id.videoId}`,
          video_id: item.id.videoId,
          channel_id: item.snippet.channelId,
          channel_name: item.snippet.channelTitle,
          thumb: `https://img.youtube.com/vi/${item.video_id}/maxresdefault.jpg`, //item.snippet.thumbnails.default.url
          description: item.snippet.description,
          category,
        };
      });

    if (videos.length > 0) {
      await db.exercise.createMany({
        data: videos,
        skipDuplicates: true,
      });

      const savedVideos = await db.exercise.findMany({
        where: {
          category,
        },
      });

      return savedVideos;
    } else {
      alert("유효한 유트브 영상이 없습니다.");
      return [];
    }
  } catch (error) {
    alert("유튜브 가져오기 오류" + error);
    throw new Error("Failed to fetch videos");
  }
}

export async function findVideos(query: string, category: string) {
  try {
    const savedVideos = await db.exercise.findMany({
      where: {
        category,
        AND: [
          /*  { description: { contains: "앉아서", mode: "insensitive" } },
          { title: { contains: "앉아서", mode: "default" ,} },*/
        ],
      },
      take: 20,
    });

    console.log(savedVideos);

    return savedVideos;
  } catch (error) {
    console.error("유튜브 가져오기 오류", error);
    throw new Error("Failed to fetch videos");
  }
}
