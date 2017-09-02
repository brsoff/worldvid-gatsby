import * as PropTypes from 'prop-types';
import React from 'react';
import Country from '../components/country';
import Header from '../components/header';

export default class CountryTemplate extends React.Component {
  static propTypes = {
    data: PropTypes.shape({
      countriesJson: PropTypes.object.isRequired
    }),
    history: PropTypes.object,
    openVideoPlayer: PropTypes.func.isRequired
  }

  render() {
    return (
      <div>
        <Header history={this.props.history} data={this.props.data} />

        <div className="content-container">
          <Country
            country={this.props.data.countriesJson}
            openVideoPlayer={this.props.openVideoPlayer} />
        </div>
      </div>
    );
  }
}

export const pageQuery = graphql`
  query CountryPage($slug: String!) {
    countriesJson(slug: { eq: $slug }) {
      id
      name
      slug
      videos {
        id
        title
        description
        thumbUrl,
        youtubeId,
        viewCount,
        category
      }
    }
  }
`;
