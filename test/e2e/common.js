import tap from 'tap';

import {createClient} from '../../dist/index.js';
import {profile as vbbProfile} from '../../dist/p/vbb/index.js';

const client = createClient(vbbProfile, 'public-transport/hafas-client:test');

tap.test('exposes the profile', (t) => {
	t.ok(client.profile);
	t.equal(client.profile.endpoint, vbbProfile.endpoint);
	t.end();
});
