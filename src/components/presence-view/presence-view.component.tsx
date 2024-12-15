import React from "react";
import { IPresenceView, User } from "../../models/metadata";
import PresenceViewItem from "./presence-view-item.component";
import styles from "./presence-view.module.scss";

export default function PresenceView({ views }: { views: IPresenceView[] }) {
	if (!views?.length) return null;

	const user = views[0].user;

	const items = views
		.sort((a, b) => b.timestamp - a.timestamp)
		.map((view) => <PresenceViewItem view={view} />);

	return (
		<div className={styles.pvWrapper}>
			<div className={styles.userContainer}>
				<img
					onClick={() => showPicture(user)}
					src={user.imageUrl}
					alt=""
				/>
				<a title={user.name} href={user.uri}>
					<span>{user.name}</span>
				</a>
			</div>
			{items}
		</div>
	);
}

function imageElement(url: string, title: string): Element {
	const image = document.createElement("img");
	image.src = url.replace("3b82", "ee85");
	image.title = title;
	image.className = "user-image";
	return image;
}

function showPicture(user: User) {
	Spicetify.PopupModal.display({
		title: user.name,
		content: imageElement(user.imageUrl, user.name),
	});
}
