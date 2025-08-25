import YouTube from 'react-youtube';

interface VideoYoutubeProps {
    videoId: string;
}

function VideoYoutube({ videoId }: VideoYoutubeProps) {
    const opts = {
        width: '100%',
        playerVars: {
            autoplay: 0 as 0,
        },
    };
    const onReady = (event: any) => {
        event.target.playVideoAt(50);
    };
    return <YouTube videoId={videoId} opts={opts} onReady={onReady} />;
}

export default VideoYoutube;
