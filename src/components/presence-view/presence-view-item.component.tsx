import React from "react";
import { IPresenceView } from "../../models/metadata";
import styles from "./presence-view-item.module.scss";

export default function PresenceViewItem({ view }: { view: IPresenceView }) {
	if (!view) return null;

	const time = new Date(view.timestamp);

	return (
		<div className={styles.itemWrapper}>
			<div className={styles.itemContainer}>
				<div className={styles.trackContainer}>
					<a title={view.track.name} href={view.track.uri}>
						<span>{view.track.name}</span>
					</a>
					<span> • </span>
					<a
						title={view.track.artist.name}
						href={view.track.artist.uri}
					>
						<span>{view.track.artist.name}</span>
					</a>
					<a
						title={view.track.album.name}
						href={view.track.album.uri}
					>
						<span>{"( " + view.track.album.name + " )"}</span>
					</a>
				</div>
				<div className={styles.misc}>
					<svg
						data-encore-id="icon"
						role="img"
						aria-hidden="true"
						className="Svg-sc-ytk21e-0 Svg-img-icon-small egK4lu76sYvMmma40Vng"
						viewBox="0 0 16 16"
					>
						<path d="M4 1h11v11.75A2.75 2.75 0 1 1 12.25 10h1.25V2.5h-8v10.25A2.75 2.75 0 1 1 2.75 10H4V1zm0 10.5H2.75A1.25 1.25 0 1 0 4 12.75V11.5zm9.5 0h-1.25a1.25 1.25 0 1 0 1.25 1.25V11.5z"></path>
					</svg>
					<a
						title={view.track.context.name}
						href={view.track.context.uri}
					>
						<span>{view.track.context.name}</span>
					</a>
				</div>
			</div>
			<span className={styles.timeLabel}>
				{time.toLocaleString("sv")}
			</span>
		</div>
	);
}
