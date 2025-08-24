import React, { Component } from 'react';
import NewsComponent from 'views/admin/news/NewsComponent';
class NewsContainer extends Component<any, any> {
    render(): React.ReactNode {
        return <NewsComponent {...this.props} />;
    }
}

export default NewsContainer;
