import slugg from 'slugg';

const parseOperator = (ctx: Record<string, unknown>, a: Record<string, unknown>): Record<string, any> | null => {
	const name = (a.name as string) && (a.name as string).trim();
	if (!name) {
		return null;
	}
	return {
		type: 'operator',
		id: slugg(a.name as string), // todo: find a more reliable way
		name,
	};
};

export {
	parseOperator,
};
