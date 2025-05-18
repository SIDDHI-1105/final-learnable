declare namespace YT {
  interface PlayerOptions {
    videoId?: string;
    playerVars?: {
      controls?: number;
      modestbranding?: number;
      rel?: number;
      showinfo?: number;
    };
    events?: {
      onStateChange?: (event: OnStateChangeEvent) => void;
    };
  }

  interface OnStateChangeEvent {
    data: number;
  }

  class Player {
    constructor(elementId: string, options: PlayerOptions);
    getCurrentTime(): number;
  }

  const PlayerState: {
    PLAYING: number;
    PAUSED: number;
    ENDED: number;
  };
}

interface Window {
  onYouTubeIframeAPIReady: () => void;
} 