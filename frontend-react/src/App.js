import React from 'react';
import 'materialize-css/dist/css/materialize.min.css'
import M from 'materialize-css'
import { urlBase } from './support/helper'

import NavBar from './components/navBar'
import SearchBar from './components/searchBar'
import VideosList from './components/videosList'

class App extends React.Component {

  state = {
    querystring: "",
    page: 1,
    videos: [],
    nextPageToken: "",
    prevPageToken: "",
    results: 0,
    loading: false
  }

  _doSearch = (pageToken) => {
    this.setState({
      loading: true
    })
    const qString = this.state.querystring.replace(/([^\w]+|\s+)/g, '-')
    let url = urlBase + "/videos?qString=" + qString
    if(pageToken){
      url += "&pageToken=" + pageToken
    }
    fetch(url).then(result => result.json()).then(result => {
      this.updateState(result)
    })
  }

  doSearch = (pageToken = null) => {
    this.setState({
      page: 1

    })
    this._doSearch(pageToken)

  }

  updateState = result => {
    this.setState({
      results: result.pageInfo.totalResults,
      nextPageToken: result.nextPageToken ?? null,
      prevPageToken: result.prevPageToken ?? null,
      videos: result.videos,
      loading: false

    })
  }

  searchNextPage = () => {
    const page = this.state.page + 1
    this.setState({
      page
    })
    this._doSearch(this.state.nextPageToken)

  }



  searchPrevPage = () => {
    const page = this.state.page - 1 > 0 ? this.state.page -1 : 1
    this.setState({
      page
    })
    this._doSearch(this.state.prevPageToken)

  }

  updateQueryString = (querystring) => {
    this.setState({
      querystring
    })
  }

  render() {
    return (
      <div>
        <header>
          <NavBar />
        </header>
        <main>
          <div className="container">
            <SearchBar searchPrevPage={() => this.searchPrevPage()} searchNextPage={() => this.searchNextPage()} doSearch={() => this.doSearch()} updateQueryString={(q) => this.updateQueryString(q)}  parentState={this.state} />
            
            { this.state.loading ? (<div class="progress"><div class="indeterminate"></div></div>) : <VideosList videos={this.state.videos} /> }
            

          </div>

        </main>

      </div>
    );
  }
}

export default App;
