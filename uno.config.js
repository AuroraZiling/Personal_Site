import { presetUno, defineConfig, presetIcons } from 'unocss'
import { presetExtra } from 'unocss-preset-extra'

export default defineConfig({
  presets: [presetUno(), presetExtra(), presetIcons()]
})
