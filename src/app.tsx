import React from "react";
import PresenceView from "./components/presence-view/presence-view.component";
import styles from "./css/app.module.scss";
import { IPresenceView } from "./models/metadata";
import {
	fetchAndStorePresenceViews,
	PresenceViewHandler,
} from "./utils/presence-view";

class App extends React.Component<
	{},
	{ count: number; views: IPresenceView[] }
> {
	state = {
		count: 0,
		views: [] as IPresenceView[],
	};

	viewHandler: PresenceViewHandler = new PresenceViewHandler();

	stopConfettiTimeout: NodeJS.Timeout | null = null;

	componentDidMount(): void {
		this.setState((state) => {
			return {
				views: this.viewHandler.currentViews,
			};
		});
	}

	onButtonClick = () => {
		fetchAndStorePresenceViews();
	};

	render() {
		return (
			<>
				<div className={styles.container}>
					<div className={styles.title}>{"DevMikan Utilities"}</div>
					<div>
						<div className={styles.pvHeader}>
							<h4>Presence Views</h4>
							<button
								className={styles.button}
								onClick={this.onButtonClick}
							>
								<svg
									height="24px"
									width="24px"
									version="1.1"
									id="Layer_1"
									viewBox="0 0 329.028 329.028"
								>
									<g
										id="SVGRepo_bgCarrier"
										stroke-width="0"
									></g>
									<g
										id="SVGRepo_tracerCarrier"
										stroke-linecap="round"
										stroke-linejoin="round"
									></g>
									<g id="SVGRepo_iconCarrier">
										{" "}
										<path
											id="XMLID_13_"
											d="M241.852,72.459l10.847-54.533c1.184-5.95-1.334-12.028-6.378-15.398c-5.045-3.37-11.623-3.37-16.667,0 L156.182,51.62c-0.004,0.003-0.008,0.006-0.012,0.009c-0.415,0.278-0.817,0.576-1.201,0.893c-0.219,0.181-0.418,0.377-0.625,0.568 c-0.148,0.137-0.304,0.265-0.447,0.408c-0.249,0.25-0.478,0.514-0.707,0.778c-0.088,0.101-0.183,0.196-0.268,0.299 c-0.208,0.253-0.396,0.519-0.586,0.783c-0.095,0.132-0.197,0.259-0.288,0.394c-0.155,0.232-0.292,0.473-0.433,0.712 c-0.109,0.185-0.225,0.365-0.327,0.554c-0.104,0.195-0.192,0.397-0.288,0.597c-0.118,0.245-0.24,0.487-0.344,0.739 c-0.064,0.156-0.115,0.317-0.174,0.475c-0.112,0.299-0.227,0.598-0.32,0.906c-0.042,0.137-0.069,0.276-0.106,0.414 c-0.09,0.329-0.181,0.658-0.248,0.996c-0.045,0.223-0.068,0.45-0.103,0.675c-0.038,0.252-0.088,0.501-0.113,0.758 c-0.051,0.498-0.075,0.998-0.076,1.5c0,0.004-0.001,0.009-0.001,0.013c0,0.058,0.008,0.113,0.009,0.17 c0.004,0.437,0.023,0.874,0.066,1.311c0.016,0.156,0.045,0.307,0.065,0.461c0.043,0.332,0.086,0.664,0.151,0.994 c0.042,0.212,0.102,0.418,0.152,0.627c0.064,0.264,0.124,0.529,0.204,0.791c0.077,0.256,0.173,0.503,0.264,0.753 c0.076,0.208,0.143,0.418,0.229,0.624c0.126,0.305,0.272,0.598,0.418,0.892c0.072,0.146,0.134,0.295,0.211,0.438 c0.203,0.379,0.426,0.745,0.66,1.104c0.036,0.055,0.064,0.113,0.1,0.167l0.019,0.028c0.01,0.015,0.02,0.03,0.03,0.045l49.044,73.401 c2.817,4.217,7.525,6.667,12.47,6.667c0.971,0,1.952-0.094,2.928-0.288c5.951-1.184,10.602-5.835,11.786-11.786l7.052-35.455 c23.901,20.188,39.11,50.36,39.11,84.023c0,60.636-49.331,109.968-109.967,109.968c-60.637,0-109.969-49.332-109.969-109.968 c0-40.179,21.91-77.153,57.179-96.494c7.264-3.983,9.923-13.101,5.94-20.365c-3.983-7.264-13.101-9.924-20.365-5.94 C52.424,90.871,24.546,137.924,24.546,189.06c0,77.178,62.79,139.968,139.969,139.968c77.178,0,139.967-62.79,139.967-139.968 C304.482,140.453,279.571,97.56,241.852,72.459z"
										></path>{" "}
									</g>
								</svg>
							</button>
						</div>
						<div>
							<PresenceView views={this.state.views} />
						</div>
					</div>
				</div>
			</>
		);
	}
}

export default App;
