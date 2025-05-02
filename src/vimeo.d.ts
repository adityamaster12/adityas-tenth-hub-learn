
declare namespace Vimeo {
  interface PlayerOptions {
    id?: string | number;
    url?: string;
    autopause?: boolean;
    autoplay?: boolean;
    background?: boolean;
    byline?: boolean;
    color?: string;
    controls?: boolean;
    dnt?: boolean;
    height?: number;
    loop?: boolean;
    maxheight?: number;
    maxwidth?: number;
    muted?: boolean;
    playsinline?: boolean;
    portrait?: boolean;
    responsive?: boolean;
    speed?: boolean;
    quality?: string;
    texttrack?: string;
    title?: boolean;
    transparent?: boolean;
    width?: number;
  }

  interface PlayerEventData {
    duration: number;
    percent: number;
    seconds: number;
  }

  interface Player {
    play(): Promise<void>;
    pause(): Promise<void>;
    unload(): Promise<void>;
    destroy(): Promise<void>;
    
    getVolume(): Promise<number>;
    setVolume(volume: number): Promise<number>;
    
    getDuration(): Promise<number>;
    getCurrentTime(): Promise<number>;
    setCurrentTime(time: number): Promise<number>;
    
    getPaused(): Promise<boolean>;
    getPlayed(): Promise<object>;
    
    on(event: string, callback: (data: any) => void): void;
    off(event: string, callback?: (data: any) => void): void;
  }
}

interface Window {
  Vimeo: {
    Player: {
      new (element: HTMLElement | string, options: Vimeo.PlayerOptions): Vimeo.Player;
    };
  };
}
