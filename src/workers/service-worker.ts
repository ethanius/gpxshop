import { createHandlerBoundToURL, precacheAndRoute } from 'workbox-precaching';
import { NavigationRoute, registerRoute } from 'workbox-routing';

// @ts-ignore
precacheAndRoute(self.__WB_MANIFEST, {
	// Ignore all URL parameters.
	ignoreURLParametersMatching: [/.*/u],
});

const handler = createHandlerBoundToURL('/index.html');
const navigationRoute = new NavigationRoute(handler);

registerRoute(navigationRoute);
