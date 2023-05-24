import { ICommonState, Feature } from './interfaces';

/**
 * @constant
 * Default state of the common part of the Redux store.
 */
export const DEFAULT_COMMON_STATE: ICommonState = {
	sidebarVisible: true,
	activeFeature: Feature.Search,
};
