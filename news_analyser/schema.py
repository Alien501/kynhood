# schema.py
from typing import List, Optional
from pydantic import BaseModel, Field
from datetime import datetime

class Notification(BaseModel):
    """Schema for notification generation"""
    description: str = Field(
        description="A short and catchy sentence which can be used as notification"
    ),
    content_type: str = Field(
        description="Type of content for which notification is being sent(sports, political, money, etc)"
    ),
    location: str = Field(
        description="Location of the news content. Use 'Chennai' if not found" 
    )

class NewsArticle(BaseModel):
    """Schema for individual news article generated from a tweet"""
    title: str = Field(
        description="Title of the news article generated from the tweet content", 
    )
    authors: List[str] = Field(
        description="List of authors - tweet handle(s) without @ symbol",
        default_factory=list
    )
    date_publish: str = Field(
        description="Date when the tweet was published in ISO format"
    )
    content_type: str = Field(
        description = "Content type of the new article generated from the tweet(example: Sports, Government, Money, etc)"
    )
    description: str = Field(
        description="Brief summary of the news article generated from tweet"
    )
    maintext: str = Field(
        description="Detailed article text generated from tweet content. Uses <p> tag to generate different paragraphs(uses only <p> tag). Use own imagination to generate different paragraphs related to context"
    )
    source_domain: str = Field(
        description="Source platform of the content",
        default="twitter"
    )
    time_to_read: str = Field(
        description="Time taken to read the article in minutes",
        default="10 minutes"
    )
    location: str = Field(
        Field="Location of the tweet to which is belongs(sent in json as zone wise(Shenoy Nagar, Ayanavaram, etc)). Use it if it is relevant, else try to find the most relevant location of the tweet. If none, return Chennai"
    )

class NewsCollection(BaseModel):
    """Schema for collection of news articles generated from multiple tweets"""
    articles: List[NewsArticle] = Field(
        description="List of news articles generated from tweets"
    )
    total_articles: int = Field(
        description="Total number of articles in the collection"
    )