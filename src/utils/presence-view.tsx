import { IPresenceView } from "../models/metadata";

export const users = { l: "0ebkomu6egcchalwuwqrixbgk" };

export const getPresenceViews = () =>
	Object.values(users).map((user) =>
		Spicetify.CosmosAsync.get(
			`https://spclient.wg.spotify.com/presence-view/v1/user/${user}`
		)
	);

export const storageKey = (userId: string): string => `presence-view-${userId}`;

export function getStoredPresenceViewsByUserId(userId: string) {
	const data = localStorage.getItem(storageKey(userId));
	if (!data) return [];

	const obj = JSON.parse(data);
	if (!obj?.length) return [];

	return obj;
}

export function alreadyIncludesPresenceView(
	userId: string,
	timestamp: number,
	trackUri: string
) {
	const data = getStoredPresenceViewsByUserId(userId);
	if (!data) return false;

	return data.some(
		(item: any) =>
			item.timestamp === timestamp && item.track.uri === trackUri
	);
}

export async function fetchAndStorePresenceViews() {
	const results = await Promise.all(getPresenceViews());
	if (!results?.length) return;

	results.forEach((item) => {
		const userId = item.user.uri.split(":")[2];
		const data = getStoredPresenceViewsByUserId(userId);
		if (
			!alreadyIncludesPresenceView(userId, item.timestamp, item.track.uri)
		)
			localStorage.setItem(
				storageKey(userId),
				JSON.stringify([...data, item])
			);
		console.log(`results for ${userId}: `, results);
	});
}

export class PresenceViewHandler {
	public currentViews: IPresenceView[] = [];

	constructor() {
		this.currentViews = this.getStoredViews();
	}

	public getStoredViews() {
		return getStoredPresenceViewsByUserId(users.l);
	}
}
