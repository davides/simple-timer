import React from 'react';

require('./History.css');

const Timing = (props) => (
  <li>{props.timing.value}</li>
);


// http://stackoverflow.com/a/105074/176821
function guid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
}

export default class History extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      timings: []
    };
  }

  add(timing) {
    this.state.timings.push(timing);
    this.setState({ timings: this.state.timings });
  }

  clear() {
    this.setState({ timings: [] });
  }

  empty() {
    return this.state.timings.length === 0;
  }

  hide(test) {
    return test() ? 'hide' : '';
  }

  render() {
    return (
      <div>
        <ul className="history">
          {this.state.timings.map(t => (<Timing timing={t} key={guid()} />))}
        </ul>
        <button className={`btn btn-link ${this.hide(() => this.empty())}`} onClick={() => this.clear()}>Clear</button>
      </div>
    );
  }
}
