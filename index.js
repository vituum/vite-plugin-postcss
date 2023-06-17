import postcssImport from 'postcss-import'
import postcssNesting from 'postcss-nesting'
import postcssCustomMedia from 'postcss-custom-media'
import autoprefixer from 'autoprefixer'
import { getPackageInfo, merge } from 'vituum/utils/common.js'

const { name } = getPackageInfo(import.meta.url)

/**
 * @type {import('@vituum/vite-plugin-postcss/types/index.d.ts').PluginUserConfig}
 */
const defaultOptions = {
    import: {},
    nesting: {},
    customMedia: {},
    autoprefixer: {}
}

/**
 * @param {import('@vituum/vite-plugin-postcss/types/index.d.ts').PluginUserConfig} options
 * @returns {import('vite').Plugin}
 */
const plugin = (options) => {
    options = merge(defaultOptions, options)

    const postcssPlugins = [postcssImport(options.import), postcssNesting(options.nesting), postcssCustomMedia(options.customMedia), autoprefixer(options.autoprefixer)]

    return {
        name,
        enforce: 'pre',
        config (userConfig) {
            // @ts-ignore
            if (!userConfig?.css?.postcss?.plugins) {
                userConfig.css = userConfig.css || {}
                userConfig.css.postcss = userConfig.css.postcss || {}
                userConfig.css.postcss.plugins = postcssPlugins
            } else {
                // @ts-ignore
                userConfig.css.postcss.plugins = postcssPlugins.concat(...userConfig.css.postcss.plugins)
            }
        }
    }
}

export default plugin
