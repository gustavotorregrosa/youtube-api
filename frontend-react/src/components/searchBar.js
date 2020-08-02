import React, { Component } from 'react'

class SearchBar extends Component {

    constructor(props){
        super(props)
    }

    componentDidMount = () => {
        console.log(this.props)
    }

    updateQueryString = e => {
        e.preventDefault()
        this.props.updateQueryString(e.target.value)

    }

    searchNextPage = e => {
        e.preventDefault()
        this.props.searchNextPage()
        
    }

    searchPrevPage = e => {
        e.preventDefault()
        this.props.searchPrevPage()
        
    }

    doSearch = e => {
        e.preventDefault()
        this.props.doSearch()
    }

    render() {
        return (
           <div>
               <form style={{
                   padding: '0.5em',
                   marginTop: '2em'
               }} className="card col s12">
                    <div className="row">
                        <div className="input-field col m8 s12">
                            <input onChange={e => this.updateQueryString(e)} id="querystring" type="text" className="validate" />
                            <label htmlFor="querystring">Query string</label>
                        </div>
                        <div className="col m4 s12">
                            <div className="col s6">
                                <div style={{
                                    marginTop: '1.5em'
                                }}>
                                    <button onClick={e => this.doSearch(e)} className="btn waves-effect waves-light" type="submit" name="action">Search
                                        <i className="material-icons right">search</i>
                                    </button>
                                </div>
                            
                            </div>
                            <div className="col s6">
                                <p>Results: {this.props.parentState.results}  </p>
                                <p>Page: {this.props.parentState.page}</p>
                            <div>
                                    <button onClick={e => this.searchPrevPage(e)} style={{marginRight: '1em'}} className="btn-small waves-effect waves-light"><i className="material-icons">chevron_left</i></button> 
                                    <button onClick={e => this.searchNextPage(e)} className="btn-small waves-effect waves-light"><i className="material-icons">chevron_right</i></button> 
                                </div>
                            </div>
                        </div>
                       
                    </div>
                </form>
           </div>
        )
    }
}

export default SearchBar