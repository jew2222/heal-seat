"use client";

import Nav from "components/Nav";
import Image from "next/image";
import { useEffect, useState } from "react";
import { fetchAndSaveVideos, findVideo, findVideos } from "../../actions";
import Link from "next/link";
import { getCategoryKor } from "lib/utils";
import { Video } from "types/type";

export default function ExerciseDetail({ params }: { params: { id: string } }) {
  const [video, setVideo] = useState<Video>();

  const getVideo = async () => {
    try {
      const result = await findVideo(params.id);
      result && setVideo(result);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  function decodeHtmlEntities(text: string) {
    const textarea = document.createElement("textarea");
    textarea.innerHTML = text;
    return textarea.value;
  }

  useEffect(() => {
    getVideo();
  }, []);

  return (
    <div className="screen w-full">
      <div className="w-full ">
        <div className="header-line min-h-20">
          {" "}
          {video && decodeHtmlEntities(video.title)}
        </div>
        {video && (
          <div className=" flex justify-center">
            {
              <div className="p-6 border rounded-lg">
                <div className="*:my-5 max-w-[64.5rem]">
                  <iframe
                    color="white"
                    className="w-[64.5rem] h-[36rem] "
                    src={`https://www.youtube.com/embed/${video.video_id}?autoplay=1`}
                    title="YouTube video player"
                    allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; autoplay"
                    allowFullScreen
                  ></iframe>
                  <h1 className="line-clamp-2 font-bold text-3xl py-4">
                    {video.channel_name}
                  </h1>
                  <h2 className=" text-2xl">{video.description}</h2>
                </div>
              </div>
            }
          </div>
        )}
      </div>
    </div>
  );
}
