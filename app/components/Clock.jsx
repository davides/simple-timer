import React from 'react';

const ZeroPadding = ['', '0', '00', '000'];
function pad(num, width, padRight) {
  const str = String(num);
  const padding = ZeroPadding[Math.max(0, width - str.length)];
  return padRight ? str + padding : padding + str;
}

export default class Clock extends React.Component {
  constructor() {
    super();
    this.elapsed = 0;
    this.state = {
      time: this.renderTime(0),
      start: null,
      running: false
    };
  }

  start() {
    this.origin = Date.now();
    this.interval = setInterval(this.tick.bind(this), 100);

    this.setState({ running: true });
  }

  tick() {
    const time = this.elapsed + (Date.now() - this.origin);
    this.setState({ time: this.renderTime(time) });
  }

  pause() {
    if (this.interval) {
      clearInterval(this.interval);
      this.elapsed += (Date.now() - this.origin);
    }

    this.setState({ running: false });
  }

  reset() {
    if (this.interval) {
      clearInterval(this.interval);
    }
    this.elapsed = 0;
    this.origin = Date.now();
    this.tick();
    this.setState({ running: false });
  }

  toggle() {
    if (this.state.running) {
      this.pause();
    } else {
      this.start();
    }
  }

  renderTime(epoch) {
    let rem = epoch;

    const minutes = Math.floor(rem / 60000);
    rem -= minutes * 60000;

    const seconds = Math.floor(rem / 1000);
    rem -= seconds * 1000;

    const milliseconds = rem;

    return `${pad(minutes, 2)}:${pad(seconds, 2)}.${pad(milliseconds, 3, true)}`;
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
