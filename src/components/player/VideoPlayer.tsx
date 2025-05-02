
import React, { useState, useEffect, useRef } from 'react';
import { 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  Maximize,
  SkipBack,
  SkipForward
} from 'lucide-react';
import { Slider } from '@/components/ui/slider';
import { cn } from '@/lib/utils';

interface VideoPlayerProps {
  videoUrl: string;
  title: string;
  poster?: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ videoUrl, title, poster }) => {
  const videoRef = useRef<HTMLIFrameElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(70);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isControlsVisible, setIsControlsVisible] = useState(true);
  const controlsTimeoutRef = useRef<NodeJS.Timeout | null>(null);

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

  // For iframe embedded videos, direct control is limited
  // These functions would work better with HTML5 video elements
  // Here we're providing a UI that simulates video controls
  
  const togglePlay = () => {
    setIsPlaying(!isPlaying);
    // In a real implementation with HTML5 video:
    // isPlaying ? videoRef.current?.pause() : videoRef.current?.play();
  };

  const handleVolumeChange = (value: number[]) => {
    setVolume(value[0]);
    setIsMuted(value[0] === 0);
    // In a real implementation: videoRef.current.volume = value[0] / 100;
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
    if (isMuted) {
      setVolume(70);  // restore previous volume
    } else {
      setVolume(0);
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
    // In a real implementation: videoRef.current.currentTime = newTime;
  };

  const jumpBack = () => {
    const newTime = Math.max(0, currentTime - 10);
    setCurrentTime(newTime);
    // In a real implementation: videoRef.current.currentTime = newTime;
  };

  const jumpForward = () => {
    const newTime = Math.min(duration, currentTime + 10);
    setCurrentTime(newTime);
    // In a real implementation: videoRef.current.currentTime = newTime;
  };

  const formatTime = (timeInSeconds: number): string => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  // Since we're using iframe embeds, we simulate a duration
  useEffect(() => {
    // Simulate video duration (5 minutes)
    setDuration(300);
    
    // Simulate time updates when playing
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentTime(prev => {
          if (prev >= duration) {
            setIsPlaying(false);
            return duration;
          }
          return prev + 1;
        });
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isPlaying, duration]);

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

  return (
    <div 
      ref={containerRef} 
      className={cn(
        "relative group w-full rounded-lg overflow-hidden bg-black",
        isFullscreen ? "fixed inset-0 z-50" : "aspect-video"
      )}
    >
      {/* Video iframe */}
      <iframe
        ref={videoRef}
        src={videoUrl}
        title={title}
        className="absolute top-0 left-0 w-full h-full"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
      
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
