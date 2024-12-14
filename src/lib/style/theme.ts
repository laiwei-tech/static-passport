import { ThemeConfig } from 'antd';

export const themeConfig: ThemeConfig = {
  token: {
    colorPrimary: '#000',
    borderRadius: 0,
  },
  components: {
    Tabs: {
      cardBg: 'rgb(240,240,240)',
      colorBorder: 'rgba(255,255,255,0)',
      cardHeight: 48,
      cardPadding: '11px 16px',
      fontSize: 16,
      cardGutter: 0,
    },
    Input: {
      borderRadius: 0,
      borderRadiusOuter: 0,
      borderRadiusLG: 0,
    },
    Select: {
      paddingXXS: 0,
      controlHeight: 40,
      optionSelectedBg: 'rgb(237,237,237)',
    },
    Spin: {
      colorBgMask: 'rgb(255,255,255)',
      colorFillSecondary: 'rgb(255,255,255)',
    },
  },
};
