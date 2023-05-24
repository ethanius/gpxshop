import { IMapyState } from '~/interfaces';
import { EMPTY_DETAIL } from '~/features/detail/constants';
import { Feature } from './interfaces';

export function stateToActiveFeature(state: IMapyState): Feature {
	if (state.detail.source !== EMPTY_DETAIL.source && state.detail.id !== EMPTY_DETAIL.id) {
		return Feature.Detail;
	}

	return Feature.Search;
}
