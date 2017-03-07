import React from 'react';

export default class Clock extends React.Component {
  constructor() {
    super();
    this.elapsed = 0;
    this.state = {
      time: '0.000', start: null
    };
  }

  start() {
    this.origin = Date.now();
    this.interval = setInterval(this.tick.bind(this), 100);
  }

  tick() {
    const time = this.elapsed + (Date.now() - this.origin);
    this.setState({ time: (time / 1000).toString() });
  }

  pause() {
    if (this.interval) {
      clearInterval(this.interval);
      this.elapsed += (Date.now() - this.origin);
    }
  }

  reset() {
    if (this.interval) {
      clearInterval(this.interval);
    }
    this.elapsed = 0;
    this.origin = Date.now();
    this.tick();
  }

  render() {
    return (
      <div className="clock">
        <span className="clock">{this.state.time}</span>
        <button onClick={() => this.start()}>Start</button>
        <button onClick={() => this.pause()}>Pause</button>
        <button onClick={() => this.reset()}>Reset</button>
      </div>
    );
  }
}
