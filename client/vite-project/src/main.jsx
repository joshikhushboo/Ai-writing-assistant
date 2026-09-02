import React from 'react';
import ReactDOM from 'react-dom/client';

import './index.css';
import ai from './images/ai.png';
import {PrivyProvider} from '@privy-io/react-auth';

import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <PrivyProvider
      appId="cmti04sqx04ky0cjrw2g0as8d"
      
      config={{
        loginMethods:["email",'wallet', "google", "github", "twitter"],
        appearance:{
          theme: "dark",
          accentColor: "#4F46E5",
          logo:ai,
        },
        embeddedWallets: {
          ethereum: {
            createOnLogin: 'users-without-wallets'
          }
        }
      }}
    >
      <App />
    </PrivyProvider>
  </React.StrictMode>
);