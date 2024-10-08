import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import Layout from './Layout';
import Home from './components/Home/Home';
import BubbleSort from './components/BubbleSort/BubbleSort';
import SelectionSort from './components/SelectionSort/SelectionSort';
import InsertionSort from './components/InsertionSort/InsertionSort'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route path="" element={<Home />} />
      <Route path="BubbleSort" element={<BubbleSort />} />
      <Route path="SelectionSort" element={<SelectionSort />} />
      <Route path="InsertionSort" element={<InsertionSort />} />
    </Route>
  )
);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
