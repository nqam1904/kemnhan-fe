import React, { Component } from 'react';
import NewsComponents from 'views/main/news/NewsComponents';

class NewsContainer extends Component<any, any> {
    render(): React.ReactNode {
        return <NewsComponents {...this.props} />;
    }
}

export default NewsContainer;
