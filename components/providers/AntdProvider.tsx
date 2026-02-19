import { AntdRegistry } from '@ant-design/nextjs-registry'
import { ConfigProvider } from 'antd'

export default function AntdProvider({ children }: { children: React.ReactNode }) {
  return (
    <AntdRegistry>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: '#a7ba42',
            borderRadius: 8,
          },
        }}
      >
        {children}
      </ConfigProvider>
    </AntdRegistry>
  )
}
