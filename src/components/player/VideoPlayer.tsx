import React, { useState, useEffect, useRef } from 'react';
import { 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  Maximize,
  SkipBack,
  SkipForward,
  Settings,
  RotateCw
} from 'lucide-react';
import { Slider } from '@/components/ui/slider';
import { cn } from '@/lib/utils';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface VideoPlayerProps {
  videoUrl: string;
  title: string;
  poster?: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ videoUrl, title, poster }) => {
  const videoRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(70);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isControlsVisible, setIsControlsVisible] = useState(true);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [videoQuality, setVideoQuality] = useState("auto");
  const [isRotated, setIsRotated] = useState(false);
  const controlsTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [vimeoPlayer, setVimeoPlayer] = useState<Vimeo.Player | null>(null);

  // Define available qualities and playback speeds
  const availableQualities = ["auto", "4K", "1080p", "720p", "540p", "360p"];
  const availableSpeeds = [0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2];

  // Load Vimeo Player API
  useEffect(() => {
    // Create a script element
    const script = document.createElement('script');
    script.src = 'https://player.vimeo.com/api/player.js';
    script.async = true;
    
    // Append the script to the document
    document.body.appendChild(script);
    
    // Clean up
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  // Initialize Vimeo player
  useEffect(() => {
    if (videoRef.current && window.Vimeo) {
      try {
        // Extract Vimeo video ID from URL
        const vimeoId = extractVimeoId(videoUrl);
        
        if (vimeoId) {
          const player = new window.Vimeo.Player(videoRef.current, {
            id: vimeoId,
            responsive: true,
            autoplay: false,
            title: false,
            byline: false,
            portrait: false,
            controls: false, // We'll use our custom controls
            speed: true
          });

          // Set up event listeners
          player.on('play', () => setIsPlaying(true));
          player.on('pause', () => setIsPlaying(false));
          player.on('timeupdate', (data: Vimeo.PlayerEventData) => setCurrentTime(data.seconds));
          player.on('loadedmetadata', () => {
            player.getDuration().then((duration: number) => {
              setDuration(duration);
            });
          });
          player.on('loaded', () => {
            player.getDuration().then((duration: number) => {
              setDuration(duration);
            });
          });

          setVimeoPlayer(player);
        }
      } catch (error) {
        console.error('Error initializing Vimeo player:', error);
      }
    }
  }, [videoUrl]);

  // Extract Vimeo ID from URL
  const extractVimeoId = (url: string): string | null => {
    const regex = /vimeo\.com\/([0-9]+)/;
    const match = url.match(regex);
    return match ? match[1] : null;
  };

  // Hide controls after inactivity
  useEffect(() => {
    if (isPlaying) {
      const showControls = () => {
        setIsControlsVisible(true);
        
        if (controlsTimeoutRef.current) {
          clearTimeout(controlsTimeoutRef.current);
        }
        
        controlsTimeoutRef.current = setTimeout(() => {
          setIsControlsVisible(false);
        }, 3000);
      };
      
      const container = containerRef.current;
      if (container) {
        container.addEventListener('mousemove', showControls);
        container.addEventListener('mouseenter', showControls);
        container.addEventListener('mouseleave', () => setIsControlsVisible(false));
        
        return () => {
          container.removeEventListener('mousemove', showControls);
          container.removeEventListener('mouseenter', showControls);
          container.removeEventListener('mouseleave', () => setIsControlsVisible(false));
          
          if (controlsTimeoutRef.current) {
            clearTimeout(controlsTimeoutRef.current);
          }
        };
      }
    }
  }, [isPlaying]);

  const togglePlay = () => {
    if (vimeoPlayer) {
      if (isPlaying) {
        vimeoPlayer.pause();
      } else {
        vimeoPlayer.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleVolumeChange = (value: number[]) => {
    setVolume(value[0]);
    setIsMuted(value[0] === 0);
    if (vimeoPlayer) {
      vimeoPlayer.setVolume(value[0] / 100);
    }
  };

  const toggleMute = () => {
    if (vimeoPlayer) {
      if (isMuted) {
        vimeoPlayer.setVolume(volume / 100);
        setIsMuted(false);
      } else {
        vimeoPlayer.setVolume(0);
        setIsMuted(true);
      }
    }
  };

  const toggleFullscreen = () => {
    if (!isFullscreen) {
      if (containerRef.current?.requestFullscreen) {
        containerRef.current.requestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
    setIsFullscreen(!isFullscreen);
  };

  const seek = (value: number[]) => {
    const newTime = value[0];
    setCurrentTime(newTime);
    if (vimeoPlayer) {
      vimeoPlayer.setCurrentTime(newTime);
    }
  };

  const jumpBack = () => {
    if (vimeoPlayer) {
      const newTime = Math.max(0, currentTime - 10);
      vimeoPlayer.setCurrentTime(newTime);
      setCurrentTime(newTime);
    }
  };

  const jumpForward = () => {
    if (vimeoPlayer) {
      const newTime = Math.min(duration, currentTime + 10);
      vimeoPlayer.setCurrentTime(newTime);
      setCurrentTime(newTime);
    }
  };

  const formatTime = (timeInSeconds: number): string => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  // Handle fullscreen change events from browser
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);

  // Set the playback speed
  const changePlaybackSpeed = (speed: number) => {
    if (vimeoPlayer) {
      vimeoPlayer.setPlaybackRate(speed);
      setPlaybackSpeed(speed);
    }
  };

  // Set video quality
  const changeVideoQuality = (quality: string) => {
    // Note: Vimeo API doesn't directly allow setting quality via the JS API,
    // but we're preparing the UI for this feature
    setVideoQuality(quality);
    console.log(`Quality set to ${quality}`);
  };

  // Toggle screen rotation
  const toggleRotation = () => {
    setIsRotated(!isRotated);
  };

  return (
    <div 
      ref={containerRef} 
      className={cn(
        "relative group w-full rounded-lg overflow-hidden bg-black",
        isFullscreen ? "fixed inset-0 z-50" : "aspect-video",
        isRotated ? "transform rotate-90 md:rotate-0 md:aspect-[9/16] md:mx-auto" : ""
      )}
    >
      {/* Video container with ref but no src - Vimeo API will initialize it */}
      <div className="vimeo-container w-full h-full">
        <div ref={videoRef} className="absolute top-0 left-0 w-full h-full"></div>
      </div>
      
      {/* Controls overlay */}
      <div 
        className={cn(
          "absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 transition-opacity duration-300",
          isControlsVisible || !isPlaying ? "opacity-100" : "opacity-0"
        )}
      >
        {/* Progress bar */}
        <div className="w-full mb-2">
          <Slider 
            value={[currentTime]} 
            min={0} 
            max={duration} 
            step={1}
            onValueChange={seek}
            className="h-1.5"
          />
        </div>
        
        {/* Control buttons */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            {/* Play/Pause */}
            <button 
              onClick={togglePlay} 
              className="rounded-full bg-white/20 p-2 hover:bg-white/30 transition"
            >
              {isPlaying ? (
                <Pause className="h-5 w-5 text-white" />
              ) : (
                <Play className="h-5 w-5 text-white" />
              )}
            </button>
            
            {/* Jump back */}
            <button 
              onClick={jumpBack}
              className="rounded-full bg-white/20 p-2 hover:bg-white/30 transition"
            >
              <SkipBack className="h-4 w-4 text-white" />
            </button>
            
            {/* Jump forward */}
            <button 
              onClick={jumpForward}
              className="rounded-full bg-white/20 p-2 hover:bg-white/30 transition"
            >
              <SkipForward className="h-4 w-4 text-white" />
            </button>
            
            {/* Time display */}
            <div className="text-xs text-white">
              {formatTime(currentTime)} / {formatTime(duration)}
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            {/* Rotate screen button */}
            <button 
              onClick={toggleRotation}
              className="rounded-full bg-white/20 p-2 hover:bg-white/30 transition"
            >
              <RotateCw className="h-4 w-4 text-white" />
            </button>
            
            {/* Playback speed selector */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="rounded-full bg-white/20 p-2 hover:bg-white/30 transition">
                  <span className="text-xs font-medium text-white">{playbackSpeed}x</span>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-28">
                {availableSpeeds.map((speed) => (
                  <DropdownMenuItem 
                    key={speed}
                    onClick={() => changePlaybackSpeed(speed)}
                    className={cn(
                      "justify-center",
                      playbackSpeed === speed && "bg-accent font-medium"
                    )}
                  >
                    {speed}x
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            
            {/* Quality selector */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="rounded-full bg-white/20 p-2 hover:bg-white/30 transition">
                  <Settings className="h-4 w-4 text-white" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-28">
                {availableQualities.map((quality) => (
                  <DropdownMenuItem 
                    key={quality}
                    onClick={() => changeVideoQuality(quality)}
                    className={cn(
                      "justify-center",
                      videoQuality === quality && "bg-accent font-medium"
                    )}
                  >
                    {quality}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            
            {/* Volume control */}
            <div className="hidden sm:flex items-center space-x-2">
              <button 
                onClick={toggleMute} 
                className="rounded-full bg-white/20 p-2 hover:bg-white/30 transition"
              >
                {isMuted ? (
                  <VolumeX className="h-4 w-4 text-white" />
                ) : (
                  <Volume2 className="h-4 w-4 text-white" />
                )}
              </button>
              <Slider 
                value={[volume]} 
                min={0} 
                max={100} 
                step={1}
                onValueChange={handleVolumeChange}
                className="w-20 h-1.5"
              />
            </div>
            
            {/* Fullscreen toggle */}
            <button 
              onClick={toggleFullscreen}
              className="rounded-full bg-white/20 p-2 hover:bg-white/30 transition"
            >
              <Maximize className="h-4 w-4 text-white" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;
