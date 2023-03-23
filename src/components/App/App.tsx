import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { Admin } from '../Admin/Admin';
import { MainPage } from '../MainPage/MainPage';
import { TestPage } from '../TestPage/TestPage';
import { Template } from '../Template/Template/Template';
import { NotFound } from '../NotFound/NotFound';
import './App.scss';
import { StudentTest } from '../StudentTest/StudentTest';
import { HashRoute } from '../HashRoute/HashRoute';

export const App = () => {
  return (
    <Router basename="/">
      <Routes>
        <Route path="/" element={<Template />}>
          <Route path="/test" element={<TestPage />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/test/:hash" element={
            <HashRoute>
              <StudentTest />
            </HashRoute>
          } />
          <Route path="/" element={<MainPage />} />
          <Route path="/404" element={<NotFound />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Router>
  );
};
