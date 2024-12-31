from pydantic import BaseModel, Field

class Notification(BaseModel):
    description: str = Field(description="A short and catchy sentence which can be used as notification")
    content_type: str = Field(description="Type of content for which notification is being sent(sports, political, money, etc)")
    
    