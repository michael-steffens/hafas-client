export interface Coordinates {
	latitude: number;
	longitude: number;
}

export interface Location extends Coordinates {
	type: 'location';
	id: string | null;
}

export interface Station extends Location {
	type: 'station' | 'stop';
	name: string | null;
	stops?: Station[];
	entrances?: Coordinates[];
	products?: Record<string, boolean>;
	ids?: Record<string, string>;
	transitAuthority?: string;
	facilities?: Record<string, unknown>;
	isMeta?: boolean;
	station?: Station;
	// DB-specific
	grids?: Array<{title: string; rows: string[][]}>;
	reisezentrumOpeningHours?: Record<string, string>;
	// VBB/BVG-specific
	stationDHID?: string;
}

export interface Address extends Location {
	address: string;
}

export interface POI extends Location {
	name: string;
	poi: true;
}

export type ParsedLocation = Station | Address | POI | Coordinates | null;
