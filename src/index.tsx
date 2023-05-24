import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './App';
import { initPOIIcons } from '~/services/poiagg';
import { store } from '~/services/store';

import './index.less';

// vyrenderujeme UI
const container = document.getElementById('app');
const root = createRoot(container!);

root.render(<Provider store={store}>
	<App />
</Provider>);

// nacteme info o poitypech a ikonach, jinak to nebude mit cenu
initPOIIcons();
