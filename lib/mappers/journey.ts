import type {Stopover} from '../../types/journey.js';
import type {JourneyLeg} from '../../types/journey.js';
import type {Journey} from '../../types/journey.js';
import type {FeatureCollection} from '../../types/journey.js';
import type {
	StopoverDTO,
	JourneyLegDTO,
	JourneyDTO,
	FeatureCollectionDTO,
} from '../../dto/journey.js';
import {toStationDTO} from './location.js';
import {toLineDTO} from './line.js';
import {toRemarksDTO} from './remark.js';

export function toStopoverDTO(stopover: Stopover): StopoverDTO {
	const result: StopoverDTO = {
		stop: toStationDTO(stopover.stop),
		arrival: stopover.arrival,
		plannedArrival: stopover.plannedArrival,
		arrivalDelay: stopover.arrivalDelay,
		arrivalPlatform: stopover.arrivalPlatform,
		arrivalPrognosisType: stopover.arrivalPrognosisType,
		plannedArrivalPlatform: stopover.plannedArrivalPlatform,
		departure: stopover.departure,
		plannedDeparture: stopover.plannedDeparture,
		departureDelay: stopover.departureDelay,
		departurePlatform: stopover.departurePlatform,
		departurePrognosisType: stopover.departurePrognosisType,
		plannedDeparturePlatform: stopover.plannedDeparturePlatform,
	};

	if (stopover.prognosedArrival !== undefined) {
		result.prognosedArrival = stopover.prognosedArrival;
	}
	if (stopover.prognosedArrivalPlatform !== undefined) {
		result.prognosedArrivalPlatform = stopover.prognosedArrivalPlatform;
	}
	if (stopover.prognosedDeparture !== undefined) {
		result.prognosedDeparture = stopover.prognosedDeparture;
	}
	if (stopover.prognosedDeparturePlatform !== undefined) {
		result.prognosedDeparturePlatform = stopover.prognosedDeparturePlatform;
	}
	if (stopover.passBy !== undefined) {
		result.passBy = stopover.passBy;
	}
	if (stopover.cancelled !== undefined) {
		result.cancelled = stopover.cancelled;
	}
	if (stopover.additional !== undefined) {
		result.additional = stopover.additional;
	}
	if (stopover.remarks) {
		result.remarks = toRemarksDTO(stopover.remarks);
	}

	return result;
}

export function toFeatureCollectionDTO(fc: FeatureCollection | null): FeatureCollectionDTO | null {
	if (!fc) {
		return null;
	}
	return {
		type: fc.type,
		features: fc.features.map(f => ({
			type: f.type,
			properties: f.properties,
			geometry: f.geometry,
		})),
	};
}

export function toJourneyLegDTO(leg: JourneyLeg): JourneyLegDTO {
	const result: JourneyLegDTO = {
		origin: toStationDTO(leg.origin),
		destination: toStationDTO(leg.destination),
		departure: leg.departure,
		plannedDeparture: leg.plannedDeparture,
		departureDelay: leg.departureDelay,
		arrival: leg.arrival,
		plannedArrival: leg.plannedArrival,
		arrivalDelay: leg.arrivalDelay,
	};

	if (leg.prognosedDeparture !== undefined) {
		result.prognosedDeparture = leg.prognosedDeparture;
	}
	if (leg.prognosedArrival !== undefined) {
		result.prognosedArrival = leg.prognosedArrival;
	}
	if (leg.tripId !== undefined) {
		result.tripId = leg.tripId;
	}
	if (leg.line !== undefined) {
		result.line = toLineDTO(leg.line);
	}
	if (leg.direction !== undefined) {
		result.direction = leg.direction;
	}
	if (leg.walking !== undefined) {
		result.walking = leg.walking;
	}
	if (leg.transfer !== undefined) {
		result.transfer = leg.transfer;
	}
	if (leg.checkin !== undefined) {
		result.checkin = leg.checkin;
	}
	if (leg.public !== undefined) {
		result.public = leg.public;
	}
	if (leg.distance !== undefined) {
		result.distance = leg.distance;
	}
	if (leg.reachable !== undefined) {
		result.reachable = leg.reachable;
	}
	if (leg.stopovers) {
		result.stopovers = leg.stopovers.map(s => toStopoverDTO(s));
	}
	if (leg.arrivalPlatform !== undefined) {
		result.arrivalPlatform = leg.arrivalPlatform;
	}
	if (leg.plannedArrivalPlatform !== undefined) {
		result.plannedArrivalPlatform = leg.plannedArrivalPlatform;
	}
	if (leg.prognosedArrivalPlatform !== undefined) {
		result.prognosedArrivalPlatform = leg.prognosedArrivalPlatform;
	}
	if (leg.arrivalPrognosisType !== undefined) {
		result.arrivalPrognosisType = leg.arrivalPrognosisType;
	}
	if (leg.departurePlatform !== undefined) {
		result.departurePlatform = leg.departurePlatform;
	}
	if (leg.plannedDeparturePlatform !== undefined) {
		result.plannedDeparturePlatform = leg.plannedDeparturePlatform;
	}
	if (leg.prognosedDeparturePlatform !== undefined) {
		result.prognosedDeparturePlatform = leg.prognosedDeparturePlatform;
	}
	if (leg.departurePrognosisType !== undefined) {
		result.departurePrognosisType = leg.departurePrognosisType;
	}
	if (leg.polyline !== undefined) {
		result.polyline = toFeatureCollectionDTO(leg.polyline);
	}
	if (leg.currentLocation !== undefined) {
		result.currentLocation = {
			latitude: leg.currentLocation.latitude,
			longitude: leg.currentLocation.longitude,
		};
	}
	if (leg.cancelled !== undefined) {
		result.cancelled = leg.cancelled;
	}
	if (leg.cycle !== undefined) {
		result.cycle = leg.cycle;
	}
	if (leg.alternatives) {
		result.alternatives = leg.alternatives.map(a => ({
			tripId: a.tripId,
			line: toLineDTO(a.line),
			direction: a.direction,
			when: a.when,
			plannedWhen: a.plannedWhen,
			delay: a.delay,
		}));
	}
	if (leg.remarks) {
		result.remarks = toRemarksDTO(leg.remarks);
	}
	if (leg.loadFactor !== undefined) {
		result.loadFactor = leg.loadFactor;
	}
	if (leg.price !== undefined) {
		result.price = leg.price;
	}
	if (leg.tickets !== undefined) {
		result.tickets = leg.tickets;
	}

	return result;
}

export function toJourneyDTO(journey: Journey): JourneyDTO {
	const result: JourneyDTO = {
		legs: journey.legs.map(l => toJourneyLegDTO(l)),
		refreshToken: journey.refreshToken,
	};

	if (journey.cycle !== undefined) {
		result.cycle = journey.cycle;
	}
	if (journey.remarks) {
		result.remarks = toRemarksDTO(journey.remarks);
	}
	if (journey.scheduledDays !== undefined) {
		result.scheduledDays = journey.scheduledDays;
	}
	if (journey.price !== undefined) {
		result.price = journey.price;
	}
	if (journey.tickets !== undefined) {
		result.tickets = journey.tickets;
	}

	return result;
}
