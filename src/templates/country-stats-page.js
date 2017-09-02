import * as PropTypes from 'prop-types';
import React from 'react';
import _ from 'lodash';
import Header from '../components/header';
import StatBar from '../components/stat-bar';

export default class CountryStatsTemplate extends React.Component {
  static propTypes = {
    data: PropTypes.shape({
      countriesJson: PropTypes.object.isRequired,
      allCountriesJson: PropTypes.object.isRequired
    }),
    openVideoPlayer: PropTypes.func.isRequired
  }

  render() {
    const currentCountry = this.props.data.countriesJson;
    const allCountriesData = this.props.data.allCountriesJson.edges.filter(c => c.node.id !== currentCountry.id);
    const currentVideoIds = currentCountry.videos.map(v => v.youtubeId);
    const maxLength = currentVideoIds.length;
    const sharedData = allCountriesData.map(c => {
      c.sharedVideoIds = _.intersection(c.node.videos.map(v => v.youtubeId), currentVideoIds);
      c.sharedCount = c.sharedVideoIds.length;
      return c;
    }).sort((a, b) => b.sharedCount - a.sharedCount);

    return (
      <div>
        <Header history={this.props.history} data={this.props.data} />
        <div className="content-container">
          {sharedData.map(country => {
            const {id} = country.node;
            const width = (country.sharedCount / maxLength) * 100;
            const level = getLevel(width);

            return (
              <StatBar
                key={id}
                country={country}
                level={level}
                width={width}
                openVideoPlayer={this.props.openVideoPlayer}
                selectedCountryVideos={currentCountry.videos} />
            );
          })}
        </div>
      </div>
    );
  }
}

export const pageQuery = graphql`
  query CountryStatsPage($slug: String!) {
    countriesJson(slug: { eq: $slug }) {
      id
      slug
      name,
      videos {
        id
        title
        thumbUrl
        youtubeId
      }
    }
    allCountriesJson {
      edges {
        node {
          id,
          slug
          name
          videos {
            youtubeId
          }
        }
      }
    }
  }
`;

function getLevel(width) {
  if (width > 50) {
    return 'high';
  } else if (width > 25) {
    return 'medium';
  } else if (width > 10) {
    return 'low';
  } else {
    return 'very-low';
  }
}
