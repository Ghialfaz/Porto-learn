import{
    defineConfig,
    presetAttributify,
    presetIcons,
    presetUno,
    presetWebFonts,
} from 'unocss'

import {
    presetScrollbar,
} from 'unocss-preset-scrollbar'
import { fileURLToPath } from 'url'
import { dirname, resolve } from 'node:path'

export default defineConfig ({
    theme: {
        colors: {
            primary: '#121212',
            secondary: '#1e1e1e',
            foreground: '#d4cfbf',
            accent: {
                10: '#C4925F',
                20: '#d29557',
            },
        },
    },

    shortcuts: {
        'btn': 'max-w-fit flex items-center gap-2 rounded-md bg-accent-10 font-display text-primary transition duration-300 px-6 py-4 hover:shadow-xl shadow-accent-10/50',
        'input-text': 'w-full rounded-sm border border-foreground/30 bg-secondary p-4 text-sm text-foreground duration-150 placeholder:text-foreground/80 hover:border-accent-10 focus:border-accent-10',
    },

    rules: [
        ['vertical-writing-rl', {'writing-mode': 'vertical-rl'}],
        ['scrollbar-thin', { 'scrollbar-width': 'thin' }],
    ],

    presets: [
        presetUno(),
        presetAttributify(),
        presetIcons({
            scale: 1.2,
            warn: true,
            collections: {
                'simple-icons': () => import('@iconify-json/simple-icons/icons.json').then(i => i.default),
                'vscode-icons': () => import('@iconify-json/vscode-icons/icons.json').then(i => i.default),
                carbon: () => import('@iconify-json/carbon/icons.json').then(i => i.default),
                custom: async (icon) => {
                    const fs = await import('fs/promises')
                    const __dirname = dirname(fileURLToPath(import.meta.url))
                    const svgPath = resolve(__dirname, 'src/assets', `${icon}.svg`)
                    try {
                        return await fs.readFile(svgPath, 'utf8')
                    } catch {
                        return ''
                    }
                },
            },
        }),

        presetWebFonts({
            fonts: {
                display: 'Roboto:400,500,700',
                text: 'Roboto:400,500,700',
            },
        }),
        presetScrollbar(),
    ],
})