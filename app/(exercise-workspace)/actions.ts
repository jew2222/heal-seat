"use server";
import db from "lib/db";
import { Video } from "types/type";
const YOUTUBE_SEARCH_API_URL = "https://www.googleapis.com/youtube/v3/search";
const VIDEO_API_URL = "https://www.googleapis.com/youtube/v3/videos";

//type categoryType = "POSTURE" | "EYE" | "UPPER" | "LOWER";

export async function fetchAndSaveVideos(query: string, category: string) {
  const MAX_RESULT = 50;
  const excludedKeyword = "-누워서 -브릿지";
  const optionalPart = `|"앉아서 할 수 있는 운동"`;
  const modifiedQuery = `${query} ${excludedKeyword} ${optionalPart}`;
  const url = `${YOUTUBE_SEARCH_API_URL}?key=${process.env.NEXT_PUBLIC_YOUTUBE_API_KEY}&q=${encodeURIComponent(modifiedQuery)}&part=snippet&type=video&maxResults=${MAX_RESULT}&videoEmbeddable=true&safeSearch=strict`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (!data.items) {
      console.error("검색 결과 YouTube API response 가 없습니다");
      return [];
    }
    const videos = data.items
      //섬네일이 있는 데이터만
      /* .filter(
        (item: any) =>
          item.snippet.thumbnails && item.snippet.thumbnails.default
      )*/
      .map((item: any) => {
        return {
          title: item.snippet.title,
          url: `https://www.youtube.com/watch?v=${item.id.videoId}`,
          video_id: item.id.videoId,
          channel_id: item.snippet.channelId,
          channel_name: item.snippet.channelTitle,
          thumb: item.snippet.thumbnails.default.url,
          description: item.snippet.description,
          category,
        };
      });

    if (videos.length > 0) {
      await db.exercise.createMany({
        data: videos,
        skipDuplicates: true,
      });
    }

    await findVideos(category);
  } catch (error) {
    console.log(error);
    throw new Error("비디오 가져오기 실패");
  }
}

export async function findVideos(category: string) {
  try {
    const savedVideos = await db.exercise.findMany({
      where: {
        category,
        /*     AND: [
            { description: { contains: "앉아서", mode: "insensitive" } },
          { title: { contains: "앉아서", mode: "default" ,} },
        ],
        */
      },
      take: 20,
    });
    return savedVideos;
  } catch (error) {
    console.error("유튜브 가져오기 오류", error);
    throw new Error("비디오 패칭 싫패");
  }
}

export async function findVideo(id: string) {
  try {
    const savedVideo = await db.exercise.findUnique({
      where: {
        id: parseInt(id),
      },
    });
    console.log(savedVideo);
    return savedVideo;
  } catch (error) {
    console.error("유튜브 가져오기 오류", error);
    throw new Error("유튜브 가져오기 오류");
  }
}
