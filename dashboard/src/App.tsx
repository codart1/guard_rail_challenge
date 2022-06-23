import { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { Card, Icon, Image } from 'semantic-ui-react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './Layout';
import * as Result from './Result';

function App() {
  const [count, setCount] = useState(0);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route index element={<Navigate to="/result" replace />} />
        </Route>
        <Route path="/result" element={<Layout />}>
          <Route index element={<Result.List />} />
          <Route path=":id" element={<Result.Detail />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
