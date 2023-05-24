import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { initialState } from '~/services/history';
import { Middleware } from 'redux';
import { ICommonState } from './interfaces';
import { IMapyState } from '~/interfaces';
import { stateToActiveFeature } from './utils';

const commonSlice = createSlice({
	name: 'common',
	initialState: initialState.common as ICommonState,
	reducers: {
		setSidebarVisibility: (state: ICommonState, action: PayloadAction<ICommonState['sidebarVisible']>) => {
			state.sidebarVisible = action.payload;
		},
		setActiveFeature: (state: ICommonState, action: PayloadAction<ICommonState['activeFeature']>) => {
			state.activeFeature = action.payload;
		},
	},
});

// dle "duck" metodiky jsou akce pojmenovane exporty a reducer default export
export const { setSidebarVisibility, setActiveFeature } = commonSlice.actions;
export default commonSlice.reducer;

export const commonMiddleware: Middleware = store => next => action => {
	if (action.type !== 'setActiveFeature') {
		Promise.resolve().then(() => {
			const state: IMapyState = store.getState();
			const { activeFeature } = state.common;
			const newFeature = stateToActiveFeature(state);

			if (activeFeature !== newFeature) {
				store.dispatch(setActiveFeature(newFeature));
			}
		});
	}

	return next(action);
};
