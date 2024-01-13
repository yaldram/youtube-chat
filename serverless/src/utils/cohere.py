import os

import cohere

cohere_api_key = os.environ["COHERE_API_KEY"]

class CohereUtils:
  def __init__(self):
     self.cohere = cohere.Client(api_key=cohere_api_key)

  def create_embeddings(self, documents):
    response = self.cohere.embed(
      model= 'embed-english-v3.0',
      input_type='search_document',
      texts=documents
    )

    return response.embeddings
  
cohere_utils = CohereUtils()