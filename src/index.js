import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';

import App from './App';
import store from './app/store';

// Note: In this Vite/TanStack Start project, the actual client bootstrap is
// handled by TanStack Start via src/routes/__root.tsx. This file preserves
// the original CRA entry structure for reference. It is not executed.
const container = document.getElementById('root');
if (container) {
  createRoot(container).render(
    <React.StrictMode>
      <Router>
        <Provider store={store}>
          <App />
        </Provider>
      </Router>
    </React.StrictMode>,
  );
}
