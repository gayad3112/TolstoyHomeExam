
import {it, describe} from 'node:test'
import assert from 'node:assert';
import fetchMetadata from '../metadataService.js';


it('should return same amount of metadata per url', async () => {
  const urls = ['https://www.gotolstoy.com/','https://www.gotolstoy.com/shoppable-video','https://www.gotolstoy.com/a/blog']
  const metadata = await fetchMetadata(urls);
  assert(urls.length === metadata.length, 'metadatalist length does not equel to urls list length');
});