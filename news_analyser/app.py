from flask import Flask, request, jsonify
from news_scraper import get_news
from location import get_nearby_locations
import requests
from concurrent.futures import ThreadPoolExecutor, as_completed
from functools import lru_cache
import time

app = Flask(__name__)
executor = ThreadPoolExecutor(max_workers=10)

@lru_cache(maxsize=100)
def fetch_google_urls(location):
    """Cache and fetch Google URLs for a location"""
    try:
        response = requests.post(
            url="http://192.168.6.100:8000/news",
            json={"location": location},
            timeout=10
        )
        if response.status_code == 200:
            response_json = response.json()
            return [entry["link"] for entry in response_json.get("entries", [])][:7]
    except requests.exceptions.RequestException as e:
        print(f"Error fetching URLs for {location}: {e}")
    return []

def process_news_url(url, interval_time):
    """Process a single news URL"""
    try:
        result = get_news(url, interval_time)
        if result and result.get("status") == "success":
            return result
    except Exception as e:
        print(f"Error processing URL {url}: {e}")
    return None

@app.route('/news_for_location', methods=['POST'])
def news_for_location():
    try:
        data = request.get_json()
        if not data or "location" not in data:
            return jsonify({
                "status": False,
                "message": "Location not provided"
            }), 400

        # Get nearby locations
        start_time = time.time()
        nearby_locations = get_nearby_locations(data["location"])

        # Parallel fetch of Google URLs
        google_urls = set()
        with ThreadPoolExecutor(max_workers=5) as url_executor:
            url_futures = {
                url_executor.submit(fetch_google_urls, location): location
                for location in nearby_locations
            }
            for future in as_completed(url_futures):
                urls = future.result()
                if urls:
                    google_urls.update(urls)

        # Parallel news processing
        interval_time = data.get("interval_time", 5)
        news_results = []
        with ThreadPoolExecutor(max_workers=10) as news_executor:
            news_futures = [
                news_executor.submit(process_news_url, url, interval_time)
                for url in google_urls
            ]
            for future in as_completed(news_futures):
                result = future.result()
                if result:
                    news_results.append(result)
                    # Early exit if more than 5 results are collected
                    if len(news_results) >= 5:
                        execution_time = time.time() - start_time
                        return jsonify({
                            "status": True,
                            "news_results": news_results,
                            "execution_time": execution_time
                        }), 200

        execution_time = time.time() - start_time
        return jsonify({
            "status": True,
            "news_results": news_results,
            "execution_time": execution_time
        }), 200 if news_results else 500

    except Exception as e:
        print(f"Unexpected error: {e}")
        return jsonify({
            "status": False,
            "message": str(e)
        }), 500

if __name__ == "__main__":
    app.run(
        debug=True,
        threaded=True,
        host='0.0.0.0',
        port=8000
    )
