import { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { Card, Icon, Image } from 'semantic-ui-react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './Layout';
import * as Result from './Result';

function App() {
  const [count, setCount] = useState(0);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Result.List />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
