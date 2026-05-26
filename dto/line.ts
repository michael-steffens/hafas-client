export interface OperatorDTO {
	id: string;
	name: string;
}

export interface LineDTO {
	id: string | null;
	name: string | null;
	product: string | null;
	mode: string | null;
	public: boolean;
	operator?: OperatorDTO;
	productName?: string;
	additionalName?: string;
}
