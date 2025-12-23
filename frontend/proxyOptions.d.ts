declare const proxyOptions: {
	[key: string]: {
		target: string;
		ws: boolean;
		router: (req: { headers: { host: string } }) => string;
	};
};

export default proxyOptions;
