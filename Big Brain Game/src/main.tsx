import React from 'react';
import ReactDOM from 'react-dom/client';
import Header from './components/Header';
import Grid from './components/Grid';
import Score from './components/Score';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Header />
    <Grid />
    <Score />
  </React.StrictMode>
);
