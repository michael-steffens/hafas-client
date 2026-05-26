import type {Line, Operator} from '../../types/line.js';
import type {LineDTO, OperatorDTO} from '../../dto/line.js';

export function toOperatorDTO(operator: Operator | undefined): OperatorDTO | undefined {
	if (!operator) {
		return undefined;
	}
	return {
		id: operator.id,
		name: operator.name,
	};
}

export function toLineDTO(line: Line | null | undefined): LineDTO | null {
	if (!line) {
		return null;
	}

	const result: LineDTO = {
		id: line.id,
		name: line.name,
		product: line.product,
		mode: line.mode,
		public: line.public,
	};

	if (line.operator) {
		result.operator = toOperatorDTO(line.operator);
	}
	if (line.productName) {
		result.productName = line.productName;
	}
	if (line.additionalName) {
		result.additionalName = line.additionalName;
	}

	return result;
}
