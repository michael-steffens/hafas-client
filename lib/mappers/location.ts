import type {Station, Address, POI, Coordinates} from '../../types/location.js';
import type {
	StationDTO,
	AddressDTO,
	POIDTO,
	CoordinatesDTO,
	ParsedLocationDTO,
} from '../../dto/location.js';

export function toStationDTO(station: Station | null): StationDTO | null {
	if (!station) {
		return null;
	}

	const result: StationDTO = {
		id: station.id,
		latitude: station.latitude,
		longitude: station.longitude,
		name: station.name,
		type: station.type,
	};

	if (station.stops) {
		result.stops = station.stops.map(s => toStationDTO(s)).filter(Boolean) as StationDTO[];
	}
	if (station.entrances) {
		result.entrances = station.entrances.map(c => toCoordinatesDTO(c));
	}
	if (station.products) {
		result.products = station.products;
	}
	if (station.ids) {
		result.ids = station.ids;
	}
	if (station.transitAuthority) {
		result.transitAuthority = station.transitAuthority;
	}
	if (station.facilities) {
		result.facilities = station.facilities;
	}
	if (station.isMeta) {
		result.isMeta = station.isMeta;
	}
	if (station.station) {
		const mapped = toStationDTO(station.station);
		if (mapped) {
			result.station = mapped;
		}
	}
	if (station.grids) {
		result.grids = station.grids;
	}
	if (station.reisezentrumOpeningHours) {
		result.reisezentrumOpeningHours = station.reisezentrumOpeningHours;
	}

	return result;
}

export function toAddressDTO(address: Address | null): AddressDTO | null {
	if (!address) {
		return null;
	}
	return {
		id: address.id,
		latitude: address.latitude,
		longitude: address.longitude,
		address: address.address,
	};
}

export function toPOIDTO(poi: POI | null): POIDTO | null {
	if (!poi) {
		return null;
	}
	return {
		id: poi.id,
		latitude: poi.latitude,
		longitude: poi.longitude,
		name: poi.name,
	};
}

export function toCoordinatesDTO(coord: Coordinates): CoordinatesDTO {
	return {
		latitude: coord.latitude,
		longitude: coord.longitude,
	};
}

export function toLocationDTO(location: Station | Address | POI | Coordinates | null): ParsedLocationDTO {
	if (!location) {
		return null;
	}

	if ('address' in location) {
		return toAddressDTO(location as Address);
	}
	if ('poi' in location && (location as POI).poi) {
		return toPOIDTO(location as POI);
	}
	if ('type' in location && (location.type === 'station' || location.type === 'stop')) {
		return toStationDTO(location as Station);
	}

	return toCoordinatesDTO(location as Coordinates);
}
