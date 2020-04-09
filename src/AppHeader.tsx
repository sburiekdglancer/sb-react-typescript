import React, { PureComponent } from "react";
import Clipboard from "clipboard";
import "./AppHeader.css";

class AppHeader extends PureComponent<any, any> {
  clipboard: any;
  constructor(props: any) {
    super(props);
  }
  componentDidMount() {
    this.clipboard = new Clipboard(".copy-to-clipboard");
  }

  componentWillUnmount() {
    this.clipboard.destroy();
  }
  render() {
    return (
      <header className="component-header">
        BitCast.fm
        <span className="progress-span">{this.props.progressMessage}</span>
      </header>
    );
  }
}
export default AppHeader;
