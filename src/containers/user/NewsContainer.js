import React, { Component } from 'react';
import NewsComponents from '../../components/user/news/NewsComponents';

class NewsContainer extends Component {
  render() {
    return (
      <NewsComponents {...this.props} />
    );
  }
}

export default NewsContainer;