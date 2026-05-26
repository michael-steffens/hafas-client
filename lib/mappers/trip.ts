import type {Trip, Movement} from '../../types/trip.js';
import type {TripDTO, MovementDTO} from '../../dto/trip.js';
import {toStationDTO} from './location.js';
import {toLineDTO} from './line.js';
import {toStopoverDTO, toFeatureCollectionDTO} from './journey.js';

export function toTripDTO(trip: Trip): TripDTO {
	const result: TripDTO = {
		id: trip.id,
		origin: toStationDTO(trip.origin),
		destination: toStationDTO(trip.destination),
		departure: trip.departure,
		plannedDeparture: trip.plannedDeparture,
		departureDelay: trip.departureDelay,
		arrival: trip.arrival,
		plannedArrival: trip.plannedArrival,
		arrivalDelay: trip.arrivalDelay,
	};

	if (trip.line !== undefined) {
		result.line = toLineDTO(trip.line);
	}
	if (trip.direction !== undefined) {
		result.direction = trip.direction;
	}
	if (trip.stopovers) {
		result.stopovers = trip.stopovers.map(s => toStopoverDTO(s));
	}
	if (trip.scheduledDays !== undefined) {
		result.scheduledDays = trip.scheduledDays;
	}
	if (trip.cancelled !== undefined || trip.canceled !== undefined) {
		result.cancelled = trip.cancelled || trip.canceled || false;
	}

	return result;
}

export function toMovementDTO(movement: Movement): MovementDTO {
	const result: MovementDTO = {
		direction: movement.direction,
		tripId: movement.tripId,
		line: toLineDTO(movement.line),
		location: movement.location
			? {latitude: movement.location.latitude, longitude: movement.location.longitude}
			: null,
		nextStopovers: movement.nextStopovers.map(s => toStopoverDTO(s)),
		frames: movement.frames.map(f => ({
			origin: toStationDTO(f.origin),
			destination: toStationDTO(f.destination),
			t: f.t,
		})),
	};

	if (movement.polyline !== undefined) {
		result.polyline = toFeatureCollectionDTO(movement.polyline);
	}

	return result;
}
