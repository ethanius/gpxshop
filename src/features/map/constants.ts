import { API_KEY } from '~/.env';
import { IMapState, IMapset } from './interfaces';

export const MAPSET_BASE = 'zakladni';
export const MAPSET_TURIST = 'turisticka';
export const MAPSET_OPHOTO = 'letecka';
export const MAPSET_TRAFFIC = 'dopravni';
export const MAPSET_WINTER = 'zimni';

interface ISource {
	type: string;
	tiles: Array<string>;
	tileSize: number;
}

export const SOURCES: {
	[key: string]: ISource;
} = {
	base: {
		type: 'raster',
		tiles: [`https://api.mapy.cz/v1/maptiles/basic/256@2x/{z}/{x}/{y}?apikey=${API_KEY}`],
		tileSize: 256,
	},
	turist: {
		type: 'raster',
		tiles: [`https://api.mapy.cz/v1/maptiles/outdoor/256@2x/{z}/{x}/{y}?apikey=${API_KEY}`],
		tileSize: 256,
	},
	winter: {
		type: 'raster',
		tiles: [`https://api.mapy.cz/v1/maptiles/winter/256@2x/{z}/{x}/{y}?apikey=${API_KEY}`],
		tileSize: 256,
	},
	bing: {
		type: 'raster',
		tiles: [`https://api.mapy.cz/v1/maptiles/aerial/256/{z}/{x}/{y}?apikey=${API_KEY}`],
		tileSize: 256,
	},
	hybridSparse: {
		type: 'raster',
		tiles: ['https://mapserver.mapy.cz/hybrid-sparse-m/{z}-{x}-{y}'],
		tileSize: 256,
	},
	trafficDown: {
		type: 'raster',
		tiles: ['https://mapserver.mapy.cz/base-m-traf-down/{z}-{x}-{y}?s=0.2&dm=Luminosity'],
		tileSize: 256,
	},
	trafficUp: {
		type: 'raster',
		tiles: ['https://mapserver.mapy.cz/base-m-traf-up/{z}-{x}-{y}?s=0.2&dm=Luminosity'],
		tileSize: 256,
	},
	winterDown: {
		type: 'raster',
		tiles: [`https://mapserver.mapy.cz/winter-m-down/{z}-{x}-{y}`],
		tileSize: 256,
	},
	winterUp: {
		type: 'raster',
		tiles: [`https://mapserver.mapy.cz/winter-m-up/{z}-{x}-{y}`],
		tileSize: 256,
	},
	terrain: {
		type: 'raster-dem',
		tiles: [`https://mapserver.mapy.cz/terrain/{z}-{x}-{y}`],
		tileSize: 256,
	},
};

export const MAPSETS: {[key: string]: IMapset} = {
	[MAPSET_BASE]: {
		id: 1,
		title: 'Základní',
		sourcesDown: ['base'],
		sourcesUp: [],
		minZoom: 2,
		maxZoom: 19,
	},
	[MAPSET_TURIST]: {
		id: 3,
		title: 'Turistická',
		sourcesDown: ['turist'],
		sourcesUp: [],
		minZoom: 2,
		maxZoom: 19,
	},
	[MAPSET_OPHOTO]: {
		id: 2,
		title: 'Letecká',
		sourcesDown: ['bing', 'hybridSparse', 'winterUp'],
		sourcesUp: [],
		minZoom: 2,
		maxZoom: 19,
	},
	[MAPSET_TRAFFIC]: {
		id: 21,
		title: 'Dopravní',
		sourcesDown: ['trafficDown'],
		sourcesUp: ['trafficUp'],
		minZoom: 2,
		maxZoom: 19,
	},
	[MAPSET_WINTER]: {
		id: 7,
		title: 'Zimní',
		sourcesDown: ['winterDown'],
		sourcesUp: ['winterUp'],
		minZoom: 2,
		maxZoom: 19,
	},
};

export const DEFAULT_MAP_STATE: IMapState = {
	mapset: MAPSET_BASE,
	coords: {
		longitude: 14.2289203,
		latitude: 50.0167807,
	},
	zoom: 15,
	fit: [],
};
