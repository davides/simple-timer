import React from 'react';
import Clock from './Clock';

require('./App.css');

const KeyMap = [
  // Spacebar
  { match: e => e.keyCode === 32, run: app => app.clock.toggle() },

  // Backspace
  { match: e => e.keyCode === 8, run: app => app.clock.reset() },

  // Shift + s
  { match: e => e.shiftKey && e.keyCode === 83, run: app => app.clock.save() },
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

  render() {
    return (
      <div className="container">
        <div className="header">
          <h1>simple-timer</h1>
        </div>

        <Clock ref={x => this.clock = x} />
      </div>
    );
  }
}
