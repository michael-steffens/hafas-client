export interface CoordinatesDTO {
	latitude: number;
	longitude: number;
}

export interface LocationDTO extends CoordinatesDTO {
	id: string | null;
}

export interface StationDTO extends LocationDTO {
	name: string | null;
	type: 'station' | 'stop';
	stops?: StationDTO[];
	entrances?: CoordinatesDTO[];
	products?: Record<string, boolean>;
	ids?: Record<string, string>;
	transitAuthority?: string;
	facilities?: Record<string, unknown>;
	isMeta?: boolean;
	station?: StationDTO;
	grids?: Array<{title: string; rows: string[][]}>;
	reisezentrumOpeningHours?: Record<string, string>;
}

export interface AddressDTO extends LocationDTO {
	address: string;
}

export interface POIDTO extends LocationDTO {
	name: string;
}

export type ParsedLocationDTO = StationDTO | AddressDTO | POIDTO | CoordinatesDTO | null;
