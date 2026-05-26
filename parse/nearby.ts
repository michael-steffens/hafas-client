// todo: remarks
// todo: lines
// todo: what is s.pCls?
// todo: what is s.wt?
// todo: what is s.dur?

const parseNearby = (ctx: Record<string, unknown>, n: Record<string, unknown>): Record<string, any> => { // n = raw nearby location
	const res = (ctx as any).profile.parseLocation(ctx, n);
	res.distance = n.dist;
	return res;
};

export {
	parseNearby,
};
