from newsplease import NewsPlease
from googlenewsdecoder import new_decoderv1
from content_type import generate_notification

def format_maintext(text):
    """
    Format the maintext by replacing newlines with HTML paragraph tags.
    
    Args:
        text (str): The text to format
        
    Returns:
        str: Formatted text with HTML paragraph tags
    """
    if not text:
        return None
    paragraphs = [p.strip() for p in text.split('\n') if p.strip()]
    formatted_text = ''.join(f'<p>{p}</p>' for p in paragraphs)
    
    return formatted_text

def get_news(url, interval_time=5):
    """
    Decodes a Google News URL and scrapes the decoded URL using NewsPlease.
    
    Args:
        url (str): The Google News redirect URL to decode.
        interval_time (int, optional): Time interval for decoding. Defaults to 5.
    
    Returns:
        dict: A dictionary containing the scraped article details or an error message.
    """
    try:
        decoded_url = new_decoderv1(url, interval=interval_time)
        
        if decoded_url.get("status"):
            final_url = decoded_url["decoded_url"]
            print("Decoded URL:", final_url)
            
            article = NewsPlease.from_url(final_url)
            formatted_maintext = format_maintext(article.maintext) if article.maintext else None
            print(article)
            
            notification_data = None
            if article.maintext:
                notification_data = generate_notification(article.maintext)
            
            return {
                "status": "success",
                "title": article.title if article.title else None,
                "authors": article.authors if article.authors else None,
                "date_publish": article.date_publish if article.date_publish else None,
                "description": article.description if article.description else None,
                "maintext": formatted_maintext,
                "source_domain": article.source_domain if article.source_domain else None,
                "notification": notification_data
            }
            
        else:
            return {
                "status": "error",
                "message": decoded_url["message"]
            }
            
    except Exception as e:
        return {
            "status": "error",
            "message": str(e)
        }