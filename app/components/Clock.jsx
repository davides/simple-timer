import React from 'react';
import History from './History';

require('./Clock.css');

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
    this.tick();
    this.setState({
      time: this.renderTime(0),
      running: false
    });
  }

  toggle() {
    if (this.state.running) {
      this.pause();
    } else {
      this.start();
    }
  }

  save() {
    if (this.state.running) {
      return;
    }

    this.history.add({ value: this.renderTime(this.elapsed) });
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

  // toggleButtonClass() {
  //   return `glyphicon glyphicon-${this.state.running ? 'pause' : 'play'}`;
  // }

  render() {
    return (
      <div className="clock-container row">
        <div className="clock col-md-9">
          <span className="time">{this.state.time}</span>
          <button className="btn btn-primary" onClick={() => this.toggle()}>
            <span className={`glyphicon glyphicon-${this.state.running ? 'pause' : 'play'}`} aria-hidden="true" />
          </button>
          <button className="btn" onClick={() => this.reset()}>
            <span className="glyphicon glyphicon-repeat" aria-hidden="true" />
          </button>
          <button className="btn" onClick={() => this.save()}>
            <span className="glyphicon glyphicon-save" aria-hidden="true" />
          </button>
        </div>
        <div className="history col-md-3">
          <span className="heading">History</span>
          <History ref={x => this.history = x} />
        </div>
      </div>
    );
  }
}
