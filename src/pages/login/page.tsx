import { useState } from 'react'
import './page.less'
import classNames from 'classnames'
import LoginLogoIcon from '@/assets/logo-light.svg'
import LoginBackground from '@/assets/login-background.png'
import { Tabs } from 'antd'

interface Result {
  code: string
  state: string
}

function Login() {
  const [loginMode, setLoginMode] = useState<string>('wechat')
  const [qrcodeResult, setQrcodeResult] = useState<Result>({
    code: '',
    state: ''
  })

  return (
    <div className='page-login'>
      <img className='page-login-background' src={LoginBackground} alt='' />
      <div className={classNames('page-login-form', loginMode === 'wechat' && 'page-login-form-large')}>
        <h2 className='page-login-title'>
          <img src={LoginLogoIcon} />
        </h2>
        <div className='page-login-box'>
          <Tabs
            type="card"
            onChange={(loginMode) => { setLoginMode(loginMode) }}
          >
            <Tabs.TabPane tab='微信登录' key='wechat'>
              {!qrcodeResult.code && <div id='login-wechat-qrcode' className='login-wechat-qrcode'></div>}
            </Tabs.TabPane>
            <Tabs.TabPane tab='账号登录' key='phone'>
              <div className='page-login-box-phone'>
                {/* <AyForm fields={fields} span={24} props={{ size: 'large' }} onConfirm={handleConfirm}>
                  <AyButton loading={loading} className='page-login-submit' type='primary' htmlType='submit' block>
                    {shouldBindPhone ? '绑定手机号' : '登录'}
                  </AyButton>
                </AyForm> */}
              </div>
            </Tabs.TabPane>
          </Tabs>
        </div>
      </div>
    </div>
  )
}

export default Login
