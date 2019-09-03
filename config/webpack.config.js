/*
 * @Author: 289608944@qq.com
 * @Description: In User Settings Edit
 * @Date: 2019-09-03 13:51:02
 * @LastEditTime: 2019-09-03 16:49:34
 * @LastEditors: 289608944@qq.com
 */
import { resolve } from 'path'
import ImageminPlugin from 'imagemin-webpack-plugin'
import imageminMozjpeg from 'imagemin-mozjpeg'
// import chainWebpack from 'webpack-chain'
// import copyWebpackPlugin from 'copy-webpack-plugin'
import { BundleAnalyzerPlugin  } from 'webpack-bundle-analyzer'

export default ( config ) => {
   // 设置 alias
  // config.resolve.alias.set('a', 'path/to/a');
  if(process.env.NODE_ENV === 'production'){
    config.plugin('webpack-bundle-analyzer').use(BundleAnalyzerPlugin).end();
    // config.plugin('copy-webpack-plugin').use(copyWebpackPlugin,[[{
    //   from: resolve(__dirname,'../public'),
    //   to:'./static'
    // }]])
    // .after('webpack-bundle-analyzer')
    // .end();
    config.plugin('imagemin-webpack-plugin').use(ImageminPlugin,[{
      cacheFolder: resolve(__dirname,'../dist/cache'), //缓存图像
      test: /\.(jpe?g|png|gif|svg|ico)$/i,
      minFileSize:5120, //大于5k才压缩
      pngquant:{
        quality: '95-100'
      },
      plugins: [
        imageminMozjpeg({
          quality: 100,
          progressive: true
        })
      ]
    }])
    .after('webpack-bundle-analyzer')
    .end();
    
    config.optimization
    .runtimeChunk(false)
    .splitChunks({
      chunks: "async",
      minSize: 30000,
      minChunks: 1,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      name: true,
      cacheGroups: {
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true,
        },
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10
        }
      }
    });

    config.externals({
      echarts:'echarts',
      _:'lodash',
    });
  }
}