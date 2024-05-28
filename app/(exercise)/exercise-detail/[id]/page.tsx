"use client";

import Nav from "components/nav";
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
    <div className="flex flex-col items-center  min-h-screen py-16  *:items-center max-w-screen-2xl w-full">
      <Nav />
      <div className="w-full">
        {/*   */}

        <div className="w-full text-2xl font-bold bg-primary py-6 px-8">
          {" "}
          {video && decodeHtmlEntities(video.title)}
        </div>
        {video && (
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-1">
            {
              <div className="p-4 border rounded-lg">
                <div className="*:my-5">
                  <iframe
                    color="white"
                    width="560"
                    height="315"
                    src={`https://www.youtube.com/embed/${video.video_id}`}
                    title="YouTube video player"
                    allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  ></iframe>
                  <p className="line-clamp-2">{video.channel_name}</p>

                  <p className="line-clamp-2">{video.description}</p>
                </div>
              </div>
            }
          </div>
        )}
      </div>
    </div>
  );
}
