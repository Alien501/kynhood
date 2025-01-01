import requests
import json
from news_parser import twitter_news
from datetime import datetime

news_post_url = "http://192.168.6.53:3000/api/v1/news"

def post_news_articles():
    """
    Posts each news article to the specified endpoint.
    """
    # Fetch news articles
    news_articles = twitter_news()
    # data = {'articles': [{'title': 'Top 10 Movies of 2024', 'authors': ['Ajay Srinivasan'], 'date_publish': '2024-12-28', 'content_type': 'Entertainment', 'description': 'The top 10 movies of 2024 according to moviegoers in Kilpauk are revealed. #TheGOAT comes in at No. 1, followed by #Amaran at No. 2 and #ManjummelBoys at No. 3.', 'maintext': '<p>The top 10 movies of 2024 have been announced, and moviegoers in Kilpauk have spoken. #TheGOAT has taken the top spot, followed by #Amaran at No. 2 and #ManjummelBoys at No. 3.</p>\n<p>The list was compiled based on a survey of moviegoers in Kilpauk, and it reflects the diverse tastes of the local audience. The top 10 movies represent a wide range of genres, from action and adventure to comedy and drama.</p>\n<p>The fact that #TheGOAT has taken the top spot is a testament to its popularity among moviegoers of all ages. The film is a heartwarming story about a young boy who dreams of becoming a professional wrestler. #Amaran, which came in at No. 2, is a political thriller that explores the dark side of power. #ManjummelBoys, which rounded out the top three, is a coming-of-age story about a group of friends who are trying to find their place in the world.</p>\n<p>The rest of the top 10 movies are as follows:</p>\n<ol><li>4. #Vikram</li><li>5. #PonniyinSelvan</li><li>6. #Beast</li><li>7. #Valimai</li><li>8. #Don</li><li>9. #Etharkkum Thunindhavan</li><li>10. #Kaathuvaakula Rendu Kaadhal</li></ol>', 'source_domain': 'twitter', 'time_to_read': '10 minutes', 'location': 'Kilpauk'}, {'title': 'Woman Kills Herself and Her Children in Chennai', 'authors': [], 'date_publish': '2024-12-22', 'content_type': 'Crime', 'description': 'In a tragic incident, a woman in Chennai slit the throats of her two young sons and then her own due to a family feud.', 'maintext': "<p>The incident took place in the Pullapuram area of Kilpauk on Tuesday. The woman, who was in her early 30s, allegedly killed her sons, aged 18 months and four-and-a-half years, before taking her own life.</p>\n<p>According to the police, the woman had been suffering from depression for some time and had been having marital problems. She had reportedly been arguing with her husband over financial issues.</p>\n<p>On the day of the incident, the woman's husband had gone to work and her children were home alone with her. The police believe that she killed her sons while they were sleeping and then slit her own throat.</p>\n<p>The bodies of the woman and her children were found by her husband when he returned home from work. He immediately called the police, who arrived at the scene and took the bodies to a nearby hospital.</p>\n<p>The police are investigating the incident and have registered a case of murder.</p>", 'source_domain': 'twitter', 'time_to_read': '10 minutes', 'location': 'Kilpauk'}, {'title': "Political Party Leader Calls Tamil Nadu Governor 'Half Mental'", 'authors': ['CA ManianGopi'], 'date_publish': '2024-11-02', 'content_type': 'Politics', 'description': "A recognized political party's convenor, Seeman, has called Tamil Nadu Governor RN Ravi 'half mental' and said that his place is in a mental hospital.", 'maintext': "<p>Seeman made the remarks while speaking at a public meeting in Kilpauk on Tuesday. He said that Ravi was not fit to be the governor of Tamil Nadu and that he should be removed from his post.</p>\n<p>“RN Ravi is half mental. He should be admitted to the Institute of Mental Health in Kilpauk,” Seeman said.</p>\n<p>Seeman's remarks have been condemned by the ruling DMK party, which has called them 'irresponsible' and 'unacceptable'.</p>\n<p>The BJP, which is the political party that Ravi belongs to, has also condemned Seeman's remarks. The party's state president, K. Annamalai, said that Seeman's comments were 'derogatory' and 'insulting'.</p>\n<p>The police are investigating Seeman's remarks and have registered a case against him.</p>", 'source_domain': 'twitter', 'time_to_read': '10 minutes', 'location': 'Kilpauk'}, {'title': 'Chennai Sewage Overflow Causes Distress for Commuters', 'authors': ['Namma Chennai'], 'date_publish': '2024-12-26', 'content_type': 'Local News', 'description': 'Stagnant sewage near the Kilpauk Metro Station is causing distress for commuters. The CMRL blames illegal sewage connections from nearby flats and hospitals for the drain clogs that are causing the sewage overflow.', 'maintext': '<p>Commuters who use the Kilpauk Metro Station are facing a daily nightmare due to stagnant sewage near the station. The sewage overflow is causing a foul smell and making it difficult for commuters to breathe.</p>\n<p>The Chennai Metro Rail Limited (CMRL) has blamed illegal sewage connections from nearby flats and hospitals for the drain clogs that are causing the sewage overflow. The CMRL says that it has been trying to fix the problem, but the illegal connections keep reappearing.</p>\n<p>Commuters are demanding that the CMRL take immediate action to fix the problem. They say that the sewage overflow is a health hazard and that it is making it difficult for them to use the metro station.</p>\n<p>The CMRL has said that it is working to fix the problem and that it will take action against those who are responsible for the illegal sewage connections.</p>', 'source_domain': 'twitter', 'time_to_read': '10 minutes', 'location': 'Kilpauk'}, {'title': 'Mentally Challenged College Student Gang-Raped in Ayanavaram', 'authors': ['Arvind Menon', 'ANI'], 'date_publish': '2024-12-08', 'content_type': 'Crime', 'description': "A mentally challenged college student was gang-raped by seven men in the Ayanavaram area of Chennai. The student's father has filed a complaint with the police, who are investigating the incident.", 'maintext': "<p>The incident took place on Tuesday evening when the student was returning home from college. She was walking alone when she was attacked by the seven men.</p>\n<p>The men took the student to a nearby abandoned building, where they gang-raped her. The student was left unconscious at the scene of the crime.</p>\n<p>The student's father found her unconscious and took her to a nearby hospital. The student is currently in critical condition.</p>\n<p>The police have arrested one of the suspects and are searching for the other six.</p>", 'source_domain': 'twitter', 'time_to_read': '10 minutes', 'location': 'Ayanavaram'}, {'title': 'Chennai BJP President Condemns Gang-Rape of Mentally Challenged Student', 'authors': ['Arvind Menon'], 'date_publish': '2024-12-10', 'content_type': 'Politics', 'description': 'The Chennai BJP President, K. Annamalai, has condemned the gang-rape of a mentally challenged college student in the Ayanavaram area of Chennai.', 'maintext': "<p>Annamalai said that the incident was a 'shame on Tamil Nadu' and that the DMK government had failed to ensure the safety of women in the state.</p>\n<p>“The gang-rape of a mentally challenged college student in Ayanavaram is a shame on Tamil Nadu. The DMK government has failed to ensure the safety of women in the state,” Annamalai said.</p>\n<p"}]}
    news_articles = json.dumps(news_articles)
    
    try:
        # Parse the JSON string into a dictionary
        news_articles = json.loads(news_articles)
    except json.JSONDecodeError as e:
        print(f"Error decoding JSON: {e}")
        return
    
    print(news_articles)
    for article in news_articles.get("articles", []):
        post_body = {
            "title": article.get("title", ""),
            "content": article.get("maintext", ""),
            "description": article.get("description", ""),
            "url": article.get("source_domain", ""),
            "datePublished": str(datetime.strptime(article.get("date_publish", ""), "%Y-%m-%d").isoformat()),
            "authors": article.get("authors", []),
            "sources": [article.get("source_domain", "")] if article.get("source_domain") else [],
        }

        try:
            # Send the POST request
            response = requests.post(news_post_url, json=post_body)
            response.raise_for_status()  # Raise an error for HTTP errors
            print(f"Successfully posted news: {article.get('title')}")
        except requests.exceptions.RequestException as e:
            print(f"Error posting news: {article.get('title')}, Error: {e}")

if __name__ == "__main__":
    post_news_articles()
