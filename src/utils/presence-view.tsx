import { Following, IPresenceView, Profile } from "../models/metadata";

export const maxViews: number = 20;
export const users = { l: "0ebkomu6egcchalwuwqrixbgk" };

export const getFollowing = (userId: string): Promise<Following> =>
	Spicetify.CosmosAsync.get(
		`https://spclient.wg.spotify.com/user-profile-view/v3/profile/${userId}/following?market=from_token`
	);

export const getPresenceViews = () =>
	Object.values(users).map((user) =>
		Spicetify.CosmosAsync.get(
			`https://spclient.wg.spotify.com/presence-view/v1/user/${user}`
		)
	);

export const storageKey = (
	userId: string
): { presence: string; following: string } => ({
	presence: `presence-view-${userId}`,
	following: `following-${userId}`,
});

export function getStoredPresenceViewsByUserId(
	userId: string
): IPresenceView[] {
	const data = localStorage.getItem(storageKey(userId).presence);
	if (!data) return [];

	const obj = JSON.parse(data);
	if (!obj?.length) return [];

	return obj;
}

export function getStoredFollowingByUserId(userId: string): Profile[] {
	const data = localStorage.getItem(storageKey(userId).following);
	if (!data) return [];

	const obj = JSON.parse(data);
	if (!obj?.length) return [];

	return obj;
}

export function alreadyIncludesPresenceView(
	userId: string,
	timestamp: number,
	trackUri: string,
	data: IPresenceView[] = getStoredPresenceViewsByUserId(userId)
) {
	if (!data) return false;

	return data.some(
		(item: any) =>
			item.timestamp === timestamp && item.track.uri === trackUri
	);
}

export function alreadyIncludesFollowing(
	userId: string,
	itemUri: string,
	data: any[] = getStoredFollowingByUserId(userId)
) {
	if (!data) return false;

	return data.some((item: any) => item.uri === itemUri);
}

export function removeDuplicates() {
	let views = getStoredPresenceViewsByUserId(users.l);
	let data: IPresenceView[] = [];
	views.forEach((view) =>
		!alreadyIncludesPresenceView(
			users.l,
			view.timestamp,
			view.track.uri,
			data
		)
			? data.push(view)
			: null
	);

	localStorage.setItem(
		storageKey(views[0].user.uri.split(":")[2]).presence,
		JSON.stringify(data)
	);
}

export async function fetchAndStorePresenceViews(): Promise<IPresenceView[]> {
	const results = await Promise.all(getPresenceViews());
	if (!results?.length) return [];

	let views: IPresenceView[] = [];

	results.forEach((item) => {
		if (item?.user?.uri) {
			const userId = item.user.uri.split(":")[2];
			storePresenceViewForUser(userId, item, views);
			console.log(`results for ${userId}: `, results);
		}
	});

	return views;
}

export function storePresenceViewForUser(
	userId: string,
	view: IPresenceView,
	views: IPresenceView[] = []
) {
	const data = getStoredPresenceViewsByUserId(userId);
	views = data;
	if (!alreadyIncludesPresenceView(userId, view.timestamp, view.track.uri)) {
		views = [...data, view];
		localStorage.setItem(
			storageKey(userId).presence,
			JSON.stringify([...data, view])
		);
	}

	return views;
}

export async function fetchAndStoreFollowing(): Promise<Profile[]> {
	const { profiles: profile } = await getFollowing(users.l);
	if (!profile?.length) return [];

	let views: Profile[] = [];
	const userId = users.l;
	const data = getStoredFollowingByUserId(userId);
	views = data;

	profile.forEach((item) => {
		const withDate = { ...item, updatedAt: new Date().toISOString() };
		if (!alreadyIncludesFollowing(userId, item.uri, data)) {
			views.push(withDate);
		}
	});

	localStorage.setItem(
		storageKey(userId).following,
		JSON.stringify([...views])
	);
	console.log(`results for ${userId}: `, profile?.length);

	return views;
}

export class PresenceViewHandler {
	public currentViews: IPresenceView[] = [];

	constructor() {
		const views = this.getStoredViews();
		this.currentViews = views.slice(0, maxViews);
	}

	public getStoredViews() {
		return getStoredPresenceViewsByUserId(users.l).sort(
			(a, b) => b.timestamp - a.timestamp
		);
	}
}
