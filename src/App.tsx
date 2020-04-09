import React, { PureComponent } from "react";
import AppHeader from "./AppHeader";
import AppBody from "./AppBody";
import RssLinkCapture from "./RssLinkCapture";
import TranscribeResult from "./TranscribeResult";
import { css } from '@emotion/core';
// First way to import
import { ClipLoader } from 'react-spinners';

const override = css`
    position: absolute;
    top: 30%;
    left: 45%;
    width: 50px;
    height: 50px;
    display: block;
    margin: 0 auto;
    border-color: red;
`;

class App extends PureComponent {

   state: any;
   clipboard: any;
   props: any;

  constructor(props: any) {
    super(props);

    this.state = {
      appState: "GETTING_INPUT",
      loading: false,
      transcribedData: "",
      progressMessage: "",
      title: "Test Title"
    };

    this.setDisplayState = this.setDisplayState.bind(this);
  }

  setDisplayState(displaystate: String, data :String = "", title:String = "") {

    if(displaystate === "PENDING")
    {
      data = data + " % completed";
      this.setState({
        progressMessage: data
      });
    }
    else if(displaystate === "PROCESSING")
    {
      this.setState({
        loading: true
      });
    } 
    else  if(displaystate === "SHOWING_DATA")
    {
      console.log("Title = " + title);
      this.setState({
        transcribedData: data,
        progressMessage: "",
        title: title,
        loading: false
      });
    }

    this.setState({
      appState: displaystate
    });
  };

  render() {

    const appState = this.state.appState;
    let view;

    if (appState === "GETTING_INPUT") {
      view = <RssLinkCapture action={this.setDisplayState}/>;
    } else if (appState === "SHOWING_DATA") {
      view = <TranscribeResult action={this.setDisplayState} transcribedData={this.state.transcribedData} title={this.state.title}/>;
      
    }
   
    return (
      <div className="app-container">
        <AppHeader progressMessage={this.state.progressMessage}/>
        <AppBody>
            {view}
        </AppBody>
        <ClipLoader
          css={"position: absolute;top: 30%;left: 45%;width: 50px;height: 50px;display: block;margin: 0 auto;border-color: red;"}
          sizeUnit={"px"}
          size={100}
          color={'#123abc'}
          loading={this.state.loading}
        />

      </div>
    );
  }
}
export default App;
