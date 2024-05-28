"use client";

import Nav from "components/nav";
import Image from "next/image";
import { useEffect, useState } from "react";
import { fetchAndSaveVideos, findVideos } from "../../actions";
import Link from "next/link";
import { getCategoryKor } from "lib/utils";
import { Video } from "types/type";
import { Gruppo } from "next/font/google";

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

export default function Main({ params }: { params: { group: string } }) {
  const group = params.group.toUpperCase();
  const [videos, setVideos] = useState<Video[]>([]);

  console.log("페이지에서 " + getCategoryKor(group));

  const handlePostVideos = async () => {
    try {
      const result = await fetchAndSaveVideos(
        `${getCategoryKor(group)} 운동`,
        group
      );
      result && setVideos(result);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const getVideos = async () => {
    try {
      const result = await findVideos(group);
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
                href={`/exercise-detail/${video.id}`}
                target="_self"
                rel="noopener noreferrer"
                className="text-blue-500"
              >
                <Image
                  src={`https://i.ytimg.com/vi/${video.video_id}/hqdefault.jpg`} //hqdefault, mq
                  alt={video.title}
                  width={1280}
                  height={720}
                  className="w-full"
                />
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
        onClick={handlePostVideos}
        className="px-4 py-2 bg-muted text-white rounded hover:bg-blue-700"
      >
        유튜브 운동영상을 불러와 DB에 저장
      </button>
    </div>
  );
}
