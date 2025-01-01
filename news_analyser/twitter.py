import time
import re
import os
import pickle
import logging
from random import randint
from concurrent.futures import ThreadPoolExecutor, as_completed
from selenium import webdriver
from selenium.webdriver import ChromeOptions
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.support.ui import WebDriverWait
import requests
from location import get_nearby_locations

logging.basicConfig(filename='twitter_scraper.log', level=logging.ERROR)

class TwitterScraper:
    def __init__(self, username, password):
        self.username = username
        self.password = password

    def preprocess_tweet(self, text):
        text = re.sub(r'http\S+', '', text)
        text = re.sub(r'\s+', ' ', text).strip()
        return text

    def extract_mentions(self, text):
        return re.findall(r'@\w+', text)

    def extract_hashtags(self, text):
        return re.findall(r'#\w+', text)

    def initialize_driver(self):
        options = ChromeOptions()
        options.add_argument("--start-maximized")
        options.add_argument("--disable-gpu")
        options.add_argument("--no-sandbox")
        options.add_argument("--disable-dev-shm-usage")
        options.add_experimental_option("excludeSwitches", ["enable-automation"])
        options.add_argument("user-agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36")
        return webdriver.Chrome(options=options)

    def save_cookies(self, driver, file_path):
        with open(file_path, 'wb') as f:
            pickle.dump(driver.get_cookies(), f)

    def load_cookies(self, driver, file_path):
        with open(file_path, 'rb') as f:
            cookies = pickle.load(f)
            for cookie in cookies:
                driver.add_cookie(cookie)

    def login_to_twitter(self, driver):
        driver.get("https://twitter.com/login")

        if os.path.exists("twitter_cookies.pkl"):
            self.load_cookies(driver, "twitter_cookies.pkl")
            driver.get("https://twitter.com/home")
            time.sleep(3)
            return

        username_field = WebDriverWait(driver, 20).until(
            EC.visibility_of_element_located((By.CSS_SELECTOR, 'input[autocomplete="username"]'))
        )
        username_field.send_keys(self.username)
        username_field.send_keys(Keys.ENTER)

        password_field = WebDriverWait(driver, 10).until(
            EC.visibility_of_element_located((By.CSS_SELECTOR, 'input[name="password"]'))
        )
        password_field.send_keys(self.password)
        password_field.send_keys(Keys.ENTER)
        time.sleep(5)

        self.save_cookies(driver, "twitter_cookies.pkl")

    def scrape_location_tweets(self, location, driver, tweet_count=10):
        search_query = f'"{location}" min_faves:10 lang:en'
        encoded_query = requests.utils.quote(search_query)
        search_url = f'https://x.com/search?q={encoded_query}&src=typed_query&f=live'

        driver.get(search_url)
        time.sleep(randint(3, 6))

        tweet_data = []
        last_height = driver.execute_script("return document.body.scrollHeight")
        scroll_attempts = 0
        max_scroll_attempts = 3

        while len(tweet_data) < tweet_count and scroll_attempts < max_scroll_attempts:
            tweets = driver.find_elements(By.CSS_SELECTOR, "[data-testid='tweet']")
            for tweet in tweets:
                tweet_text = tweet.text
                if tweet_text and not any(t['text'] == tweet_text for t in tweet_data):
                    cleaned_text = self.preprocess_tweet(tweet_text)
                    hashtags = self.extract_hashtags(tweet_text)
                    mentions = self.extract_mentions(tweet_text)

                    try:
                        time_element = tweet.find_element(By.CSS_SELECTOR, "time")
                        timestamp = time_element.get_attribute("datetime")
                    except:
                        timestamp = None

                    tweet_data.append({
                        'text': cleaned_text,
                        'hashtags': hashtags,
                        'mentions': mentions,
                        'location': location,
                        'timestamp': timestamp
                    })
                    if len(tweet_data) >= tweet_count:
                        break

            driver.execute_script("window.scrollTo(0, document.body.scrollHeight);")
            time.sleep(randint(2, 5))
            new_height = driver.execute_script("return document.body.scrollHeight")
            if new_height == last_height:
                scroll_attempts += 1
            last_height = new_height

        return tweet_data

    def process_location(self, location, tweet_count):
        driver = self.initialize_driver()
        try:
            self.login_to_twitter(driver)
            return self.scrape_location_tweets(location, driver, tweet_count)
        except Exception as e:
            logging.error(f"Error processing location {location}: {str(e)}")
            return []
        finally:
            driver.quit()

    def get_news(self, main_location, tweets_per_location=10):
        try:
            locations = get_nearby_locations(main_location)
            all_results = {}

            with ThreadPoolExecutor(max_workers=5) as executor:
                future_to_location = {
                    executor.submit(
                        self.process_location,
                        location,
                        tweets_per_location
                    ): location for location in locations
                }

                for future in as_completed(future_to_location):
                    location = future_to_location[future]
                    try:
                        tweets = future.result()
                        if tweets:
                            all_results[location] = tweets
                    except Exception as e:
                        logging.error(f"Error processing location {location}: {str(e)}")

            return all_results if all_results else None

        except Exception as e:
            logging.error(f"Error: {str(e)}")
            return None
