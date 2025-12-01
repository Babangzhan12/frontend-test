import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';
import { Notifications } from '@mantine/notifications';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
  <MantineProvider
    theme={{
      primaryColor: "blue",
      fontFamily: "Inter, sans-serif",
      defaultRadius: "md",
    }}
    defaultColorScheme="light"
  >
    <Notifications position="top-right" />
    <App />
  </MantineProvider>
</React.StrictMode>
);
