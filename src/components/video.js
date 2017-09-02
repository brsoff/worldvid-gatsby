import React from 'react';
import * as PropTypes from 'prop-types';

export default class Video extends React.Component {
  static propTypes = {
    thumbUrl: PropTypes.string,
    title: PropTypes.string,
    open: PropTypes.func
  };

  constructor(props) {
    super(props);
    this.state = {loading: true, error: false};
  }

  render() {
    const {thumbUrl, title, open} = this.props;
    const {loading, error} = this.state;

    if (!thumbUrl) {
      return (
        <a href="#" className="video" onClick={open}>
          <img src="/placeholder.jpg" className="placeholder" />
          <h5>{title}</h5>
        </a>
      );
    }

    return (
      <a href="#"
        className="video"
        onClick={open}>
        {
          (loading && !error) &&
          <div className="loader">Loading image...</div>
        }

        {
          loading &&
          <img src="/placeholder.jpg" className="placeholder" />
        }

        <img src={thumbUrl} onLoad={this.onLoad} onError={this.onError} className={`actual ${loading ? '' : 'loaded'}`} />

        <h5>{title}</h5>
      </a>
    );
  }

  onLoad = () => {
    this.setState({loading: false});
  }

  onError = () => {
    this.setState({loading: false, error: true});
  }
}
