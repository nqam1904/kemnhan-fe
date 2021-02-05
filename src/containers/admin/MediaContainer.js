import React, { Component } from 'react';
import MediaComponent from '../../components/admin/Media/MediaComponent'
class MediaContainer extends Component {
  render() {
    return (
      <MediaComponent {...this.props} />
    );
  }
}

export default MediaContainer;