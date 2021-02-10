import React, { Component } from "react";
import YouTube from "react-youtube";

class VideoYoutube extends Component {
  _onReady(event) {
    event.target.playVideoAt(50);
  }
  onPlay(event) {
    const player = event.target;
    return player;
  }
  render() {
    const opts = {
      width: "100%",
      playerVars: {
        autoplay: 1,
      },
    };
    const { videoId } = this.props;
    return (
      <>
        <YouTube videoId={videoId} opts={opts} onReady={this._onReady} />
      </>
    );
  }
}

export default VideoYoutube;
