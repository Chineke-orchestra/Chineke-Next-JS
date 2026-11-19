import nextCoreWebVitals from 'eslint-config-next/core-web-vitals';

export default [
	...nextCoreWebVitals,
	{
		files: ['**/*.{js,jsx,mjs,ts,tsx}'],
		rules: {
			// React Compiler rules added in eslint-plugin-react-hooks 6+; existing patterns, not runtime bugs
			'react-hooks/set-state-in-effect': 'warn',
			'react-hooks/refs': 'warn',
		},
	},
];
