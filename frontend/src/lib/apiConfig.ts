const apiUrl = 'http://localhost:3000/api';

export const apiEndpoints = {
  collections: `${apiUrl}/collections`,
  collectionVideos: (collectionId: string) =>
    `${apiUrl}/collections/${collectionId}/videos`,
  collectionVideoIds: (collectionId: string) =>
    `${apiUrl}/collections/${collectionId}/videoIds`,
  searchCollections: (userQuery: string) =>
    `${apiUrl}/collections/search/${userQuery}`,

  videos: `${apiUrl}/videos`,
  videoDetails: (videoId: string) => `${apiUrl}/videos/${videoId}`,
  searchCollectionVideos: (collectionId: string, userQuery: string) =>
    `${apiUrl}/videos/search-collection/${userQuery}/${collectionId}`,
  searchAllVideos: (userQuery: string) =>
    `${apiUrl}/videos/search-all/${userQuery}`,

  register: `${apiUrl}/auth/register`,
  login: `${apiUrl}/auth/login`,
  logout: `${apiUrl}/auth/logout`,
  authenticate: `${apiUrl}/auth/authenticate`,

  videoChat: `${apiUrl}/chat/collections`,
  collectionChat: `${apiUrl}/chat/videos`,
  knoweldgeBaseChat: `${apiUrl}/chat/knowledge-base`,
};
