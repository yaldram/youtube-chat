// Generated by Xata Codegen 0.28.3. Please do not edit.
import { buildClient } from '@xata.io/client';
import type {
  BaseClientOptions,
  SchemaInference,
  XataRecord,
} from '@xata.io/client';

const tables = [
  {
    name: 'collections',
    columns: [
      {
        name: 'title',
        type: 'string',
        notNull: true,
        defaultValue: 'Dummy title',
      },
      { name: 'userId', type: 'link', link: { table: 'users' } },
    ],
    revLinks: [{ column: 'collectionId', table: 'collectionvideos' }],
  },
  {
    name: 'videos',
    columns: [
      {
        name: 'url',
        type: 'string',
        notNull: true,
        defaultValue: 'default url',
      },
      { name: 'title', type: 'string' },
      { name: 'author', type: 'string' },
      { name: 'length', type: 'int' },
      { name: 'description', type: 'text' },
      { name: 'thumbnailUrl', type: 'string' },
      { name: 'transcript', type: 'file', file: { defaultPublicAccess: true } },
      { name: 'youtubeId', type: 'string' },
      {
        name: 'chatEnabled',
        type: 'bool',
        notNull: true,
        defaultValue: 'false',
      },
      { name: 'publishDate', type: 'datetime' },
    ],
    revLinks: [
      { column: 'videoId', table: 'embeddings' },
      { column: 'videoId', table: 'collectionvideos' },
    ],
  },
  {
    name: 'embeddings',
    columns: [
      { name: 'text', type: 'text' },
      { name: 'embedding', type: 'vector', vector: { dimension: 1024 } },
      { name: 'videoId', type: 'link', link: { table: 'videos' } },
      { name: 'start', type: 'int' },
    ],
  },
  {
    name: 'collectionvideos',
    columns: [
      { name: 'videoId', type: 'link', link: { table: 'videos' } },
      { name: 'collectionId', type: 'link', link: { table: 'collections' } },
    ],
  },
  {
    name: 'users',
    columns: [
      { name: 'password', type: 'string' },
      { name: 'username', type: 'string', unique: true },
      { name: 'name', type: 'string' },
    ],
    revLinks: [{ column: 'userId', table: 'collections' }],
  },
] as const;

export type SchemaTables = typeof tables;
export type InferredTypes = SchemaInference<SchemaTables>;

export type Collections = InferredTypes['collections'];
export type CollectionsRecord = Collections & XataRecord;

export type Videos = InferredTypes['videos'];
export type VideosRecord = Videos & XataRecord;

export type Embeddings = InferredTypes['embeddings'];
export type EmbeddingsRecord = Embeddings & XataRecord;

export type Collectionvideos = InferredTypes['collectionvideos'];
export type CollectionvideosRecord = Collectionvideos & XataRecord;

export type Users = InferredTypes['users'];
export type UsersRecord = Users & XataRecord;

export type DatabaseSchema = {
  collections: CollectionsRecord;
  videos: VideosRecord;
  embeddings: EmbeddingsRecord;
  collectionvideos: CollectionvideosRecord;
  users: UsersRecord;
};

const DatabaseClient = buildClient();

const defaultOptions = {
  databaseURL:
    'https://Yaldram-Arena-mtfa7c.eu-central-1.xata.sh/db/youtube-chat',
};

export class XataClient extends DatabaseClient<DatabaseSchema> {
  constructor(options?: BaseClientOptions) {
    super({ ...defaultOptions, ...options }, tables);
  }
}

let instance: XataClient | undefined = undefined;

export const getXataClient = () => {
  if (instance) return instance;

  instance = new XataClient();
  return instance;
};
