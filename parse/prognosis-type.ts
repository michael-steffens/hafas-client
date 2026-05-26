const parsePrognosisType = (_: Record<string, unknown>, progType: string): string | null => {
	return {
		PROGNOSED: 'prognosed',
		CALCULATED: 'calculated',
		// todo: are there more?
	}[progType] || null;
};

export {
	parsePrognosisType,
};
