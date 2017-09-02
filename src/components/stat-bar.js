import * as PropTypes from 'prop-types';
import React from 'react';
import Video from './video';

export default class StatBar extends React.Component {
  static propTypes = {
    country: PropTypes.object,
    level: PropTypes.string,
    width: PropTypes.number,
    selectedCountryVideos: PropTypes.array,
    openVideoPlayer: PropTypes.func
  };

  constructor(props) {
    super(props);
    this.state = {open: false};
  }

  render() {
    const {country, level, width, selectedCountryVideos, openVideoPlayer} = this.props;
    const name = country.node.name;
    const sharedCount = country.sharedCount;
    const open = this.state.open;

    return (
      <div>
        {name} ({sharedCount})<br />
        <a className={`stat-bar ${level}`} style={{width: `${width}%`}} href="#" onClick={this.toggle}>
        </a>

        {
          open &&
          <div className="shared-videos">
            {country.sharedVideoIds.map(vId => {
              const video = selectedCountryVideos.find(v => v.youtubeId === vId);

              if (!video) {
                return null;
              }

              const open = (e) => {
                e.preventDefault();
                openVideoPlayer(video.youtubeId);
              };

              return <Video key={video.id} {...video} open={open} />;
            })}
          </div>
        }
      </div>
    );
  }

  toggle = (e) => {
    e.preventDefault();
    this.setState({open: !this.state.open});
  }
}
