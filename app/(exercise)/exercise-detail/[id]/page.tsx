"use client";

import Nav from "components/nav";
import Image from "next/image";
import { useEffect, useState } from "react";
import { fetchAndSaveVideos, findVideos } from "../../actions";
import Link from "next/link";
import { getCategoryKor } from "lib/utils";
import { group } from "console";
import { Video } from "types/type";

export default function ExerciseDetail({
  params,
}: {
  params: { group: string };
}) {
  const group = params.group.toUpperCase();
  console.log(params.group);
  const [videos, setVideos] = useState<Video[]>([]);
  //   const videos = [
  //     {
  //       id: 1,
  //       title: "샘플",
  //       url: "/",
  //       video_id: "JUzPQ0JalHE",
  //       channel_id: "3TNm2tLw88A?si=vrfnDGY8zrhn4ARt",
  //       channel_name: "샘플 채널",
  //       thumb: "/image/main.png",
  //       description: "설명",
  //       category: "POSTURE",
  //     },
  //   ];

  const handleFetchVideos = async () => {
    console.log(process.env.NEXT_PUBLIC_YOUTUBE_API_KEY);

    try {
      const result = await fetchAndSaveVideos(
        `앉아서 ${getCategoryKor(group)} 운동`,
        group
      );
      setVideos(result);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const getVideos = async () => {
    console.log(process.env.NEXT_PUBLIC_YOUTUBE_API_KEY);

    try {
      const result = await findVideos("앉아서 할 수 있는", group);
      setVideos(result);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    getVideos();
  }, []);

  return (
    <div className="flex flex-col items-center  min-h-screen py-16  *:items-center max-w-screen-2xl w-full">
      <Nav />
      <div className="w-full">
        {/*   */}

        <div className="w-full text-2xl font-bold bg-primary py-6 px-8">
          {" "}
          {getCategoryKor(params.group)}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-1">
          {videos.map((video) => (
            <div key={video.id} className="p-4 border rounded-lg">
              <Link
                href={"/"}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500"
              >
                <img
                  src={`https://img.youtube.com/vi/${video.video_id}/maxresdefault.jpg`}
                  alt={video.title}
                  className="w-full"
                  onError={(e) => {
                    // 이미지가 로드되지 않을 때 다른 해상도의 썸네일로 대체합니다.
                    const currentThumb = (e.target as HTMLImageElement).src;
                    const nextThumb = video.thumb;
                    if (nextThumb) {
                      (e.target as HTMLImageElement).src = nextThumb;
                    }
                    // console.log("이미지 없음 ");
                  }}
                />

                {
                  <iframe
                    color="white"
                    width="560"
                    height="315"
                    src={`https://www.youtube.com/embed/${video.video_id}`}
                    title="YouTube video player"
                    allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  ></iframe>
                }
              </Link>
              <div className="*:my-5">
                <h2 className="text-xl font-semibold line-clamp-2">
                  {video.title}
                </h2>
                <p className="line-clamp-2">{video.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={handleFetchVideos}
        className="px-4 py-2 bg-muted text-white rounded hover:bg-blue-700"
      >
        유튜브 운동영상을 불러와 DB에 저장
      </button>
    </div>
  );
}
