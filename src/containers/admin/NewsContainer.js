import React, { Component } from 'react';
import NewsComponent from '../../components/admin/news/NewsComponent';
class NewsContainer extends Component {
    render() {
        return <NewsComponent {...this.props} />;
    }
}

export default NewsContainer;
