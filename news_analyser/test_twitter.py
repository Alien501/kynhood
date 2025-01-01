from twitter import TwitterScraper
def main():
    # Initialize the scraper
    scraper = TwitterScraper(
        username = "ShanthoshS32920", 
        password = "Hackfest123!"
    )
    
    # Get news for a location (will also fetch from nearby areas)
    location_news = scraper.get_news(
        main_location="Ayanavaram, Chennai",
        tweets_per_location=5  # Number of tweets per location
    )
    
    # Display the results
    if location_news:
        print(location_news)
    else:
        print("No news found or an error occurred")

if __name__ == "__main__":
    main()