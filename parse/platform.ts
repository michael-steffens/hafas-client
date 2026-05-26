const parsePlatform = (ctx: Record<string, unknown>, platfS: string | null, platfR: string | null, cncl = false): Record<string, any> => {
	let planned = platfS || null;
	let prognosed = platfR || null;

	if (cncl) {
		return {
			platform: null,
			plannedPlatform: planned,
			prognosedPlatform: prognosed,
		};
	}
	return {
		platform: prognosed || planned,
		plannedPlatform: planned,
	};
};

export {
	parsePlatform,
};
