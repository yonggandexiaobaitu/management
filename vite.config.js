import { defineConfig, loadEnv } from 'vite'
import path from "path"
import { createHtmlPlugin } from 'vite-plugin-html'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import IconsResolver from 'unplugin-icons/resolver'
import Icons from 'unplugin-icons/vite'
import vue from '@vitejs/plugin-vue'


// https://vitejs.dev/config/

export default defineConfig(({ command, mode }) => {
  return {
    server: {
      proxy: {
        '^/api.*': {
          target: 'http://152.136.185.210:5000',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, '')
        },
      }
    },
    plugins: [

      vue(),
      AutoImport({
        resolvers: [
          ElementPlusResolver(),
          // Auto import icon components
          // 自动导入图标组件
          IconsResolver({
            prefix: 'Icon',
          }),
        ],
      }),
      Components({
        resolvers: [
          // 自动导入 Element Plus 组件
          ElementPlusResolver(),
          // 自动注册图标组件
          IconsResolver({
            prefix: 'icon', // 自动引入的Icon组件统一前缀，默认为 i，设置false为不需要前缀
            enabledCollections: ['ep'],
          }),
        ],
      }),
     
      Icons({
        autoInstall: true,
        compiler: "vue3",
      }),
      //注入环境变量数据
      createHtmlPlugin({
        inject: {
          data: {
            title: loadEnv(mode, process.cwd()).VITE_TITLE
          },
        },
      })
    ],

    resolve: {
      alias: {
        "@": path.resolve(__dirname, './src')
      }
    },


  }
})



