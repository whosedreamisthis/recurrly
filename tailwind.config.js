/** @type {import('tailwindcss').Config} */
module.exports = {
	// IMPORTANT: Fixes the color scheme crash and handles theme switching
	darkMode: 'class',
	content: [
		'./App.{js,ts,tsx}',
		'./app/**/*.{js,ts,tsx}',
		'./components/**/*.{js,ts,tsx}',
	],
	presets: [require('nativewind/preset')],
	theme: {
		extend: {
			colors: {
				background: '#fff9e3',
				foreground: '#081126',
				card: '#fff8e7',
				muted: '#f6eecf',
				'muted-foreground': 'rgba(0, 0, 0, 0.6)',
				primary: '#081126',
				accent: '#ea7a53',
				border: 'rgba(0, 0, 0, 0.1)',
				success: '#16a34a',
				destructive: '#dc2626',
				subscription: '#8fd1bd',
			},
			// Added this section to support your .home-balance-card
			borderRadius: {
				'4xl': 32,
			},
			// Added this section so min-h-50 works in @apply
			minHeight: {
				50: 200,
			},
			spacing: {
				0: 0,
				1: 4,
				2: 8,
				3: 12,
				4: 16,
				5: 20,
				6: 24,
				7: 28,
				8: 32,
				9: 36,
				10: 40,
				11: 44,
				12: 48,
				14: 56,
				16: 64,
				18: 72,
				20: 80,
				24: 96,
				30: 120,
				50: 200, // Matching the min-height just in case
			},
			fontFamily: {
				sans: ['sans-regular'],
				'sans-light': ['sans-light'],
				'sans-medium': ['sans-medium'],
				'sans-semibold': ['sans-semibold'],
				'sans-bold': ['sans-bold'],
				'sans-extrabold': ['sans-extrabold'],
			},
		},
	},
	plugins: [],
};
