"use client";
import { Button } from "@mui/material";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAuthStore } from "~/utils/AuthStore";
import UserLayout from "~/components/layout/UserLayout"

import {getAvideo , getvideos} from "~/services/video";

import VideoItem from "./VideoItem";

import styles from './video.module.css'
import VideoList from "./VideoList";
import VideoPlayer from "./VideoPlayer";

export default function Video() {
    const route = useRouter();
    const { token } = useAuthStore();
    const logOut = () => {
      localStorage.removeItem("jwt");
      setUser(null);

      route.refresh();
    };

    const [videoPlayer, setVideoPlayer] = useState('');
    const [videoPlayList, setVideoPlayList] = useState([]);

    useEffect(() => {
      const fetchData = async () => {
        try {
          const res = await getvideos({ perpage: 1, page: 1 });
          if (res.data.length > 0) {
            
            setVideoPlayer(res.data[0]);
          }
        } catch (e) {
          console.error('Error fetching videos:', e);
        }
      };

      fetchData();
    }, []); 


    useEffect(() => {
      const videoElement = document.getElementById('src_Video');
    
      const playVideo = () => {
        if (document.getElementById('video') && typeof document.getElementById('video').play === 'function') {
          // Play the video
            document.getElementById('video').play()
            .then(() => {
              console.log('Video played successfully');
            })
            .catch(error => {
              console.error('Error playing video:', error);
            });
        } else {
          console.error('Video element or play method not available');
        }
      };
    
      if (videoPlayer && videoElement) {
        // Set the source of the video
        videoElement.src = videoPlayer;

        console.log(videoElement.readyState );

    
        // Check if the video is loaded and then play it
        if (document.getElementById('video')) {
          playVideo();
        } else {
          videoElement.addEventListener('loadeddata', playVideo);
        }
      }
    }, [videoPlayer]);
    
    useEffect(() => {
      const fetchData = async () => {
        try {
          const res = await getvideos({ perpage: 4, page: 1 });
          if (res.data.length > 0) {
            
            setVideoPlayList(res.data);
            
          }
        } catch (e) {
          console.error('Error fetching videos:', e);
        }
      };

      fetchData();
    },[])


    function pickVideo(video) {
      setVideoPlayer(video);
      console.log(video)
    }

    function formatTimeAgo(timestamp) {
      const currentTime = new Date();
      const targetTime = new Date(timestamp);
    
      const timeDifferenceInSeconds = Math.floor((currentTime - targetTime) / 1000);
    
      if (timeDifferenceInSeconds < 60) {
        return `${timeDifferenceInSeconds} giây trước`;
      } else if (timeDifferenceInSeconds < 3600) {
        const minutes = Math.floor(timeDifferenceInSeconds / 60);
        return `${minutes} phút trước`;
      } else if (timeDifferenceInSeconds < 86400) {
        const hours = Math.floor(timeDifferenceInSeconds / 3600);
        return `${hours} giờ trước`;
      } else if (timeDifferenceInSeconds < 604800) {
        const days = Math.floor(timeDifferenceInSeconds / 86400);
        return `${days} ngày trước`;
      } else if (timeDifferenceInSeconds < 2419200) {
        const weeks = Math.floor(timeDifferenceInSeconds / 604800);
        return `${weeks} tuần trước`;
      } else {
        const years = Math.floor(timeDifferenceInSeconds / 31536000);
        return `${years} năm trước`;
      }
    }

    


  if (token === null) {
    return (
      <main>
        <UserLayout>
          <div className={styles.video}>
            <div className = {styles.left}>
              {videoPlayer && (
                <VideoPlayer src={`http://localhost:3500/video/stream/${videoPlayer._id}`}/>
              )}
              <VideoList props = {videoPlayList} onClick = {pickVideo}/>
              
            </div>
            <div className = {styles.right}>
              <div className = {styles.video_info}>
                <h3 className = {styles.title}>{videoPlayer.title}</h3>
                <div className = {styles.parameter}>
                  <p>Thời lượng: 8 phút</p>
                  <p>Đã xem: 10 lượt</p>
                  <p>Đã đăng: {formatTimeAgo(videoPlayer.createdAt)}</p>
                  <p>Lượt thích: 10</p>
                </div>
                <h5 className = {styles.des_title}>Mô tả:</h5>
                <p className = {styles.description}>{videoPlayer.description}</p>
              </div>
              <div className = {styles.video_comments}>
                
              </div>
            </div>
          </div>
        </UserLayout>
      </main>
    );
  }
  return (
    <main>
      <Button className="text-sm" variant="contained" onClick={logOut}>
        Logout
      </Button>
    </main>
  );
}
