import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { connect } from 'react-redux'

import { IState } from '../../store'
import * as mainThunks from '../../store/main/thunks'

import style from './App.scss'

export interface IProps {
  color: string | null
  setColor: () => void
}

class App extends Component<IProps> {
  static propTypes = {
    color: PropTypes.string,
    setColor: PropTypes.func,
  }

  static defaultProps = {
    color: '',
    setColor: () => {},
  }
  
  handleSubmit(e: any) {
    e.preventDefault()
    this.props.setColor()
  }
  
  renderColor() {
    const { color } = this.props
    
    if (!color) {
      return null
    }
    
    return (
      <span style={{backgroundColor: color}} className={style.colorBox} />
    )
  }

  render() {
    return (
      <form className={style.root} onSubmit={this.handleSubmit.bind(this)}>
        { this.renderColor() }
        
        <button className={style.button} type='submit'>
          Set random color
        </button>

      </form>
    )
  }
}

const mapStateToProps = (state: IState) => ({
  color: state.main.color,
})

const mapDispatchToProps = (dispatch: any) => ({
  setColor: () => dispatch(mainThunks.setRandomColor())
})

export default connect(mapStateToProps, mapDispatchToProps)(App)
