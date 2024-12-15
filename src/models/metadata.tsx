export interface MetaData {
	uri: string;
	name: string;
}

export interface User extends MetaData {
	imageUrl: string;
}

export interface Album extends MetaData {}

export interface Artist extends MetaData {}

export interface Context extends MetaData {
	index: number;
}

export interface Track extends MetaData {
	imageUrl: string;
	album: Album;
	artist: Artist;
	context: Context;
}

export interface IPresenceView {
	timestamp: number;
	user: User;
	track: Track;
}
