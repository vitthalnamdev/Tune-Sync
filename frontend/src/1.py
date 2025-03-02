import requests
import base64

client_id = "9aa78058d53c471e9f38a350c6a7e8fc"
client_secret = "df7ba0e7cbf24868b43ed0d21613901e"

# Encode Client ID and Secret in Base64
credentials = f"{client_id}:{client_secret}"
encoded_credentials = base64.b64encode(credentials.encode()).decode()

# API URL
url = "https://accounts.spotify.com/api/token"

# Correct Headers
headers = {
    "Authorization": f"Basic {encoded_credentials}",
    "Content-Type": "application/x-www-form-urlencoded"
}

# Correct Data Format (NOT JSON)
data = {
    "grant_type": "client_credentials"
}

# Make the request
response = requests.post(url, headers=headers, data=data)

# Print response
print(response.json())
