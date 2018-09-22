import '../assets/css/App.css'
import React, { Component } from 'react'
import { connect } from 'react-redux'

import SeriesList from './SeriesList/SeriesList'
import SeriesVideo from './SeriesVideo/SeriesVideo'
import RutubeNetworkService from '../services/RutubeService'


export default class App extends React.Component {
  constructor(){
    super()
    
    this.state = {
      currentVideo: null,
      currentVideoError: null,
    }
  }
  
  getVideoByTrackId(id) {
    RutubeNetworkService.getVideoByTrackId(id)
      .then(({ data }) => {
        console.log('video', data)
        this.setState({
          currentVideo: data,
          currentVideoError: null,
        })
      })
      .catch((error) => this.setState({ currentVideoError: error }))
  }
  
  render() {
    const { currentVideo, currentVideoError } = this.state
    
    if (currentVideoError) {
      return <div>Error</div>
    }
    
    if (currentVideo){
      return <SeriesVideo videoTrack={currentVideo}/>
    }
    
    return (
      <SeriesList selectVideo={this.getVideoByTrackId.bind(this)}/>
    )
  }
}

