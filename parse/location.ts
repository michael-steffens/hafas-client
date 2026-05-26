import {parse} from 'qs';
import get from 'lodash/get.js';

const POI = 'P';
const STATION = 'S';
const ADDRESS = 'A';

const leadingZeros = /^0+/;

// todo: what is l.wt? – seems to be "weight"?
// 	- `6733` for 8013074 with p/vmt
// 	- `3933` for 8012092 with p/vmt
// 	- `2062` for 8010168 with p/vmt
// todo: l.gidL (e.g. `["A×de:15088:8013414"]`)
// todo: `i` param in `lid` (e.g. `A=1@O=Zöberitz@X=12033455@Y=51504612@U=80@L=8013414@i=A×de:15088:8013414@`)

const parseLocation = (ctx: Record<string, unknown>, l: Record<string, unknown>) => {
	const {profile, opt} = ctx as any;
	const raw = l as any;

	const lid = parse(raw.lid, {delimiter: '@'});
	const res: Record<string, any> = {
		type: 'location',
		id: (raw.extId || lid.L || '').replace(leadingZeros, '') || null,
	};

	if (raw.crd) {
		res.latitude = raw.crd.y / 1000000;
		res.longitude = raw.crd.x / 1000000;
		// todo: raw.crd.floor
	} else if ('X' in lid && 'Y' in lid) {
		res.latitude = lid.Y / 1000000;
		res.longitude = lid.X / 1000000;
	}

	if (raw.type === STATION) {
		// todo: https://github.com/public-transport/hafas-client/issues/151
		const locL = get((ctx as any).res, ['common', 'locL'], []);

		const mMastLocX = 'mMastLocX' in raw
			? raw.mMastLocX
			: NaN;
		const subStops = (raw.stopLocL || [])
			.filter(locX => locX !== mMastLocX)
			.map(locX => locL[locX])
			.filter(s => Boolean(s))
			.map(s => profile.parseLocation(ctx, s))
			.filter(stop => Boolean(stop));

		const stop: Record<string, any> = {
			type: raw.isMainMast || subStops.length > 0
				? 'station'
				: 'stop',
			id: res.id,
			name: raw.name || lid.O
				? profile.parseStationName(ctx, raw.name || lid.O)
				: null,
			location: 'number' === typeof res.latitude
				? res
				: null, // todo: remove `.id`
		};
		if (opt.subStops && subStops.length > 0) {
			stop.stops = subStops;
		}

		if ('pCls' in raw) {
			stop.products = profile.parseProductsBitmask(ctx, raw.pCls);
		}
		if ('meta' in raw) {
			stop.isMeta = Boolean(raw.meta);
		}

		const mMastLoc = locL[mMastLocX];
		if (mMastLoc) {
			stop.station = {
				...profile.parseLocation(ctx, mMastLoc),
				type: 'station', // todo: this should be handled differently
			};
		}

		if (opt.entrances) {
			const entrances = (raw.entryLocL || [])
				.map(locX => locL[locX])
				.filter(loc => Boolean(loc))
				.map(loc => profile.parseLocation(ctx, loc))
				.filter(loc => Boolean(loc))
				.map(loc => loc.location);
			if (entrances.length > 0) {
				stop.entrances = entrances;
			}
		}

		if (opt.linesOfStops && Array.isArray(raw.lines)) {
			stop.lines = raw.lines;
		}

		const locHints = (raw.remarkRefs || [])
			.filter(ref => Boolean(ref.hint) && Array.isArray(ref.tagL))
			.filter(({tagL}) => tagL.includes('RES_LOC')
				|| tagL.find(t => t.slice(0, 8) === 'RES_LOC_'), // e.g. `RES_LOC_H3`
			)
			.map(ref => ref.hint);
		const hints = [
			...raw.hints || [],
			...locHints,
		];
		const byType = type => hints.find(h => h.type === type);

		const transitAuthority = (byType('transit-authority') || {}).text;
		if (transitAuthority) {
			stop.transitAuthority = transitAuthority;
		}

		const dhid = (byType('stop-dhid') || {}).text;
		if (dhid) {
			if (!stop.ids) {
				stop.ids = {};
			}
			stop.ids.dhid = dhid;
		}

		let ifoptId = null;
		// The old `raw.gidL?` scheme seems to be used with `ver` <= 1.46. The new `globalIdL` scheme seems to be used with `ver` >= 1.47.
		// todo: is type `A` really always an IFOPT?
		if (Array.isArray(raw.globalIdL)) {
			const _ifopt = raw.globalIdL.find(gId => gId.type === 'A') || null;
			if (_ifopt?.id) {
				ifoptId = _ifopt.id;
			}
		} else if (Array.isArray(raw.gidL)) {
			const _ifopt = raw.gidL
				.filter(gId => gId[0] === 'A')
				.map(gId => gId.split('×'))
				.find(([type]) => type === 'A')
				|| null;
			if (_ifopt?.[1]) {
				ifoptId = _ifopt[1];
			}
		}
		if (ifoptId) {
			if (!stop.ids) {
				stop.ids = {};
			}
			stop.ids.ifopt = ifoptId;
		}

		const otherIds = hints
			.filter(h => h.type === 'foreign-id')
			.filter(h => 'string' === typeof h.text && h.text.includes(':'))
			.map(({text}) => {
				const i = text.indexOf(':');
				return [text.slice(0, i), text.slice(i + 1)];
			})
			.filter(([src]) => src !== 'NULL');
		if (otherIds.length > 0) {
			if (!stop.ids) {
				stop.ids = {};
			}
			for (const [src, id] of otherIds) {
				stop.ids[src] = id;
			}
		}

		return stop;
	}

	if (raw.type === ADDRESS) {
		res.address = raw.name;
	} else {
		res.name = raw.name;
	}
	if (raw.type === POI) {
		res.poi = true;
	}

	return res;
};

// We use a "visited list" to prevent endless recursion.
// todo: can we use a WeakMap here?
const seen = Symbol('parseLocation seen items');
const parseLocationWithoutCycles = (ctx: Record<string, unknown>, l: Record<string, unknown>) => {
	const ctxAny = ctx as any;
	if (ctxAny[seen] && ctxAny[seen].includes(l)) {
		return null;
	}

	const newSeen = ctxAny[seen]
		? [...ctxAny[seen], l]
		: [l];
	return parseLocation({...ctx, [seen]: newSeen}, l);
};

export {
	parseLocationWithoutCycles as parseLocation,
};
