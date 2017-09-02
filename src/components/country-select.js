import * as PropTypes from 'prop-types';
import React from 'react';
import countriesForSelect from '../../data/countries-for-select';
import {navigateTo} from 'gatsby-link';

export default class CountrySelect extends React.Component {
  static propTypes = {
    history: PropTypes.object.isRequired,
    selectedSlug: PropTypes.string
  };

  constructor(props) {
    super(props);
    this.state = {selectedCountry: props.selectedSlug};
  }

  render() {
    return (
      <div className="country-select">
        <select
          value={this.state.selectedCountry}
          onChange={this.changeCountry.bind(this)}>
          <option value="">Select a country...</option>
          {countriesForSelect.map(c => {
            return (
              <option value={c.slug} key={c.id}>
                {c.name}
              </option>
            );
          })}
        </select>
      </div>
    );
  }

  changeCountry = (e) => {
    const slug = e.target.value;

    this.setState({
      selectedCountry: slug
    }, () => {
      navigateTo(`/countries/${slug}/videos`);
    });
  }
}
