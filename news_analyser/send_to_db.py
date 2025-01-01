import requests

# Define the endpoints
news_location_url = "http://127.0.0.1:8000/news_for_location"
news_post_url = "http://192.168.6.53:3000/api/v1/news"

def post_news_items():
    # Make a POST request to the first endpoint
    try:
        response = requests.post(news_location_url, json={"location": "Ayanavaram, Chennai"})  # Corrected parameter name
        response.raise_for_status()  # Raise an exception for HTTP errors
        news_data = response.json()  # Parse the response JSON
    except Exception as e:
        print(f"Error fetching news data: {e}")
        return

    # Check if the response contains the 'news_results' key
    news_results = news_data.get("news_results", [])
    if not news_results:
        print("No news results found.")
        return

    # Loop through each news result and make a POST request to the second endpoint
    for news_item in news_results:
        post_body = {
            "title": news_item.get("title"),
            "content": news_item.get("maintext"),
            "description": news_item.get("description"),
            "URL": news_item.get("source_domain"),
            "datePublished": news_item.get("date_publish"),
            "authors": news_item.get("authors", []),
            "sources": news_item.get("source_domain"),
        }

        try:
            post_response = requests.post(news_post_url, json=post_body)
            post_response.raise_for_status()  # Raise an exception for HTTP errors
            print(f"Successfully posted news: {news_item.get('title')}")
        except Exception as e:
            print(f"Error posting news: {e}")

if __name__ == "__main__":
    post_news_items()
