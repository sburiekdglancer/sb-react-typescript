import React, { PureComponent } from "react";
import Clipboard from "clipboard";
import "./AppBody.css";


class AppBody extends PureComponent {
   state: any;
   clipboard: any;
   props: any;
  componentDidMount() {
    this.clipboard = new Clipboard(".copy-to-clipboard");
  }

  componentWillUnmount() {
    this.clipboard.destroy();
  }

  render() {
    return (
      <div className="app-body">
        {this.props.children}
      </div>
    );
  }
}

export default AppBody;
