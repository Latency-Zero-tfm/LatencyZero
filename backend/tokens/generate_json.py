import pickle
import json
from google.oauth2.credentials import Credentials

with open("latencyzero_server/token.pickle", "rb") as f:
  creds = pickle.load(f)

data = {
  "token": creds.token,
  "refresh_token": creds.refresh_token,
  "token_uri": creds.token_uri,
  "client_id": creds.client_id,
  "client_secret": creds.client_secret,
  "scopes": creds.scopes
}

with open("latencyzero_server/token.json", "w") as f:
  json.dump(data, f)

print("token.json creado correctamente!")
