import { defineConfig ,loadEnv } from 'vite'
import path from "path"
import { createHtmlPlugin } from 'vite-plugin-html'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/

export default defineConfig(({ command, mode }) => {
  return {
    server:{
      proxy:{
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
        resolvers: [ElementPlusResolver()],
      }),
      Components({
        resolvers: [ElementPlusResolver()],
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
    resolve:{
      alias:{
        "@":path.resolve(__dirname,'./src')
      }
    },
  
  }
})



