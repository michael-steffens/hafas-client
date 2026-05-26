export interface Operator {
	type: 'operator';
	id: string;
	name: string;
}

export interface Line {
	type: 'line';
	id: string | null;
	name: string | null;
	product: string | null;
	mode: string | null;
	public: boolean;
	fahrtNr?: string | null;
	operator?: Operator;
	productName?: string;
	adminCode?: string;
	additionalName?: string;
}

export interface Product {
	id: string;
	mode: string;
	bitmasks: number[];
	name?: string;
	short?: string;
	default: boolean;
}
