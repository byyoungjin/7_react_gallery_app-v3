import React, {Component} from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import './App.css';
import apiKey from './config.js';

import Gallery from './component/Gallery';
import Header from './component/Header';
import Nav from './component/Nav';
import SearchForm from './component/SearchForm';


class App extends Component {
  state = {
    images:[],
    catImages:[],
    dogImages:[],
    computerImages:[],
    loading:true
  }


  componentDidMount() {
    this.setPictures();


    this.getPictures("cats")
    .then(res => this.setState(prev=>({
      catImages:res,
    })));

    this.getPictures("dogs")
    .then(res => this.setState(prev=>({
      dogImages:res,
    })));

    this.getPictures("computers")
    .then(res => this.setState(prev=>({
      computerImages:res,
    })));

  }

  setPictures = (query = "dog") => {
    this.getPictures(query)
    .then(res => this.setState(prev=>({
      images:res,
      loading:false
    })))
    .catch(error => console.log('Error fetching and parsing pictures',error))
  }

  getPictures = (query = "dog") => {
    return fetch(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&text=${query}&per_page=24&format=json&nojsoncallback=1`)
    .then(res => res.json())
    .then(res => res.photos.photo.map(picture => ({
      img:`https://farm${picture.farm}.staticflickr.com/${picture.server}/${picture.id}_${picture.secret}.jpg`,
      id:picture.id
    })))
    .catch(error => console.log('Error fetching and parsing pictures',error))
  }

  render() {
    console.log(this.state);
    return (
      <BrowserRouter>
        <div className="container">
            <SearchForm setPictures={this.setPictures}/>
            <Nav getPictures={this.getPictures} images={this.state.images}/>
            <Switch>
              {/* <Route exact path="/" render={()=><Gallery images={this.state.images} />} /> */}
              {/* <Route path="/cats" render={()=><Gallery images={this.state.catImages} />} />
              <Route path="/dogs" render={()=><Gallery images={this.state.dogImages} />} />
              <Route path="/computers" render={()=><Gallery images={this.state.computerImages} />} /> */}
              <Route path="/:search" render={()=><Gallery images={this.state.images} />} />
            </Switch>
        </div>
      </BrowserRouter>

    );
  }
}

export default App;
