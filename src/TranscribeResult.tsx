import React, { PureComponent } from "react";
import Clipboard from "clipboard";


import "./TranscribeResult.css";

class TranscribeResult extends PureComponent <any, any>  {
    constructor(props: any) {
        super(props);
        this.state = {
            searchLink: ''
        };
        this.handleClick = this.handleClick.bind(this);
      }
   
   state: any;
   clipboard: any;
   props: any;

  componentDidMount() {
    this.clipboard = new Clipboard(".copy-to-clipboard");
  }

  componentWillUnmount() {
    this.clipboard.destroy();
  }

  handleClick () {
    var current = this;
    current.props.action("GETTING_INPUT");
  }


  render() {
    return (
      <div className="transcribe-result-container-outer">
      <div className="transcribe-result-container">
                        <div className="transcribe_result">
                          <p className="transcribe-title">{this.props.title}</p>
                          <p>{this.props.transcribedData}</p>
                         </div>
                      
        </div>
        <div className="transcribe-actions">
                            <button className="btn btn-primary transcribe-button" onClick={this.handleClick}>&lt;Go Back</button>
        </div>
        </div>
    );
  }
}

export default TranscribeResult;
