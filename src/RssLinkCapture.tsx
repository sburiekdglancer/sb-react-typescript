import React, { PureComponent } from "react";
import Clipboard from "clipboard";


import "./RssLinkCapture.css";
import axios from 'axios'

class RssLinkCapture extends PureComponent<any, any> {
   state: any;
   clipboard: any;
   props: any;  

    constructor(props: any) {
        super(props);
        this.state = {
            searchLink: ''
        };
        this.handleClick = this.handleClick.bind(this);
      }

  componentDidMount() {
    this.clipboard = new Clipboard(".copy-to-clipboard");
  }

  componentWillUnmount() {
    this.clipboard.destroy();
  }

  handleClick () {
    var current = this;
    current.props.action("PROCESSING");
    
    console.log("this.state.searchLink = " + this.state.searchLink);

    axios.get('/transcribe?rssFeedURL=' + encodeURI(this.state.searchLink))
      .then(response =>  {
          console.log("Got transcribe Response");
          console.log(response);
          console.log("response.status = " + response.status);
          if(response.data.status === "SUCCESS" && response.data.type === "code") {
            var id = response.data.id;
            var urlhash = response.data.urlhash;
            var title = response.data.title;
            console.log(id);
            var count = 0;

            var setIntervalHandle =    setInterval(function() {
                    console.log("Trying to get transcribed data : " + count);
                    count++;
                    axios.get('/gettranscribeddata?id=' + id  + "&urlhash=" + urlhash + "&title=" + title)
                    .then(response =>  {
                        console.log(response);
                        if(response.data.status === "SUCCESS") {
                            console.log("Got title = " + response.data.title);
                            current.props.action("SHOWING_DATA", response.data.data, response.data.title);
                            clearInterval(setIntervalHandle);
                        }
                        else if(response.data.status === "ERROR") { 
                            current.props.action("SHOWING_DATA", response.data.data, "");
                            clearInterval(setIntervalHandle);
                        }
                        else if(response.data.status === "PENDING") { 
                          if(response.data.progressPercent) {
                            current.props.action("PENDING", response.data.progressPercent);
                            console.log("Set progress %");
                          }
                        } else {
                          clearInterval(setIntervalHandle);
                          current.props.action("SHOWING_DATA", "Unknown error occured. Please try again later");
                        }
                    });

                }, 30000);
            }
            else if(response.data.status === "SUCCESS" && response.data.type === "data") {
                    var data = response.data.data;
                    var title = response.data.title;
                    current.props.action("SHOWING_DATA", data, title);
            }
            else {
                    var data = response.data.message;
                    current.props.action("SHOWING_DATA", data);
            }
      });
  }

  updateSearchLink(evt: any) {
    this.setState({
      searchLink: evt.target.value
    });
  }

  render() {
    return (
      <div className="rss-link-capture">
        <div className="rss-link-capture-container">
                <div className="capture-header text-center">
                    Submit Rss Link
                </div>
                <div className="container text-center">
                        <input className="search-link" onChange={evt => this.updateSearchLink(evt)}/>
                        <button className="btn btn-primary transcribe-button" onClick={this.handleClick}>Transcribe</button>
                </div>
        </div>

      </div>
    );
  }
}

export default RssLinkCapture;
