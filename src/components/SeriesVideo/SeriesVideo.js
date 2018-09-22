// @flow

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import RutubeNetworkService from '../../services/RutubeService'
import ReactPlayer from 'react-player'

const style = {
  seriesList: {
    // width: '100%',
    padding: 30,
    // display: 'flex',
    // flexWrap: 'wrap',
    // justifyContent: 'space-between'
  },
  series: {
    display: 'inline-block',
    // flexDirection: 'column',
    // flexWrap: 'wrap',
    margin: '0 30px 20px 0',
  },
  seriesImageWrapper: {},
  seriesImage: {
    height: 170
  },
  seriesContent: {
    fontSize: 16,
    fontWeight: 'bold'
  }
}

export default class SeriesVideo extends Component {
  static propTypes = {
    videoTrack: PropTypes.object,
  }
  
  getVideoUrl() {
    const { videoTrack } = this.props
    
    return videoTrack && videoTrack.video_balancer && videoTrack.video_balancer.m3u8
  }
  
  render() {
    console.log('videoTrack')
    return (
      <div style={style.seriesList}>
        <ReactPlayer
          url={this.getVideoUrl()}
          onEnded={() => console.log('end video')}
          controls
        />
      </div>
    )
  }
}
