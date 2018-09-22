// @flow

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import RutubeNetworkService from '../../services/RutubeService'

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
    width: 302,
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

export default class SeriesList extends Component {
  static propTypes = {
    selectVideo: PropTypes.func,
  }
  constructor() {
    super()
    
    this.state = {
      seriesList: []
    }
  }
  
  async componentDidMount () {
    const result = await RutubeNetworkService.getPacankiSeriesList()
    console.log('did', result)
    this.setState({
      seriesList: result
    })
    
  }
  
  renderSeriesList () {
    console.log('ren', this.state.seriesList)
    return this.state.seriesList.map(
      (series: Series, i: number) => (
        <div key={i} style={style.series}>
          <div style={style.seriesImageWrapper}>
            {
              series.thumbnail_url ? (
                <a onClick={() => this.props.selectVideo(series.track_id)}>
                  <img style={style.seriesImage} src={series.thumbnail_url} alt='' />
                </a>
              ) : null
            }
          </div>
          <div style={style.seriesContent}>
            {
              series.title
            }
          </div>
        </div>
      ))
  }
  
  render() {
    return (
      <div style={style.seriesList}>
        { this.renderSeriesList() }
      </div>
    )
  }
}
