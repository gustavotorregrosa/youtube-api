import React, { Component } from 'react'

class VideosList extends Component {

    constructor(props){
        super(props)
    }


    limitChars = (str, nChars) => {
        if(str.length > nChars){
            console.log("bateu aqui..")
            return str.substring(0, nChars) +  "..."
        }

        return str
    }

    listVideos = () => {
        let videos = []
        if(this.props.videos){
            videos = this.props.videos
        }

        return videos.map(video => (
            <div className="col l4 m6 s12">
                <div class="card">
                    <div class="card-image">
                        <img src={video.snippet.thumbnails.medium.url} />
                        <span class="card-title">{this.limitChars(video.snippet.title, 30)}</span>
                    </div>
                    <div class="card-content" style={{
                        height: '10em'
                    }}>
                        <p>{this.limitChars(video.snippet.description, 120)}</p>
                    </div>
                    <div class="card-action">
                        <a href={"https://www.youtube.com/watch?v="+ video.id.videoId} target="_blank" >YouTube</a>
                    </div>
                </div>          
            </div>

        ))
        
    }



    render(){
        return(
            <div style={{
                marginTop:'1em',
                padding: '0.5em'
            }} className="card col s12">
                <div className="row">
                {this.listVideos()}
                </div>
            </div>
        )
    }

}

export default VideosList