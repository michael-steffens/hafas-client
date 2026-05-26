declare module 'create-hash' {
	import {Buffer} from 'node:buffer';
	interface Hash {
		update(data: string | Buffer, enc?: string): this;
		digest(enc?: string): string | Buffer;
	}
	function createHash(algo: string): Hash;
	export default createHash;
}

declare module 'google-polyline' {
	export function encode(coords: [number, number][]): string;
	export function decode(str: string): [number, number][];
}

declare module 'gps-distance' {
	function gpsDistance(lat1: number, lon1: number, lat2: number, lon2: number): number;
	export default gpsDistance;
}

declare module 'slugg' {
	function slugg(str: string): string;
	export default slugg;
}

declare module '@derhuerst/br2nl' {
	function brToNewline(str: string): string;
	export default brToNewline;
}

declare module '@derhuerst/round-robin-scheduler' {
	function roundRobin<T>(items: T[]): {get(): T; schedule(fn: () => void): () => void};
	export default roundRobin;
}
