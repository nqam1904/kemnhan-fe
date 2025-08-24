import { Component } from 'react';
import ImageAssets from 'constants/ImagesAsset';

interface ScrollToTopState {
  is_visible: boolean;
}

export default class ScrollToTop extends Component<{}, ScrollToTopState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      is_visible: false,
    };
  }

  componentDidMount() {
    var scrollComponent = this;
    document.addEventListener('scroll', function () {
      scrollComponent.toggleVisibility();
    });
  }

  toggleVisibility() {
    if (window.pageYOffset > 300) {
      this.setState({
        is_visible: true,
      });
    } else {
      this.setState({
        is_visible: false,
      });
    }
  }

  scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }

  render(): React.ReactNode {
    const { is_visible } = this.state;
    return (
      <div className="scroll-to-top">
        {is_visible && (
          <div onClick={() => this.scrollToTop()} className="scrollToTop" id="btnArrow">
            <img src={ImageAssets.increase} width={40} alt="Go to top" />
          </div>
        )}
      </div>
    );
  }
}
