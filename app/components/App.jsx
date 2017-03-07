import React from 'react';
import Clock from './Clock';

require('./App.css');

export default () =>
  <div>
    <h1>simple-timer</h1>
    <Clock />
  </div>;

/*
export default class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <h1>Hello World</h1>
    );
  }
}
*/
