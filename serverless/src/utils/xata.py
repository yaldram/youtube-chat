import os
import json

from xata import XataClient

xata_api_key = os.environ["XATA_API_KEY"]
xata_db_url = os.environ["XATA_DB_URL"]

class XataUtils:
  def __init__(self):
     self.xata = XataClient(api_key=xata_api_key, db_url=xata_db_url)

  def update_record(self, table_name, record_id, data):
    return self.xata.records().update(table_name, record_id, data)
  
  def bulk_insert(self, table_name, data):
    return self.xata.records().bulk_insert(table_name, {
      "records": data
    })
  
  def upload_transcript(self, record_id, data):
    return self.xata.files().put(table_name="videos", column_name="transcript", record_id=record_id, data=data, content_type="application/json")
  
  def read_transcript(self, record_id):
    file_response = self.xata.files().get(table_name="videos", column_name="transcript", record_id=record_id)
    file_content = file_response.content
    return json.loads(file_content)

xata_utils = XataUtils()