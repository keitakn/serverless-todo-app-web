import * as React from "react";
import RaisedButton from "material-ui/RaisedButton";

export interface Props {
  content: string;
};

const style = {
  margin: 12,
};

export default class MyComponent extends React.Component<Props, {}> {
  render() {
    return (
      <div>
        <RaisedButton label="Default" style={style} />
        <RaisedButton label={this.props.content} primary={true} style={style} />
        <RaisedButton label="Secondary" secondary={true} style={style} />
        <RaisedButton label="Disabled" disabled={true} style={style} />
      </div>
    )
  }
}
