import * as PropTypes from 'prop-types';
import React from 'react';
import CountrySelect from './country-select';
import Link from 'gatsby-link';

export default class Header extends React.Component {
  static propTypes = {
    data: PropTypes.shape({
      countriesJson: PropTypes.object
    }),
    history: PropTypes.object
  }

  render() {
    let selectedSlug = '';

    if (this.props.data && this.props.data.countriesJson) {
      selectedSlug = this.props.data.countriesJson.slug;
    }

    const videosLink = `/countries/${selectedSlug}/videos`;
    const statsLink = `/countries/${selectedSlug}/stats`;
    const pathname = this.props.history.location.pathname;

    return (
      <header>
        <CountrySelect selectedSlug={selectedSlug} history={this.props.history} />

        {
          selectedSlug &&
          <ul>
            <li className={videosLink === pathname ? 'active' : ''}><Link to={videosLink}>Videos</Link></li>
            <li className={statsLink === pathname ? 'active' : ''}><Link to={statsLink}>Stats</Link></li>
          </ul>
        }
      </header>
    );
  }
}
