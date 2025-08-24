import { Component } from 'react';
import YouTube from 'react-youtube';

interface VideoYoutubeProps {
    videoId: string;
}

class VideoYoutube extends Component<VideoYoutubeProps> {
    _onReady(event: any) {
        event.target.playVideoAt(50);
    }
    onPlay(event: any) {
        const player = event.target.pauseVideo();
        return player;
    }
    render(): React.ReactNode {
        const opts = {
            width: '100%',
            playerVars: {
                autoplay: 0 as 0,
            },
        };
        const { videoId } = this.props;
        return <YouTube videoId={videoId} opts={opts} onReady={this._onReady} />;
    }
}

export default VideoYoutube;
