import RaisedButton from "material-ui/RaisedButton";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import * as React from "react";
import {ActionDispatcher} from "./Container";
import {CounterState} from "./module";

interface Props {
  value: CounterState;
  actions: ActionDispatcher;
}

const style = {
  margin: 12,
};

export class Counter extends React.Component<Props, {}> {

  public render() {
    return (
      <MuiThemeProvider>
        <div>
          {(this.props.value.loadingCount === 0) ? null : <p>loading</p>}
          <p>{`score: ${this.props.value.num}`}</p>
          <RaisedButton
            label="Increment 3"
            style={style}
            onClick={() => this.props.actions.increment(3)}
          />
          <RaisedButton
            label="Decrement 2"
            style={style}
            primary={true}
            onClick={() => this.props.actions.decrement(2)}
          />
          <RaisedButton
            label="async Increment 100"
            style={style}
            secondary={true}
            onClick={() => this.props.actions.asyncIncrement()}
          />
        </div>
      </MuiThemeProvider>
    );
  }
}
