import React, {Component} from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import './App.css';
import apiKey from './config.js';
import {Provider} from './component/Context';

import Gallery from './component/Gallery';
import Header from './component/Header';
import Nav from './component/Nav';
import SearchForm from './component/SearchForm';
import NotFound from './component/NotFound';


class App extends Component {
  state = {
    images:[],
    catImages:[],
    dogImages:[],
    computerImages:[],
    loading:true,
    searchTerm:""
  }


  componentDidMount() {
    this.setPictures();

    //how to simplify this three function?
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

  getPictures = (query = "dog") => {
    return fetch(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&text=${query}&per_page=24&format=json&nojsoncallback=1`)
    .then(res => res.json())
    .then(res => res.photos.photo.map(picture => ({
      img:`https://farm${picture.farm}.staticflickr.com/${picture.server}/${picture.id}_${picture.secret}.jpg`,
      id:picture.id
    })))
    .catch(error => console.log('Error fetching and parsing pictures',error))
  }

  setPictures = (query = "happy") => {
    this.getPictures(query)
    .then(res => this.setState(prev=>({
      images:res,
      loading:false
    })))
    .catch(error => console.log('Error fetching and parsing pictures',error))
  }


  render() {
    return (
      <Provider value={{
        images: this.state.images,
        catImages:this.state.catImages,
        dogImages:this.state.dogImages,
        computerImages:this.state.computerImages,
        actions:{
          setPictures:this.setPictures
        },
        searchTerm: this.state.searchTerm
      }}>
        <BrowserRouter>
          <div className="container">
              <Route path='/' component={Header}/>
              <Route path='/' component={SearchForm}/>
              <Nav />
              {
                (this.state.loading)
                ?
                <p>Loading...</p>
                :
                <Switch>
                  <Route exact path="/" component={Gallery} />
                  <Route path="/:search" component={Gallery} />
                  <Route compoent={NotFound} />
                </Switch>
              }
          </div>
        </BrowserRouter>
      </Provider>
    );
  }
}
// problem, using props and  not using match three is no way to make url by search term
//1. use Provider & Consummer not to use props
//2. not using props, I can use match and history by using <Route ... component={} />
//
//
export default App;
