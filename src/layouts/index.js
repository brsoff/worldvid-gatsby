import React from 'react';
import PropTypes from 'prop-types';
import VideoPlayer from '../components/video-player';
import './index.css';

export default class TemplateWrapper extends React.Component {
  static propTypes = {
    location: PropTypes.object,
    children: PropTypes.func,
    history: PropTypes.object
  }

  static childContextTypes = {
    setCountries: PropTypes.func
  }

  constructor(props) {
    super(props);
    this.state = {videoPlayerOpen: false, youtubeId: ''};
  }

  getChildContext() {
    return {
      setCountries: countries => {
        this.countries = countries;
      }
    };
  }

  render() {
    const {videoPlayerOpen, youtubeId} = this.state;

    return (
      <div className="container">
        {this.props.children({...this.props, location: this.props.location, openVideoPlayer: this.openVideoPlayer})}
        {videoPlayerOpen && <VideoPlayer youtubeId={youtubeId} close={this.closeVideoPlayer} />}
      </div>
    );
  }

  openVideoPlayer = (id) => {
    this.setState({videoPlayerOpen: true, youtubeId: id});
  }

  closeVideoPlayer = () => {
    this.setState({videoPlayerOpen: false, youtubeId: ''});
  }
}
