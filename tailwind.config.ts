import type {Config} from 'tailwindcss'
import plugin from "tailwindcss/plugin";

export default {
    content: ['./app/**/*.{js,jsx,ts,tsx}'],
    theme: {
        extend: {
            gridTemplateColumns: {
                'mobile': 'repeat(10, 200px)'
            }
        },
    },
    plugins: [
        plugin(function ({addUtilities}) {
            addUtilities({
                '.hide-scrollbar': {
                    "-ms-overflow-style": "none",
                    "scrollbar-width": "none"
                }
            })
        })
    ],
} satisfies Config