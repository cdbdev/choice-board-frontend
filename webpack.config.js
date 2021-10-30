module.exports = (env, argv) => {
	var system = env.dev ? 'dev' : 'prod';
	return require(`./webpack.${system}.js`)
};