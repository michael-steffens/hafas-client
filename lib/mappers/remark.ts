import type {Hint, Warning, Remark} from '../../types/remark.js';
import type {HintDTO, WarningDTO, RemarkDTO} from '../../dto/remark.js';
import {toLineDTO} from './line.js';
import {toStationDTO} from './location.js';

export function toHintDTO(hint: Hint | null): HintDTO | null {
	if (!hint) {
		return null;
	}
	const result: HintDTO = {
		type: hint.type,
	};
	if (hint.code !== undefined) {
		result.code = hint.code;
	}
	if (hint.text) {
		result.text = hint.text;
	}
	if (hint.summary) {
		result.summary = hint.summary;
	}
	if (hint.tripId) {
		result.tripId = hint.tripId;
	}
	return result;
}

export function toWarningDTO(warning: Warning): WarningDTO {
	const result: WarningDTO = {
		id: warning.id,
		type: warning.type,
		summary: warning.summary,
		text: warning.text,
	};

	if (warning.priority !== undefined) {
		result.priority = warning.priority;
	}
	if (warning.products) {
		result.products = warning.products;
	}
	if (warning.company !== undefined) {
		result.company = warning.company;
	}
	if (warning.category !== undefined) {
		result.category = warning.category;
	}
	if (warning.categories) {
		result.categories = warning.categories;
	}
	if (warning.affectedLines) {
		result.affectedLines = warning.affectedLines.map(l => toLineDTO(l)).filter(Boolean) as WarningDTO['affectedLines'];
	}
	if (warning.fromStops) {
		result.fromStops = warning.fromStops.map(s => toStationDTO(s)).filter(Boolean) as WarningDTO['fromStops'];
	}
	if (warning.toStops) {
		result.toStops = warning.toStops.map(s => toStationDTO(s)).filter(Boolean) as WarningDTO['toStops'];
	}
	if (warning.validFrom) {
		result.validFrom = warning.validFrom;
	}
	if (warning.validUntil) {
		result.validUntil = warning.validUntil;
	}
	if (warning.modified) {
		result.modified = warning.modified;
	}

	return result;
}

export function toRemarkDTO(remark: Remark): RemarkDTO {
	if ('id' in remark) {
		return toWarningDTO(remark as Warning);
	}
	return toHintDTO(remark as Hint) as HintDTO;
}

export function toRemarksDTO(remarks: Remark[]): RemarkDTO[] {
	return remarks.map(r => toRemarkDTO(r));
}
