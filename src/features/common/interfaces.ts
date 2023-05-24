export enum Feature {
	Search,
	Route,
	MyMaps,
	Distancemeter,
	Usermarks,
	Detail,
	Gallery,
	Timetable,
	Panorama,
	BirdsEye,
}

export interface ICommonState {
	// je sidebar (panel) viditelny? v budoucnu to vubec nebude ve stavu a URL, ale pro ted je to kvuli kompatibilite se stavajicim webem
	sidebarVisible: boolean;
	// ta aktivni vec, ktera je videt v sidebaru
	activeFeature: Feature;
}
