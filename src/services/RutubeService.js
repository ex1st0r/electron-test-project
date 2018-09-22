// @flow
import axios from 'axios'

const BASE_PATH = 'https://rutube.ru/api'
const GIRLS_SERIAL_ID = '374'
const GIRLS_SERIAL_SEASON = '5'
const PACANKI_SERIAL_ID = '4361'
const GET_SERIES_LIST = (SERIAL_ID, SEASON) => `/metainfo/tv/${SERIAL_ID}/video?sort=series_d&season=${SEASON}&type=2`
const VIDEO_BY_TRACK_ID = (id) => `/play/options/${id}`


class RutubeNetworkService {
  createProvider () {
    return axios.create({
      baseURL: BASE_PATH,
    })
  }
  
  getVideoByTrackId (id) {
    const provider = this.createProvider()
    
    return provider.get(VIDEO_BY_TRACK_ID(id))
  }
  
  getGirlsSeriesList (){
    return this.getSeriesList(this.getGirlsSeriesListPage.bind(this))
  }
  
  getPacankiSeriesList (){
    return this.getSeriesList(this.getPacankiSeriesListPage.bind(this))
  }
  
  async getSeriesList(serialListPage) {
    let results = []
    let hasNext = true
    let currentPage = 1
  
    do {
      const { data } = await serialListPage(currentPage)
      hasNext = data.has_next
      currentPage += 1
      results = results.concat(data.results)
    } while (hasNext)
  
  
    return results
  }
  
  getGirlsSeriesListPage (pageNum = 1) {
    const provider = this.createProvider()
    
    return provider.get(`${GET_SERIES_LIST(GIRLS_SERIAL_ID, GIRLS_SERIAL_SEASON)}&page=${pageNum}`)
    
  }
  
  getPacankiSeriesListPage (pageNum = 1) {
    const provider = this.createProvider()
    
    return provider.get(`${GET_SERIES_LIST(PACANKI_SERIAL_ID, 3)}&page=${pageNum}`)
    
  }
}

export default new RutubeNetworkService()
