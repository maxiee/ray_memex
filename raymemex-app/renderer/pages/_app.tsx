import React from 'react'
import Head from 'next/head'
import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import store from '../store';

import 'antd/dist/reset.css'
import 'react-grid-layout/css/styles.css'
import 'react-resizable/css/styles.css'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <React.Fragment>
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
        </Head>
        <Component {...pageProps} />
      </React.Fragment>
    </Provider>
  )
}

export default MyApp
