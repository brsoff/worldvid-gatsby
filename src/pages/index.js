import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/header';

export default class IndexPage extends React.Component {
  static propTypes = {
    location: PropTypes.object.isRequired,
    data: PropTypes.shape({
      allCountriesJson: PropTypes.object
    }),
    history: PropTypes.object
  };

  static contextTypes = {
    setCountries: PropTypes.func
  }

  render() {
    const {allCountriesJson} = this.props.data;
    const transformedCountries = allCountriesJson.edges.map(e => e.node);

    this.context.setCountries(transformedCountries);

    return (
      <div className="container">
        <h1>Home</h1>
        <Header history={this.props.history} data={this.props.data} />
      </div>
    );
  }
}

export const pageQuery = graphql`
  query root {
    allCountriesJson {
      edges {
        node {
          id
          name
          slug
          videos {
            id
            title
            thumbUrl
            description,
            youtubeId
          }
        }
      }
    }
  }
`;
