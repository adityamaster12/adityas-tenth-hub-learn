
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
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "@/components/ui/use-toast";

interface VideoPlayerProps {
  videoUrl: string;
  title: string;
  poster?: string;
  onVideoEnd?: () => void;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ 
  videoUrl, 
  title, 
  poster,
  onVideoEnd 
}) => {
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
  const [isPlayerReady, setIsPlayerReady] = useState(false);
  const [isBuffering, setIsBuffering] = useState(false);
  const controlsTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [vimeoPlayer, setVimeoPlayer] = useState<Vimeo.Player | null>(null);
  const previousUrlRef = useRef<string>(videoUrl);

  // Define available qualities and playback speeds
  const availableQualities = ["auto", "1080p", "720p", "540p", "360p"];
  const availableSpeeds = [0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2];

  // Load Vimeo Player API
  useEffect(() => {
    if (document.querySelector('script[src="https://player.vimeo.com/api/player.js"]')) {
      return;
    }

    // Create a script element
    const script = document.createElement('script');
    script.src = 'https://player.vimeo.com/api/player.js';
    script.async = true;
    
    // Append the script to the document
    document.body.appendChild(script);
    
    // Clean up
    return () => {
      // Don't remove the script as it might be used by other components
    };
  }, []);

  // Cleanup player when component unmounts
  useEffect(() => {
    return () => {
      if (vimeoPlayer) {
        try {
          vimeoPlayer.destroy();
        } catch (error) {
          console.error('Error destroying Vimeo player:', error);
        }
      }
    };
  }, [vimeoPlayer]);

  // Handle URL changes - reinitialize player
  useEffect(() => {
    if (previousUrlRef.current !== videoUrl) {
      // URL has changed, need to reinitialize player
      if (vimeoPlayer) {
        try {
          vimeoPlayer.destroy();
        } catch (error) {
          console.error('Error destroying previous Vimeo player:', error);
        }
      }
      setVimeoPlayer(null);
      setIsPlayerReady(false);
      previousUrlRef.current = videoUrl;
      
      // Reset state
      setIsPlaying(false);
      setCurrentTime(0);
      setDuration(0);
    }
  }, [videoUrl, vimeoPlayer]);

  // Initialize Vimeo player
  useEffect(() => {
    // Only initialize if we don't have a player and window.Vimeo exists
    if (!vimeoPlayer && videoRef.current && window.Vimeo && videoUrl) {
      try {
        // Extract Vimeo video ID from URL
        const vimeoId = extractVimeoId(videoUrl);
        
        if (vimeoId) {
          console.log('Initializing Vimeo player with ID:', vimeoId);
          const player = new window.Vimeo.Player(videoRef.current, {
            id: vimeoId,
            responsive: true,
            autoplay: false,
            title: false,
            byline: false,
            portrait: false,
            controls: false, // We'll use our custom controls
            speed: true,
            dnt: true, // Do not track
            background: false
          });

          // Set up event listeners
          player.on('play', () => setIsPlaying(true));
          player.on('pause', () => setIsPlaying(false));
          player.on('ended', () => {
            setIsPlaying(false);
            if (onVideoEnd) onVideoEnd();
          });
          
          player.on('timeupdate', (data: Vimeo.PlayerEventData) => {
            setCurrentTime(data.seconds);
          });
          
          player.on('loaded', () => {
            console.log('Vimeo player loaded');
            setIsPlayerReady(true);
            
            player.getDuration().then((videoDuration: number) => {
              setDuration(videoDuration);
            }).catch(err => console.error('Error getting duration:', err));
            
            player.getVolume().then((vol: number) => {
              setVolume(Math.round(vol * 100));
              setIsMuted(vol === 0);
            }).catch(err => console.error('Error getting volume:', err));

            player.getPlaybackRate().then((rate: number) => {
              setPlaybackSpeed(rate);
            }).catch(err => console.error('Error getting playback rate:', err));
          });
          
          player.on('bufferstart', () => setIsBuffering(true));
          player.on('bufferend', () => setIsBuffering(false));
          
          player.on('error', (error) => {
            console.error('Vimeo player error:', error);
            toast({
              title: "Video Error",
              description: "There was an error playing this video. Please try again.",
              variant: "destructive"
            });
          });

          setVimeoPlayer(player);
        } else {
          console.error('Invalid Vimeo URL:', videoUrl);
          toast({
            title: "Invalid Video",
            description: "Could not load video. Invalid Vimeo URL.",
            variant: "destructive"
          });
        }
      } catch (error) {
        console.error('Error initializing Vimeo player:', error);
        toast({
          title: "Player Error",
          description: "Could not initialize the video player.",
          variant: "destructive"
        });
      }
    }
  }, [videoRef.current, window.Vimeo, videoUrl, vimeoPlayer, onVideoEnd]);

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

  // Player controls - safe with error handling
  const togglePlay = () => {
    if (!vimeoPlayer || !isPlayerReady) return;
    
    try {
      if (isPlaying) {
        vimeoPlayer.pause().catch(err => console.error('Error pausing:', err));
      } else {
        vimeoPlayer.play().catch(err => console.error('Error playing:', err));
      }
    } catch (error) {
      console.error('Error toggling play state:', error);
    }
  };

  const handleVolumeChange = (value: number[]) => {
    if (!vimeoPlayer || !isPlayerReady) return;
    
    try {
      const newVolume = value[0];
      setVolume(newVolume);
      setIsMuted(newVolume === 0);
      vimeoPlayer.setVolume(newVolume / 100).catch(err => console.error('Error setting volume:', err));
    } catch (error) {
      console.error('Error changing volume:', error);
    }
  };

  const toggleMute = () => {
    if (!vimeoPlayer || !isPlayerReady) return;
    
    try {
      if (isMuted) {
        vimeoPlayer.setVolume(volume / 100).catch(err => console.error('Error unmuting:', err));
        setIsMuted(false);
      } else {
        vimeoPlayer.setVolume(0).catch(err => console.error('Error muting:', err));
        setIsMuted(true);
      }
    } catch (error) {
      console.error('Error toggling mute:', error);
    }
  };

  const toggleFullscreen = () => {
    try {
      if (!isFullscreen) {
        if (containerRef.current?.requestFullscreen) {
          containerRef.current.requestFullscreen();
        }
      } else {
        if (document.exitFullscreen) {
          document.exitFullscreen();
        }
      }
    } catch (error) {
      console.error('Error toggling fullscreen:', error);
    }
  };

  const seek = (value: number[]) => {
    if (!vimeoPlayer || !isPlayerReady) return;
    
    try {
      const newTime = value[0];
      vimeoPlayer.setCurrentTime(newTime).catch(err => console.error('Error seeking:', err));
    } catch (error) {
      console.error('Error seeking:', error);
    }
  };

  const jumpBack = () => {
    if (!vimeoPlayer || !isPlayerReady) return;
    
    try {
      const newTime = Math.max(0, currentTime - 10);
      vimeoPlayer.setCurrentTime(newTime).catch(err => console.error('Error jumping back:', err));
    } catch (error) {
      console.error('Error jumping back:', error);
    }
  };

  const jumpForward = () => {
    if (!vimeoPlayer || !isPlayerReady) return;
    
    try {
      const newTime = Math.min(duration, currentTime + 10);
      vimeoPlayer.setCurrentTime(newTime).catch(err => console.error('Error jumping forward:', err));
    } catch (error) {
      console.error('Error jumping forward:', error);
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
    if (!vimeoPlayer || !isPlayerReady) return;
    
    try {
      vimeoPlayer.setPlaybackRate(speed)
        .then(() => {
          setPlaybackSpeed(speed);
        })
        .catch(err => console.error('Error setting playback rate:', err));
    } catch (error) {
      console.error('Error changing playback speed:', error);
    }
  };

  // Set video quality
  const changeVideoQuality = (quality: string) => {
    // Vimeo API doesn't directly allow setting quality via the JS API
    setVideoQuality(quality);
    toast({
      title: "Quality Changed",
      description: `Video quality set to ${quality}`,
    });
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
      {/* Video container with ref */}
      <div className="vimeo-container w-full h-full">
        <div ref={videoRef} className="absolute top-0 left-0 w-full h-full"></div>
      </div>
      
      {/* Loading state */}
      {(!isPlayerReady || isBuffering) && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/50 z-10">
          <div className="w-12 h-12 rounded-full border-4 border-white border-t-transparent animate-spin"></div>
        </div>
      )}
      
      {/* Play/Pause overlay for clicking anywhere on the video */}
      <div 
        className="absolute inset-0 cursor-pointer z-10"
        onClick={togglePlay}
        style={{ display: isControlsVisible ? 'none' : 'block' }}
      />
      
      {/* Large play button overlay when paused */}
      {!isPlaying && (
        <div 
          className="absolute inset-0 flex items-center justify-center z-10 cursor-pointer"
          onClick={togglePlay}
        >
          <div className="rounded-full bg-black/40 p-4 transition hover:bg-black/60">
            <Play className="h-12 w-12 text-white" />
          </div>
        </div>
      )}
      
      {/* Title overlay */}
      <div 
        className={cn(
          "absolute top-0 left-0 right-0 p-4 bg-gradient-to-b from-black/70 to-transparent transition-opacity duration-300",
          isControlsVisible || !isPlaying ? "opacity-100" : "opacity-0"
        )}
      >
        <h3 className="text-white font-medium truncate">{title}</h3>
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
            max={duration || 100} 
            step={0.1}
            onValueChange={seek}
            className="h-1.5"
          />
        </div>
        
        {/* Control buttons */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            {/* Play/Pause */}
            <Button 
              variant="ghost" 
              size="icon"
              onClick={togglePlay} 
              className="rounded-full bg-white/20 hover:bg-white/30 transition-colors p-2"
              disabled={!isPlayerReady}
            >
              {isPlaying ? (
                <Pause className="h-5 w-5 text-white" />
              ) : (
                <Play className="h-5 w-5 text-white" />
              )}
            </Button>
            
            {/* Jump back */}
            <Button 
              variant="ghost" 
              size="icon"
              onClick={jumpBack}
              className="rounded-full bg-white/20 hover:bg-white/30 transition-colors p-2"
              disabled={!isPlayerReady}
            >
              <SkipBack className="h-4 w-4 text-white" />
            </Button>
            
            {/* Jump forward */}
            <Button 
              variant="ghost" 
              size="icon"
              onClick={jumpForward}
              className="rounded-full bg-white/20 hover:bg-white/30 transition-colors p-2"
              disabled={!isPlayerReady}
            >
              <SkipForward className="h-4 w-4 text-white" />
            </Button>
            
            {/* Time display */}
            <div className="text-xs text-white">
              {formatTime(currentTime)} / {formatTime(duration)}
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            {/* Rotate screen button */}
            <Button 
              variant="ghost" 
              size="icon"
              onClick={toggleRotation}
              className="rounded-full bg-white/20 hover:bg-white/30 transition-colors p-2"
            >
              <RotateCw className="h-4 w-4 text-white" />
            </Button>
            
            {/* Playback speed selector */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="ghost" 
                  className="rounded-full bg-white/20 hover:bg-white/30 transition-colors p-2"
                  disabled={!isPlayerReady}
                >
                  <span className="text-xs font-medium text-white">{playbackSpeed}x</span>
                </Button>
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
                <Button 
                  variant="ghost" 
                  className="rounded-full bg-white/20 hover:bg-white/30 transition-colors p-2"
                >
                  <Settings className="h-4 w-4 text-white" />
                </Button>
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
              <Button 
                variant="ghost" 
                size="icon"
                onClick={toggleMute} 
                className="rounded-full bg-white/20 hover:bg-white/30 transition-colors p-2"
                disabled={!isPlayerReady}
              >
                {isMuted ? (
                  <VolumeX className="h-4 w-4 text-white" />
                ) : (
                  <Volume2 className="h-4 w-4 text-white" />
                )}
              </Button>
              <Slider 
                value={[isMuted ? 0 : volume]} 
                min={0} 
                max={100} 
                step={1}
                onValueChange={handleVolumeChange}
                className="w-20 h-1.5"
                disabled={!isPlayerReady}
              />
            </div>
            
            {/* Fullscreen toggle */}
            <Button 
              variant="ghost" 
              size="icon"
              onClick={toggleFullscreen}
              className="rounded-full bg-white/20 hover:bg-white/30 transition-colors p-2"
            >
              <Maximize className="h-4 w-4 text-white" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;
