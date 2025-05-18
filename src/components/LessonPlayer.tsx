import React, { useEffect, useRef, useState } from 'react';
import { Lesson } from '../types/course';
import { useCourse } from '../contexts/CourseContext';

interface LessonPlayerProps {
  lesson: Lesson;
}

export const LessonPlayer: React.FC<LessonPlayerProps> = ({ lesson }) => {
  const { updateWatchTime, isLessonPurchased } = useCourse();
  const [isPlaying, setIsPlaying] = useState(false);
  const playerRef = useRef<YT.Player | null>(null);
  const watchTimeInterval = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Load YouTube IFrame API
    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);

    window.onYouTubeIframeAPIReady = () => {
      playerRef.current = new YT.Player('youtube-player', {
        videoId: lesson.videoId,
        playerVars: {
          controls: 1,
          modestbranding: 1,
          rel: 0,
          showinfo: 0,
        },
        events: {
          onStateChange: handlePlayerStateChange,
        },
      });
    };

    return () => {
      if (watchTimeInterval.current) {
        clearInterval(watchTimeInterval.current);
      }
    };
  }, [lesson.videoId]);

  const handlePlayerStateChange = (event: YT.OnStateChangeEvent) => {
    if (event.data === YT.PlayerState.PLAYING) {
      setIsPlaying(true);
      startTrackingWatchTime();
    } else if (event.data === YT.PlayerState.PAUSED || event.data === YT.PlayerState.ENDED) {
      setIsPlaying(false);
      if (watchTimeInterval.current) {
        clearInterval(watchTimeInterval.current);
      }
    }
  };

  const startTrackingWatchTime = () => {
    if (watchTimeInterval.current) {
      clearInterval(watchTimeInterval.current);
    }

    watchTimeInterval.current = setInterval(() => {
      if (playerRef.current) {
        const currentTime = playerRef.current.getCurrentTime();
        updateWatchTime(lesson.id, currentTime);
      }
    }, 1000);
  };

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
  };

  if (!lesson.isFree && !isLessonPurchased(lesson.id)) {
    return (
      <div className="relative w-full aspect-video bg-gray-900">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <h3 className="text-xl font-semibold text-white mb-4">Lesson Locked</h3>
            <button
              onClick={() => {
                // In a real app, this would trigger the payment flow
                console.log('Payment flow would start here');
              }}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Unlock for ₹49
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full aspect-video" onContextMenu={handleContextMenu}>
      <div id="youtube-player" className="w-full h-full" />
    </div>
  );
}; 