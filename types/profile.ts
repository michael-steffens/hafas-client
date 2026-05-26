import type {Product} from './line.js';
import type {Station, Address, POI} from './location.js';
import type {Journey, JourneyLeg, Stopover} from './journey.js';
import type {Departure, Arrival} from './departure.js';
import type {Trip, Movement} from './trip.js';
import type {Hint, Warning} from './remark.js';
import type {Line, Operator} from './line.js';

export interface CommonData {
	operators: (Operator | null)[];
	icons: unknown[];
	lines: (Line | null)[];
	hints: (Hint | null)[];
	warnings: (Warning | null)[];
	locations: (Station | Address | POI | null)[];
	polylines: unknown[];
}

export interface ParseCtx {
	profile: Profile;
	opt: Record<string, unknown>;
	common: CommonData;
	res: Record<string, unknown>;
	parsed?: Record<string, unknown>;
}

export interface FormatCtx {
	profile: Profile;
	opt: Record<string, unknown>;
}

export interface RequestCtx {
	profile: Profile;
	opt: Record<string, unknown>;
}

export interface HAFASRawResponse {
	jnyL?: unknown[];
	outConL?: unknown[];
	locL?: unknown[];
	common?: Record<string, unknown>;
	planrtTS?: string;
	msgL?: unknown[];
	journey?: unknown;
	lineL?: unknown[];
	posL?: unknown[];
	match?: {locL?: unknown[]};
	sDaysB?: string;
	fpB?: string;
	fpE?: string;
}

export interface Profile {
	locale: string;
	timezone: string;
	endpoint: string;
	products: Product[];
	defaultLanguage?: string;
	auth?: unknown;
	client?: unknown;
	ext?: string;
	ver?: string;
	salt?: string | Buffer | null;
	addChecksum?: boolean;
	addMicMac?: boolean;
	randomizeUserAgent?: boolean;
	logRequest: (ctx: RequestCtx, req: unknown, reqId: string) => void;
	logResponse: (ctx: RequestCtx, res: unknown, body: string, reqId: string) => void;
	request: (ctx: RequestCtx, userAgent: string, reqData: unknown) => Promise<{res: Record<string, unknown>; common: CommonData}>;
	transformReqBody: (ctx: RequestCtx, body: unknown) => unknown;
	transformReq: (ctx: RequestCtx, req: unknown) => unknown;
	transformJourneysQuery: (ctx: RequestCtx, query: unknown) => unknown;
	formatStationBoardReq: (ctx: FormatCtx, station: unknown, type: string) => unknown;
	formatLocationsReq: (ctx: FormatCtx, query: string) => unknown;
	formatStopReq: (ctx: FormatCtx, stopRef: unknown) => unknown;
	formatNearbyReq: (ctx: FormatCtx, location: {latitude: number; longitude: number}) => unknown;
	formatTripReq: (ctx: FormatCtx, id: string) => unknown;
	formatRadarReq: (ctx: FormatCtx, north: number, west: number, south: number, east: number) => unknown;
	formatReachableFromReq: (ctx: FormatCtx, address: unknown) => unknown;
	formatRefreshJourneyReq: (ctx: FormatCtx, refreshToken: string) => unknown;
	formatRemarksReq: (ctx: FormatCtx) => unknown;
	formatLinesReq: (ctx: FormatCtx, query: string) => unknown;
	parseDateTime: (ctx: ParseCtx, date: string, time: string, tzOffset: number | null, timestamp: boolean) => string | number;
	parsePlatform: (ctx: ParseCtx, platfS: string | null, platfR: string | null, cncl: boolean) => {platform: string | null; plannedPlatform: string | null; prognosedPlatform?: string};
	parseProductsBitmask: (ctx: ParseCtx, bitmask: number) => Record<string, boolean>;
	parseIcon: (ctx: ParseCtx, i: unknown) => unknown;
	parseWhen: (ctx: ParseCtx, date: string, timeS: string, timeR: string, tzOffset: number | null, cncl: boolean) => {when: string | null; plannedWhen: string | null; prognosedWhen?: string; delay: number | null};
	parsePrognosisType: (ctx: ParseCtx, progType: string) => string | null;
	parseScheduledDays: (ctx: ParseCtx, sDays: unknown) => Record<string, boolean> | null;
	parseDeparture: (ctx: ParseCtx, d: unknown) => Departure;
	parseArrival: (ctx: ParseCtx, d: unknown) => Arrival;
	parseTrip: (ctx: ParseCtx, t: unknown) => Trip;
	parseJourneyLeg: (ctx: ParseCtx, pt: unknown, date: string) => JourneyLeg;
	parseJourney: (ctx: ParseCtx, j: unknown) => Journey;
	parseLine: (ctx: ParseCtx, p: unknown) => Line | null;
	parseStationName: (ctx: ParseCtx, name: string) => string;
	parseLocation: (ctx: ParseCtx, l: unknown) => Station | Address | POI | null;
	parseCommon: (ctx: ParseCtx & {res: Record<string, unknown>}) => CommonData;
	parsePolyline: (ctx: ParseCtx, p: unknown) => unknown;
	parseMovement: (ctx: ParseCtx, m: unknown) => Movement;
	parseNearby: (ctx: ParseCtx, n: unknown) => Station | Address | POI | null;
	parseOperator: (ctx: ParseCtx, a: unknown) => Operator | null;
	parseHint: (ctx: ParseCtx, h: unknown) => Hint | null;
	parseWarning: (ctx: ParseCtx, w: unknown) => Warning;
	parseStopover: (ctx: ParseCtx, st: unknown, date: string) => Stopover;
	formatAddress: (a: Address) => unknown;
	formatCoord: (x: number) => number;
	formatDate: (profile: Profile, when: number | Date) => string;
	formatLocationFilter: (stops: boolean, addresses: boolean, poi: boolean) => string;
	formatProductsFilter: (ctx: FormatCtx, filter: Record<string, boolean>) => unknown;
	formatPoi: (p: POI) => unknown;
	formatStation: (id: string) => unknown;
	formatTime: (profile: Profile, when: number | Date) => string;
	formatLocation: (profile: Profile, l: unknown, name?: string) => unknown;
	formatRectangle: (profile: Profile, north: number, west: number, south: number, east: number) => unknown;
	filters?: {accessibility?: Record<string, unknown>; bike?: unknown};
	// Feature flags
	journeysOutFrwd?: boolean;
	departuresGetPasslist?: boolean;
	departuresStbFltrEquiv?: boolean;
	trip?: boolean;
	radar?: boolean;
	refreshJourney?: boolean;
	refreshJourneyUseOutReconL?: boolean;
	tripsByName?: boolean;
	remarks?: boolean | never;
	remarksGetPolyline?: boolean;
	lines?: boolean | never;
	journeysWalkingSpeed?: boolean;
	journeysFromTrip?: boolean;
	reachableFrom?: boolean;
	// DB-specific
	generateUnreliableTicketUrls?: boolean;
}
