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

export interface Profile extends User {
	followersCount: number;
	isFollowing: boolean;
	color?: number;
	updatedAt?: string;
}

export interface Following {
	profiles: Profile[];
}

export interface IPresenceView {
	timestamp: number;
	user: User;
	track: Track;
}
