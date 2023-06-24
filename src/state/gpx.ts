export type TFixType = 'none' | '2d' | '3d' | 'dgps' | 'pps';

export type TDGPXStationType = number; // 0 <= value <= 1023

export type TDegreesType = number; // 0.0 <= value < 360.0

export type TLongitudeType = number; // -180.0 <= value < 180.0

export type TLatitudeType = number; // -90.0 <= value <= 90.0

export type TDateTime = string; // YYYY-MM-DDThh:mm:ss

export type TGYear = string; // ISO 8601 year

export type TNonNegativeInteger = number; // value >= 0

export interface IBoundsType {
	minlat: TLatitudeType;
	minlon: TLongitudeType;
	maxlat: TLatitudeType;
	maxlon: TLongitudeType;
}

export interface IEMailType {
	id: string;
	domain: string;
}

export interface ICopyrightType {
	author: string;
	year?: TGYear;
	license?: string;
}

export interface ILinkType {
	href: string;
	text?: string;
	type?: string;
}

export interface IPersonType {
	name?: string;
	email?: IEMailType;
	link?: ILinkType;
}

export interface IPTType {
	lat: TLatitudeType;
	lon: TLongitudeType;
	ele?: number;
	time?: TDateTime;
}

export interface IPTSegType {
	pts: Array<IPTType>;
}

export interface IExtensionsType {
	[key: string]: any;
}

export interface IWPTType {
	lat: TLatitudeType;
	lon: TLongitudeType;
	ele?: number;
	time?: TDateTime;
	magvar?: TDegreesType;
	geoidheight?: number;
	name?: string;
	cmt?: string;
	desc?: string;
	src?: string;
	links?: Array<ILinkType>;
	sym?: string;
	type?: string;
	fix?: TFixType;
	sat?: TNonNegativeInteger;
	hdop?: number;
	vdop?: number;
	pdop?: number;
	ageofdgpsdata?: number;
	dgpsid?: TDGPXStationType;
	extensions?: IExtensionsType;
}

export interface ITrkSegType {
	trkpts: Array<IWPTType>;
	extensions?: IExtensionsType;
}

export interface ITrkType {
	name?: string;
	cmt?: string;
	desc?: string;
	src?: string;
	links?: Array<ILinkType>;
	number?: TNonNegativeInteger;
	type?: string;
	extensions?: IExtensionsType;
	trksegs?: Array<ITrkSegType>;
}

export interface IRteType {
	name?: string;
	cmt?: string;
	desc?: string;
	src?: string;
	links?: Array<ILinkType>;
	number?: TNonNegativeInteger;
	type?: string;
	extensions?: IExtensionsType;
	rtepts?: Array<IWPTType>;
}

export interface IMetadataType {
	name?: string;
	desc?: string;
	author?: IPersonType;
	copyright?: ICopyrightType;
	links?: Array<ILinkType>;
	time?: TDateTime;
	keywords?: string;
	bounds?: IBoundsType;
	extensions?: IExtensionsType;
}

export interface IGPXType {
	version: '1.1';
	creator: string;
	metadata?: IMetadataType;
	wpts?: Array<IWPTType>;
	rtes?: Array<IRteType>;
	trks?: Array<ITrkType>;
	extensions?: IExtensionsType;
}
