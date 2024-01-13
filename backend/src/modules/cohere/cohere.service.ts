import { Injectable } from '@nestjs/common';
import { CohereClient } from 'cohere-ai';
import type {
  ChatRequest,
  EmbedRequest,
  RerankRequest,
  RerankRequestDocumentsItem,
} from 'cohere-ai/api';

@Injectable()
export class CohereService {
  constructor(private readonly cohereClient: CohereClient) {}

  chat(options: ChatRequest) {
    return this.cohereClient.chat(options);
  }

  query(options?: EmbedRequest) {
    return this.cohereClient.embed({
      model: 'embed-english-v3.0',
      inputType: 'search_query',
      ...options,
    });
  }

  rerank(options?: RerankRequest) {
    return this.cohereClient.rerank({
      model: 'rerank-english-v2.0',
      topN: 3,
      returnDocuments: true,
      ...options,
    });
  }

  async embedQuery(query: string) {
    const embeddResponse = await this.query({
      texts: [query],
    });

    return embeddResponse.embeddings[0];
  }

  async rerankDocuments<T>(query: string, documents: T[], topN = 5) {
    const rerankResponse = await this.rerank({
      query,
      documents: documents as unknown as RerankRequestDocumentsItem[],
      topN,
    });

    const relevantIndexes = rerankResponse.results.map(
      (result) => result.index,
    );

    const relevantDocuments = relevantIndexes.map(
      (index) => documents[index],
    ) as T[];

    return relevantDocuments;
  }

  async searchQueries(query: string) {
    const { searchQueries } = await this.chat({
      message: query,
      searchQueriesOnly: true,
    });

    if (searchQueries.length > 0) {
      return searchQueries.map((query) => query.text);
    }
  }
}
