const common_site_config = {
	webserver_port: 8000,
};

const defined_webserver_port = common_site_config
	? common_site_config.webserver_port
	: null;

const webserver_port = defined_webserver_port || 8000;

export default {
	'^/(app|api|assets|files|private)': {
		target: `http://127.0.0.1:${webserver_port}`,
		ws: true,
		router: function (req) {
			const site_name = req.headers.host.split(':')[0];
			return `http://${site_name}:${webserver_port}`;
		},
	},
};
