import React, { Component } from 'react'
import './PokeFetch.css';


class PokeFetch extends Component {
  constructor() {
    super()
    this.state = {
      pokeInfo: '',
      pokeSprite: '',
      pokeName: '',
      seconds: 10,
      display: false,
      running: false,
    }
  }

  fetchPokemon() {
    let min = Math.ceil(1);
    let max = Math.floor(152);
    let pokeNum = Math.floor(Math.random() * (max - min) + min);
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokeNum}`, {
      method: 'GET'
    }).then(res => res.json())
      .then(res => {
        this.setState({
          pokeInfo: res,
          pokeSprite: res.sprites.front_default,
          pokeName: res.species.name,
        })
      })
      .catch((err) => console.log(err))
      
      this.setState({
        seconds: 10,
        visible: false,
        running: true
      })
  }


  componentCountdown = () => {

    if(this.state.running === true && this.state.seconds > 0){
      console.log(this.state.seconds)
      this.setState({seconds: this.state.seconds -= 1})
    }
  }

  componentDidMount(){
    this.interval = setInterval(() => this.componentCountdown(), 1000)
  }
  


  componentDidUpdate() {
    let timer = document.getElementsByClassName('timer')[0]
    if(this.state.seconds === 0 && this.state.visible === false ){
        this.setState({visible: true})
        timer.innerText = 'Time is out'
    } else if(this.state.seconds > 0 ){
        timer.innerText = this.state.seconds
    }
  

  }

  

  componentWillUnmount(){
    console.log('unmounting')
    clearInterval(this.interval)
   
  }


  render() {
    return (
      <div className={'wrapper'}>
        <button className={'start'} onClick={() => this.fetchPokemon()}>Start!</button>
        <h1 className={'timer'} >Timer Display</h1>
        <div className={'pokeWrap'}>
         { this.state.visible ? <div><img className={'pokeImg'} src={this.state.pokeSprite} /> 
          <h1 className={'pokeName'}>{this.state.pokeName}</h1></div> : <div><img style={{ filter: 'brightness(0%)'}} className={'pokeImg'} src={this.state.pokeSprite} /> 
          <h1 style={{display: 'none'}} className={'pokeName'}>{this.state.pokeName}</h1></div>
        }
        </div>
      </div>
    )
  }
}

export default PokeFetch;