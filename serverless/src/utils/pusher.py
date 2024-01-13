import os

import pusher

pusher_app_id = os.environ["PUSHER_APP_ID"]
pusher_key = os.environ["PUSHER_KEY"]
pusher_secret = os.environ["PUSHER_SECRET"]
pusher_cluster = "ap2"
pusher_channel_name = "video-chat"

class PusherUtils:
  def __init__(self):
    self.pusher = pusher.Pusher(
      app_id=pusher_app_id,
      key=pusher_key,
      secret=pusher_secret,
      cluster=pusher_cluster,
      ssl=True
    )

  def push(self, event_name, data):
    self.pusher.trigger(pusher_channel_name, event_name, data)

pusher_utils = PusherUtils()