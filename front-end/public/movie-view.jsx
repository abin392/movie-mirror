import React, { useState, useEffect, useRef, useCallback } from 'react';
import './movie-view.css'; // Make sure your CSS file is in the same directory

const TV_KEYS = {
    UP: 38, DOWN: 40, LEFT: 37, RIGHT: 39, ENTER: 13,
    BACK: 8, BACK_ALT: 461, BACK_TIZEN: 10009,
    PLAY_PAUSE: 179, REWIND: 412, FORWARD: 417, A_KEY: 65
};

const formatTime = (seconds) => {
    if (isNaN(seconds)) return "0:00";
    const min = Math.floor(seconds / 60);
    const sec = Math.floor(seconds % 60);
    return `${min}:${sec < 10 ? '0' + sec : sec}`;
};

export default function MovieView() {
    // --- State ---
    const [movieData, setMovieData] = useState(null);
    const [currentEpisode, setCurrentEpisode] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [volume, setVolume] = useState(1);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [alertMsg, setAlertMsg] = useState("");
    const [bufferWidth, setBufferWidth] = useState(0);
    const [showUI, setShowUI] = useState(true);
    
    // Hover State
    const [hoverTime, setHoverTime] = useState("0:00");
    const [hoverLeft, setHoverLeft] = useState(0);
    const [isHovering, setIsHovering] = useState(false);

    // --- Refs ---
    const videoRef = useRef(null);
    const containerRef = useRef(null);
    const progressRef = useRef(null);
    const audioCtxRef = useRef(null);
    const gainNodeRef = useRef(null);
    const uiTimeoutRef = useRef(null);
    const ambilightFrameRef = useRef(null);
    const isDraggingRef = useRef(false);

    // --- 1. Initialization ---
    useEffect(() => {
        const savedMovie = localStorage.getItem('selectedMovie');
        if (savedMovie) {
            const parsed = JSON.parse(savedMovie);
            setMovieData(parsed);
            
            // Default to trailer or first episode
            if (parsed.video) {
                setCurrentEpisode({ link: parsed.video, title: "Trailer" });
            } else if (parsed.episodes && parsed.episodes.length > 0) {
                setCurrentEpisode(parsed.episodes[0]);
            }
        }
    }, []);

    // --- 2. Alerts & UI Timeout ---
    const showAlert = useCallback((msg) => {
        setAlertMsg(msg);
        setTimeout(() => setAlertMsg(""), 3000);
    }, []);

    const triggerUI = useCallback(() => {
        setShowUI(true);
        if (uiTimeoutRef.current) clearTimeout(uiTimeoutRef.current);
        uiTimeoutRef.current = setTimeout(() => {
            if (videoRef.current && !videoRef.current.paused) {
                setShowUI(false);
            }
        }, 2500);
    }, []);

    // --- 3. Playback Controls ---
    const togglePlay = useCallback(() => {
        if (videoRef.current) {
            videoRef.current.paused ? videoRef.current.play() : videoRef.current.pause();
            triggerUI();
        }
    }, [triggerUI]);

    const seek = useCallback((seconds) => {
        if (videoRef.current) {
            videoRef.current.currentTime = Math.max(0, Math.min(videoRef.current.duration, videoRef.current.currentTime + seconds));
            showAlert(seconds > 0 ? "⏩ +10s" : "⏪ -10s");
            triggerUI();
        }
    }, [showAlert, triggerUI]);

    const changeEpisode = useCallback((ep) => {
        setCurrentEpisode(ep);
        setCurrentTime(0);
        setBufferWidth(0);
        if (videoRef.current) {
            videoRef.current.load();
            videoRef.current.play();
        }
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, []);

    const handleEpisodeEnd = useCallback(() => {
        if (!movieData || !movieData.episodes) return;
        
        const currentIndex = movieData.episodes.findIndex(ep => ep.link === currentEpisode.link);
        
        // If it was the trailer, play episode 1
        if (currentEpisode.link === movieData.video && movieData.episodes.length > 0) {
            showAlert(`🎥 Trailer Ended. Starting: ${movieData.episodes[0].title}`);
            setTimeout(() => changeEpisode(movieData.episodes[0]), 1500);
        } else if (currentIndex !== -1 && currentIndex < movieData.episodes.length - 1) {
            const nextEp = movieData.episodes[currentIndex + 1];
            showAlert(`🎬 Up Next: ${nextEp.title}`);
            setTimeout(() => changeEpisode(nextEp), 1000);
        } else {
            showAlert("This is the last episode.");
        }
    }, [movieData, currentEpisode, changeEpisode, showAlert]);

    // --- 4. Web Audio API ---
    const initAudio = useCallback(() => {
        if (audioCtxRef.current) return;
        const AudioCtxClass = window.AudioContext || window.webkitAudioContext;
        const audioCtx = new AudioCtxClass();
        const track = audioCtx.createMediaElementSource(videoRef.current);
        const gainNode = audioCtx.createGain();
        
        track.connect(gainNode).connect(audioCtx.destination);
        videoRef.current.volume = 1;
        
        audioCtxRef.current = audioCtx;
        gainNodeRef.current = gainNode;
    }, []);

    const handleVolumeChange = (e) => {
        initAudio();
        if (audioCtxRef.current.state === 'suspended') audioCtxRef.current.resume();
        const val = parseFloat(e.target.value);
        setVolume(val);
        if (gainNodeRef.current) gainNodeRef.current.gain.value = val;
    };

    // --- 5. Ambilight Effect ---
    const updateAmbilight = useCallback(() => {
        const video = videoRef.current;
        if (!video || video.paused || video.ended) return;

        try {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d', { willReadFrequently: true });
            canvas.width = 64; canvas.height = 64;
            ctx.drawImage(video, 0, 0, 64, 64);
            
            const imageData = ctx.getImageData(0, 0, 64, 64).data;
            let r = 0, g = 0, b = 0, count = 0;

            for (let i = 0; i < imageData.length; i += 16) {
                r += imageData[i]; g += imageData[i + 1]; b += imageData[i + 2]; count++;
            }

            r = Math.floor(r / count); g = Math.floor(g / count); b = Math.floor(b / count);
            const color = `rgba(${r}, ${g}, ${b}, 0.8)`;

            video.style.boxShadow = `0px -35px 50px -15px ${color}, 0px 35px 50px -15px ${color}`;

            if (isFullscreen && containerRef.current) {
                containerRef.current.style.background = `linear-gradient(to bottom, rgb(${r*0.2}, ${g*0.2}, ${b*0.2}) 0%, #000 15%, #000 85%, rgb(${r*0.2}, ${g*0.2}, ${b*0.2}) 100%)`;
            } else if (containerRef.current) {
                containerRef.current.style.background = "#000";
            }
        } catch (e) { console.error("Ambilight Error:", e); }

        ambilightFrameRef.current = requestAnimationFrame(updateAmbilight);
    }, [isFullscreen]);

    // --- 6. Event Listeners (Scrubbing, TV Keys) ---
    useEffect(() => {
        const handleKeyDown = (e) => {
            const code = e.keyCode;
            const isInput = ['BUTTON', 'INPUT'].includes(document.activeElement.tagName);

            if (code === TV_KEYS.A_KEY) {
                e.preventDefault();
                setIsFullscreen(prev => !prev);
            } else if (code === TV_KEYS.PLAY_PAUSE) {
                togglePlay();
            } else if (code === TV_KEYS.REWIND || (code === TV_KEYS.LEFT && !isInput)) {
                seek(-10);
            } else if (code === TV_KEYS.FORWARD || (code === TV_KEYS.RIGHT && !isInput)) {
                seek(10);
            } else if ([TV_KEYS.BACK, TV_KEYS.BACK_ALT, TV_KEYS.BACK_TIZEN].includes(code) && isFullscreen) {
                setIsFullscreen(false);
                e.preventDefault();
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [isFullscreen, togglePlay, seek]);

    const scrub = useCallback((e) => {
        if (!videoRef.current || !progressRef.current) return;
        const rect = progressRef.current.getBoundingClientRect();
        let pos = (e.clientX || e.touches?.[0]?.clientX - rect.left) / rect.width;
        pos = Math.max(0, Math.min(1, pos));
        videoRef.current.currentTime = pos * videoRef.current.duration;
    }, []);

    // --- Fullscreen Toggle Effect ---
    useEffect(() => {
        document.body.style.overflow = isFullscreen ? "hidden" : "auto";
        showAlert(isFullscreen ? "Full Screen Enabled" : "Exit Full Screen");
    }, [isFullscreen, showAlert]);

    if (!movieData) {
        return <h1 style={{ color: 'white', textAlign: 'center', marginTop: '50px' }}>Movie Not Found</h1>;
    }

    return (
        <div className="player-container">
            <div className="trailer">
                <h1 style={{ color: 'white' }}>MOVIE TRAILER & EPISODES</h1>
            </div><br />

            <div 
                className={`video-box ${isFullscreen ? 'custom-fullscreen' : ''}`} 
                ref={containerRef}
                onMouseMove={triggerUI}
                onClick={triggerUI}
            >
                <video 
                    ref={videoRef}
                    crossOrigin="anonymous"
                    onClick={togglePlay}
                    src={currentEpisode?.link || ''}
                    onPlay={() => { setIsPlaying(true); updateAmbilight(); }}
                    onPause={() => { setIsPlaying(false); cancelAnimationFrame(ambilightFrameRef.current); }}
                    onTimeUpdate={(e) => setCurrentTime(e.target.currentTime)}
                    onLoadedMetadata={(e) => setDuration(e.target.duration)}
                    onEnded={handleEpisodeEnd}
                    onProgress={() => {
                        const vid = videoRef.current;
                        if (vid && vid.duration > 0 && vid.buffered.length > 0) {
                            const bufferedEnd = vid.buffered.end(vid.buffered.length - 1);
                            setBufferWidth((bufferedEnd / vid.duration) * 100);
                        }
                    }}
                />

                <div className="video-overlay-controls" style={{ opacity: showUI ? 1 : 0, pointerEvents: showUI ? 'auto' : 'none' }}>
                    <div className="main-controls">
                        <button className="nav-btn" onClick={() => seek(-10)} style={{ position: 'absolute', left: '50px' }}>
                            <i className="fas fa-step-backward"></i>
                        </button>
                        <button className="nav-btn play-btn" onClick={togglePlay}>
                            <i className={`fas ${isPlaying ? 'fa-pause' : 'fa-play'}`}></i>
                        </button>
                        <button className="nav-btn" onClick={() => seek(10)} style={{ position: 'absolute', right: '50px' }}>
                            <i className="fas fa-step-forward"></i>
                        </button>
                    </div>

                    <div 
                        className="progress-container" 
                        ref={progressRef}
                        onMouseDown={(e) => { isDraggingRef.current = true; scrub(e); }}
                        onMouseMove={(e) => {
                            if (isDraggingRef.current) scrub(e);
                            if (!progressRef.current || !duration) return;
                            const rect = progressRef.current.getBoundingClientRect();
                            const offsetX = Math.max(0, Math.min(rect.width, e.clientX - rect.left));
                            setHoverLeft(offsetX);
                            setHoverTime(formatTime((offsetX / rect.width) * duration));
                        }}
                        onMouseUp={() => isDraggingRef.current = false}
                        onMouseLeave={() => { isDraggingRef.current = false; setIsHovering(false); }}
                        onMouseEnter={() => setIsHovering(true)}
                        onTouchStart={(e) => { isDraggingRef.current = true; scrub(e); }}
                        onTouchMove={(e) => { if (isDraggingRef.current) scrub(e); }}
                        onTouchEnd={() => isDraggingRef.current = false}
                    >
                        <div className="hover-timer" style={{ display: isHovering ? 'block' : 'none', left: hoverLeft }}>
                            {hoverTime}
                        </div>
                        <div className="buffer-bar" style={{ width: `${bufferWidth}%` }}></div>
                        <div className="progress-bar" style={{ width: `${duration ? (currentTime / duration) * 100 : 0}%` }}>
                            <div className="progress-dot"></div>
                        </div>
                    </div>

                    <div className="bottom-controls">
                        <div className="timer-display" style={{ color: 'white' }}>
                            <span>{formatTime(currentTime)}</span> / <span>{formatTime(duration)}</span>
                        </div>

                        <div className="volume-container">
                            <i className={`fas ${volume === 0 ? 'fa-volume-mute' : volume < 0.5 ? 'fa-volume-down' : 'fa-volume-up'}`} style={{ color: volume > 1 ? '#8e44ad' : 'white' }}></i>
                            <input 
                                type="range" 
                                min="0" max="3" step="0.1" 
                                value={volume} 
                                onChange={handleVolumeChange} 
                            />
                        </div>

                        <button className="fullscreen-btn nav-btn" onClick={() => setIsFullscreen(!isFullscreen)}>
                            <i className={`fas ${isFullscreen ? 'fa-compress' : 'fa-expand'}`}></i>
                        </button>
                    </div>
                </div>
            </div>

            <div className="movie-details">
                <h1 id="movieTitle">{currentEpisode?.title || movieData.title}</h1>
                <p id="movieInfo">
                    Hero: {movieData.hero} <br />
                    Year: {movieData.year} <br />
                    Language: {movieData.language}
                </p>
            </div>

            <div className="episodes-container">
                <div className="section-title"><h2>Episodes</h2></div>
                <div className="episodes-grid" style={{ margin: '10px' }}>
                    {movieData.episodes?.map((ep, index) => (
                        <div 
                            key={index} 
                            className="episode-card" 
                            tabIndex={0} 
                            onClick={() => changeEpisode(ep)}
                            onKeyDown={(e) => e.key === 'Enter' && changeEpisode(ep)}
                        >
                            <div className="episode-thumbnail">
                                <img src={movieData.image} alt={ep.title} />
                            </div>
                            <div className="episode-info">
                                <h4>{ep.title}</h4>
                                <p>{ep.time}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div id="custom-alert" className={`alert-hidden ${alertMsg ? 'show' : ''}`}>
                <div className="alert-content">
                    <i className="fas fa-exclamation-circle"></i>
                    <span>{alertMsg}</span>
                </div>
            </div>
        </div>
    );
}