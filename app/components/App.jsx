import React from 'react';
import Clock from './Clock';

require('./App.css');

const KeyMap = [
  { match: e => e.keyCode === 32, run: app => app.toggleClock() }
];

function handleKey(app) {
  return (e) => {
    for (let i = 0; i < KeyMap.length; i++) {
      if (KeyMap[i].match(e)) {
        KeyMap[i].run(app, e);
      }
    }
  };
}

let keyHandler;


export default class App extends React.Component {
  componentDidMount() {
    keyHandler = handleKey(this);
    document.addEventListener('keydown', keyHandler);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', keyHandler);
  }

  toggleClock() {
    this.clock.toggle();
  }

  render() {
    return (
      <div>
        <h1>simple-timer</h1>
        <Clock ref={x => this.clock = x} />
      </div>
    );
  }
}
