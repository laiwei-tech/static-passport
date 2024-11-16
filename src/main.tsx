import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import { ConfigProvider } from 'antd';
import { themeConfig } from './lib/style/theme.ts';
import { StyleProvider } from '@ant-design/cssinjs';
import './index.css';
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <StyleProvider layer>
        <ConfigProvider theme={themeConfig}>
          <App />
        </ConfigProvider>
      </StyleProvider>
    </QueryClientProvider>
  </StrictMode>,
);
