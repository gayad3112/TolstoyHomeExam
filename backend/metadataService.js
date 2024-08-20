import urlMetadata from'url-metadata';

const fetchMetadata = async (urls) => {
  try {
    const metadataPromises = urls.map(url => urlMetadata(url));
    const metadataList = await Promise.all(metadataPromises);
    return metadataList;
  } catch (err) {
    console.error(err);
    throw new Error('Error fetching metadata');
  }
};

export default fetchMetadata;
