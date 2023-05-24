import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { initialState } from '~/services/history';
import { IMapState, IMapsetPayload, ICoordsPayload, IZoomPayload, IFitPayload } from './interfaces';

const mapSlice = createSlice({
	name: 'map',
	initialState: initialState.map as IMapState,
	reducers: {
		setCenter: (state: IMapState, action: PayloadAction<ICoordsPayload>) => {
			const { coords } = action.payload;

			if (coords.longitude !== state.coords.longitude || coords.latitude !== state.coords.latitude) {
				state.coords = coords;
			}
		},
		setZoom: (state: IMapState, action: PayloadAction<IZoomPayload>) => {
			const { zoom } = action.payload;

			if (zoom !== state.zoom) {
				state.zoom = zoom;
			}
		},
		setCenterZoom: (state: IMapState, action: PayloadAction<ICoordsPayload & IZoomPayload>) => {
			const { coords, zoom } = action.payload;

			if (coords.longitude !== state.coords.longitude || coords.latitude !== state.coords.latitude) {
				state.coords = coords;
			}

			if (zoom !== state.zoom) {
				state.zoom = zoom;
			}

			state.fit = [];
		},
		setMapset: (state: IMapState, action: PayloadAction<IMapsetPayload>) => {
			const { mapset } = action.payload;

			if (mapset !== state.mapset) {
				state.mapset = mapset;
			}
		},
		setFit: (state: IMapState, action: PayloadAction<IFitPayload>) => {
			const { fit } = action.payload;

			// bez ohledu na to, kolik jsme dostali souradnic, spocteme proste jen bounding box, tedy dve souradnice
			let minLatitude = Infinity;
			let minLongitude = Infinity;
			let maxLatitude = -Infinity;
			let maxLongitude = -Infinity;

			for (let index = 0, len = fit.length; index < len; index++) {
				const coords = fit[index];

				minLongitude = Math.min(coords.longitude, minLongitude);
				maxLongitude = Math.max(coords.longitude, maxLongitude);
				minLatitude = Math.min(coords.latitude, minLatitude);
				maxLatitude = Math.max(coords.latitude, maxLatitude);
			}

			state.fit = [{
				longitude: minLongitude,
				latitude: minLatitude,
			},
			{
				longitude: maxLongitude,
				latitude: maxLatitude,
			}];
		},
	},
});

// dle "duck" metodiky jsou akce pojmenovane exporty a reducer default export
export const { setCenter, setZoom, setCenterZoom, setMapset, setFit } = mapSlice.actions;
export default mapSlice.reducer;
