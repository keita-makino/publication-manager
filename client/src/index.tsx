import React from 'react';
import { render } from 'react-dom';
import { App } from './components/App';

(window as any).onload = () => {
  const container = document.getElementById('Container');

  render(<App />, container);
};
