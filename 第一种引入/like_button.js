'use strict';

const e = React.createElement;

class LikeButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = { liked: false };
  }

  render() {
    if (this.state.liked) {
      return 'You liked this.';
    }
    //  显示一个 "Like" <button>
    return e(
      'button',
      { onClick: () => this.setState({ liked: true }) },
      'Like'
    );
    //等价于
    // 显示一个 "Like" <button>
    // return (
    //   <button onClick={() => this.setState({ liked: true })}>
    //     Like
    //   </button>
    // );
  }
}

const domContainer = document.querySelector('#like_button_container');
ReactDOM.render(e(LikeButton), domContainer);