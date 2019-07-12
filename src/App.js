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


//main App compoent it has All the states and povide it by ConText API
class App extends Component {
  state = {
    images:[],
    catImages:[],
    dogImages:[],
    computerImages:[],
    loading:true,
    searchTerm:""
  }

  //When component Mounted, it loads Images from flickr API
  componentDidMount() {
    //Main image (for search, default = "dogs" image)
    this.setPictures();

    //The 3 default Images for button ,how to simplify this three function?
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

  //It loads the data from flickr API and make it {img:, id:} object
  getPictures = (query = "dog") => {
    return fetch(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&text=${query}&per_page=24&format=json&nojsoncallback=1`)
    .then(res => res.json())
    .then(res => res.photos.photo.map(picture => ({
      img:`https://farm${picture.farm}.staticflickr.com/${picture.server}/${picture.id}_${picture.secret}.jpg`,
      id:picture.id
    })))
    .catch(error => console.log('Error fetching and parsing pictures',error))
  }

  // Get object from getPictures() and set it on state
  setPictures = (query = "happy") => {
    //initalize loading state to true
    this.setLoading();
    this.getPictures(query)
    .then(res => this.setState(prev=>({
      images:res,
      loading:false
    })))
    .catch(error => console.log('Error fetching and parsing pictures',error))
  }

  // This is for Loading text during the loading is in progress
  setLoading = () => {
    this.setState({
      loading:true
    })
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
              { // Check the loading state and render the page if the loading state is false
                (this.state.loading)
                ?
                <p>Loading...</p>
                :
                <Switch>
                  <Route exact path="/" component={Gallery} />
                  <Route path="/cats" component={Gallery} />
                  <Route path="/dogs" component={Gallery} />
                  <Route path="/computers" component={Gallery} />
                  <Route path="/search/:search" component={Gallery} />
                  <Route component={NotFound} />
                </Switch>
              }
          </div>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
