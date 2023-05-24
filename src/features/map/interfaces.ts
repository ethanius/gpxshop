import { IHistoryPayload } from '~/services/history';

export interface ICoords {
	// x
	longitude: number;
	// y
	latitude: number;
	// vyska
	altitude?: number;
}

export interface IMapState {
	// aktivni mapset
	mapset: string;
	// souradnice stredu mapy
	coords: ICoords;
	// priblizeni mapy
	zoom: number;
	// pole souradnic, na ktere se ma vycentrovat a zazoomovat mapa
	fit: Array<ICoords>;
}

export interface IMapset {
	id: number;
	title: string;
	sourcesDown: Array<string>;
	sourcesUp: Array<string>;
	minZoom: number;
	maxZoom: number;
}

export interface IMapsetPayload {
	mapset: string;
}

export interface ICoordsPayload extends IHistoryPayload {
	coords: ICoords;
}

export interface IZoomPayload {
	zoom: number;
}

export interface IFitPayload extends IHistoryPayload {
	fit: Array<ICoords>;
}

export enum MARKER {
	POI = 'poi',
	PAID = 'paid',
	DETAIL = 'detail',
	SEARCH = 'search',
}
