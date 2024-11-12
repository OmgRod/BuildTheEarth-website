import type { NextConfig } from 'next';
import path from 'path';

const nextConfig: NextConfig = {
	experimental: {
		turbo: {},
	},
	// transpilePackages: [
	// 	'@tiptap/react',
	// 	'@tiptap/starter-kit',
	// 	'@tiptap/extension-underline',
	// 	'@tiptap/extension-link',
	// 	'@tiptap/extension-superscript',
	// 	'@tiptap/extension-subscript',
	// 	'@tiptap/extension-highlight',
	// 	'@tiptap/extension-text-align',
	// ],
	output: 'standalone',
	poweredByHeader: false,
	outputFileTracingRoot: path.join(__dirname, '../../'),
};

export default nextConfig;
