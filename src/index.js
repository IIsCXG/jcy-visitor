import React from 'react';
import ReactDOM from 'react-dom/client';
import { ConfigProvider } from 'antd';
// 导入英文转中文
import zhCN from 'antd/es/locale/zh_CN';
import { history } from './utils/history';

import { unstable_HistoryRouter as HistoryRouter } from "react-router-dom";
import App from './App';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <HistoryRouter history={history} >
    <ConfigProvider locale={zhCN}>
      <App />
    </ConfigProvider>
  </HistoryRouter>
);


