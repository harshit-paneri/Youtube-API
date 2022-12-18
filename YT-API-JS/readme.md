# Youtube API

To make an API to fetch latest videos sorted in reverse chronological order of their publishing date-time from YouTube for a given tag/search query in a paginated response.


## Installation Instructions

- Clone this project :
  ```
  cd YT-API-JS
  ```
  ```
  npm i
  ```
 #### Enabling YouTube Data API V3:
 - Now, go to the Google Cloud Console > select `APIs and Services` from the `navigation menu` > Then click on the `ENABLE API AND SERVICES` button > Search for "YouTube Data API v3" > Enable the API. <br> Alternatively, you can also visit this link: https://console.cloud.google.com/apis/library/youtube.googleapis.com.
 - After enabling the YouTube API, generate new Credentials (API key) for this YouTube Data API.
 - **NOTE: A comma separated list of API keys is necessary to utilize the feature of multiple API keys**
 
 #### Connecting to MongoDB Atlas:
 - Create a MongoDB Atlas cluster
 - In the `Database` tab under `Deployment` section, click on the `Connect` button.
 - Choose **Connect your application**
 - Under the `Add your connection string into your application code` section, uncheck the *Include full driver code example*
 - The string being displayed now, is the connection string for your cluster. Use this string in the next steps.

## The .env File

Now create a new `.env` file in the project's root directory similar to the provided `example.env` file and store the required comma separated list of Google API Keys and the atlas connection string in the required variables.

After that, if you have nodemon installed, then simply run the following command:
```
nodemon server
```

## Test the API

### 1. Testing pagination

Create a GET request to the following url:
```
http://localhost:3000
```
with the following query parameters:
- `page` - to specify the page
- `limit` - to specify the number of results to fetch from that page
- Both the values should be greater than 1

### 2. Testing Search feature

Create a POST request to the following url:
```
http://localhost:3000/search
```
with the following body in JSON format:
```
{
    "title":<string-to-search>,
    "description":<string-to-search>,
}
```
**NOTE: Both title and description are optional**
