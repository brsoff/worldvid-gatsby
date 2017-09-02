import * as PropTypes from 'prop-types';
import React from 'react';
import Video from './video';

export default class Country extends React.Component {
  static propTypes = {
    openVideoPlayer: PropTypes.func.isRequired,
    id: PropTypes.string,
    name: PropTypes.string,
    country: PropTypes.object,
    videos: PropTypes.array
  };

  render() {
    const {videos} = this.props.country;

    let videosByCategory = videos.reduce((sorted, current) => {
      const category = current.category;

      if (sorted[category]) {
        sorted[category].push(current);
      } else {
        sorted[category] = [current];
      }

      return sorted;
    }, {});

    let sortedVideosByCategory = [];

    for (let cat in videosByCategory) {
      sortedVideosByCategory.push([cat, videosByCategory[cat]]);
    }

    sortedVideosByCategory.sort((a, b) => {
      return b[1].length - a[1].length;
    });

    return (
      <div className="videos-wrapper">
        {sortedVideosByCategory.map(item => {
          const category = item[0];
          const videos = item[1];

          return (
            <div key={category}>
              <h3>{category} ({videos.length})</h3>

              <div className="videos-category-wrapper">
                {videos.map(video => {
                  const open = (e) => {
                    e.preventDefault();
                    this.props.openVideoPlayer(video.youtubeId);
                  };

                  return (
                    <Video
                      key={video.id}
                      open={open}
                      {...video} />
                  );
                })}
              </div>
            </div>

          );
        })}
      </div>
    );
  }
}
