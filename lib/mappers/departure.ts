import type {Departure, Arrival} from '../../types/departure.js';
import type {DepartureDTO, ArrivalDTO} from '../../dto/departure.js';
import {toStationDTO} from './location.js';
import {toLineDTO} from './line.js';
import {toRemarksDTO} from './remark.js';
import {toStopoverDTO} from './journey.js';

export function toDepartureDTO(dep: Departure): DepartureDTO {
	const result: DepartureDTO = {
		tripId: dep.tripId,
		stop: toStationDTO(dep.stop),
		when: dep.when,
		plannedWhen: dep.plannedWhen,
		delay: dep.delay,
		platform: dep.platform,
		plannedPlatform: dep.plannedPlatform,
		prognosisType: dep.prognosisType,
		direction: dep.direction,
		line: toLineDTO(dep.line),
		remarks: toRemarksDTO(dep.remarks),
	};

	if (dep.prognosedWhen !== undefined) {
		result.prognosedWhen = dep.prognosedWhen;
	}
	if (dep.prognosedPlatform !== undefined) {
		result.prognosedPlatform = dep.prognosedPlatform;
	}
	if (dep.origin !== undefined) {
		result.origin = toStationDTO(dep.origin);
	}
	if (dep.destination !== undefined) {
		result.destination = toStationDTO(dep.destination);
	}
	if (dep.currentTripPosition !== undefined) {
		result.currentTripPosition = {
			latitude: dep.currentTripPosition.latitude,
			longitude: dep.currentTripPosition.longitude,
		};
	}
	if (dep.cancelled !== undefined || dep.canceled !== undefined) {
		result.cancelled = dep.cancelled || dep.canceled || false;
	}
	if (dep.nextStopovers) {
		result.nextStopovers = dep.nextStopovers.map(s => toStopoverDTO(s));
	}
	if (dep.loadFactor !== undefined) {
		result.loadFactor = dep.loadFactor;
	}
	if (dep.occupancy !== undefined) {
		result.occupancy = dep.occupancy;
	}

	return result;
}

export function toArrivalDTO(arr: Arrival): ArrivalDTO {
	const result: ArrivalDTO = {
		tripId: arr.tripId,
		stop: toStationDTO(arr.stop),
		when: arr.when,
		plannedWhen: arr.plannedWhen,
		delay: arr.delay,
		platform: arr.platform,
		plannedPlatform: arr.plannedPlatform,
		prognosisType: arr.prognosisType,
		provenance: arr.provenance,
		line: toLineDTO(arr.line),
		remarks: toRemarksDTO(arr.remarks),
	};

	if (arr.prognosedWhen !== undefined) {
		result.prognosedWhen = arr.prognosedWhen;
	}
	if (arr.prognosedPlatform !== undefined) {
		result.prognosedPlatform = arr.prognosedPlatform;
	}
	if (arr.origin !== undefined) {
		result.origin = toStationDTO(arr.origin);
	}
	if (arr.destination !== undefined) {
		result.destination = toStationDTO(arr.destination);
	}
	if (arr.currentTripPosition !== undefined) {
		result.currentTripPosition = {
			latitude: arr.currentTripPosition.latitude,
			longitude: arr.currentTripPosition.longitude,
		};
	}
	if (arr.cancelled !== undefined || arr.canceled !== undefined) {
		result.cancelled = arr.cancelled || arr.canceled || false;
	}
	if (arr.previousStopovers) {
		result.previousStopovers = arr.previousStopovers.map(s => toStopoverDTO(s));
	}
	if (arr.loadFactor !== undefined) {
		result.loadFactor = arr.loadFactor;
	}
	if (arr.occupancy !== undefined) {
		result.occupancy = arr.occupancy;
	}

	return result;
}
