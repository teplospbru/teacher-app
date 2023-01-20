import React, { useState } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { MainPage } from '../MainPage/MainPage';
import { QuestPage } from '../QuestPage/QuestPage';
import { Template } from '../Template/Template';
import './App.scss';

export const App = () => {

  return (
    <Router basename='/'>
      <Routes>
        <Route path="/" element={ <Template /> }>
          <Route path="/quest" element={ <QuestPage /> } />
          <Route path="/" element={ <MainPage /> } />
        </Route>
      </Routes>
    </Router>
  );
};
