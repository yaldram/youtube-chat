import { Injectable } from '@nestjs/common';

import { XataClient } from 'src/config/xata';
import { CohereService } from 'src/modules/cohere/cohere.service';
import {
  GetRelevantQueriesArgs,
  RelevantDocument,
  RerankArgs,
  RerankDocumentsArgs,
  RetrieveDocumentsArgs,
} from './chat.interface';
import { ChatDto } from './dto/chat.schema';

@Injectable()
export class ChatService {
  constructor(
    private readonly cohereService: CohereService,
    private readonly xataClient: XataClient,
  ) {}

  private async getRelevantQueries({
    userQuery,
    topN = 0,
  }: GetRelevantQueriesArgs) {
    const queries = await this.cohereService.searchQueries(userQuery);

    if (queries.length > 0) {
      return topN > 0 ? queries.slice(0, topN) : queries;
    }
  }

  private async retrieveDocuments({
    userQuery,
    resourceId,
    topN = 5,
  }: RetrieveDocumentsArgs): Promise<RelevantDocument[]> {
    const queryEmbedding = await this.cohereService.embedQuery(userQuery);

    const documents = await this.xataClient.db.embeddings.vectorSearch(
      'embedding',
      queryEmbedding,
      {
        similarityFunction: 'cosineSimilarity',
        size: topN,
        ...(resourceId && {
          filter: {
            videoId: {
              $any: resourceId,
            },
          },
        }),
      },
    );

    return documents.records.map((document) => ({
      id: document.id,
      text: document.text,
      start: document.start.toString(),
    }));
  }

  private async rerankDocuments({
    documents,
    query,
    topN = 5,
  }: RerankDocumentsArgs) {
    const uniqueDocuments = documents.reduce((accumulator, current) => {
      const documentExists = accumulator.find(
        (document) => document.id === current.id,
      );

      return documentExists ? accumulator : [...accumulator, current];
    }, [] as RelevantDocument[]);

    const rerankedDocuments = await this.cohereService.rerankDocuments(
      query,
      uniqueDocuments,
      topN,
    );

    return rerankedDocuments;
  }

  private async generateChatResponse(
    { userQuery, conversationId, resourceId }: ChatDto,
    {
      searchQueriesTopN,
      relevantDocumentsTopN,
      rerankDocumentsTopN,
    }: RerankArgs,
  ) {
    const relevantQueries = await this.getRelevantQueries({
      userQuery,
      topN: searchQueriesTopN,
    });

    const documents: RelevantDocument[] = [];

    // Map each relevant query to a promise that retrieves documents
    const relevantDocumentsPromises = relevantQueries.map((relevantQuery) => {
      return this.retrieveDocuments({
        userQuery: relevantQuery,
        resourceId,
        topN: relevantDocumentsTopN,
      });
    });

    // Execute all promises concurrently and collect the results
    const relevantDocumentsArray = await Promise.all(relevantDocumentsPromises);

    // Flatten the array of arrays into a single array of documents
    documents.push(...relevantDocumentsArray.flat());

    const rerankedDocuments = await this.rerankDocuments({
      documents,
      query: userQuery,
      topN: rerankDocumentsTopN,
    });

    console.log('Re-ranked documents', rerankedDocuments);

    const chatResponse = await this.cohereService.chat({
      message: userQuery,
      documents: rerankedDocuments,
      conversationId: conversationId,
    });

    console.log('CHAT RESPONSE', chatResponse);

    return chatResponse.text.replace(/\n/g, ' ');
  }

  async videoChat(payload: ChatDto) {
    return this.generateChatResponse(payload, {
      searchQueriesTopN: 2,
      relevantDocumentsTopN: 3,
      rerankDocumentsTopN: 2,
    });
  }

  async collectionChat(payload: ChatDto) {
    return this.generateChatResponse(payload, {
      searchQueriesTopN: 2,
      relevantDocumentsTopN: 5,
      rerankDocumentsTopN: 3,
    });
  }

  async knowledgeBaseChat(payload: ChatDto) {
    return this.generateChatResponse(payload, {
      searchQueriesTopN: 3,
      relevantDocumentsTopN: 10,
      rerankDocumentsTopN: 5,
    });
  }
}
