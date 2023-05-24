import React, { Suspense, lazy } from 'react';
import Sidebar from '~/components/Sidebar';
import SidebarToggle from '~/components/SidebarToggle';
import DevControls from '~/components/DevControls';
import DevState from '~/components/DevState';
import { useSelector } from 'react-redux';
import { Feature } from '~/features/common/interfaces';
import Detail from '~/components/Detail';
import { activeFeatureSelector } from './helpers/selectors';

const LazyMapLibre = lazy(() => import('~/components/MapLibre' /* webpackChunkName: "maplibre" */));

export default function App() {
	const { activeFeature } = useSelector(activeFeatureSelector);

	return <div>
		<Suspense fallback={<div>Loading...</div>}>
			<LazyMapLibre />
		</Suspense>
		<Sidebar>
			<DevControls />
			<DevState />
			{activeFeature === Feature.Detail ? <Detail /> : null}
		</Sidebar>
		<SidebarToggle />
	</div>;
}
