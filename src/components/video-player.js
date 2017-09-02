import * as PropTypes from 'prop-types';
import React from 'react';

export default class VideoPlayer extends React.Component {
  static propTypes = {
    youtubeId: PropTypes.string,
    close: PropTypes.func
  };

  render() {
    return (
      <div className="video-player">
        <a href="#" className="close" onClick={this.close}>X</a>

        <iframe src={`http://www.youtube.com/embed/${this.props.youtubeId}`}>
        </iframe>
      </div>
    );
  }

  close = (e) => {
    e.preventDefault();
    this.props.close();
  }
}
