from dotenv import load_dotenv
import os
from langchain_core.pydantic_v1 import BaseModel, Field, validator
from langchain_google_genai import GoogleGenerativeAI
from langchain_core.prompts import PromptTemplate
from langchain_core.output_parsers import JsonOutputParser
import json

from schema import NewsCollection
from twitter import TwitterScraper

load_dotenv()
GEMINI_API_KEY = os.getenv('GEMINI_API_KEY')
parser = JsonOutputParser(pydantic_object=NewsCollection)

prompt = PromptTemplate(
    template="""A twitter tweet is given to you, you need to provide a complete description of the tweet and make it into a news article. 
    Return the title, authors, date of publishing, description, main text and the source domain. Give output as json. 
    
    Tweet: {tweet}
    
    {format_instructions}""",
    input_variables=["tweet"],
    partial_variables={"format_instructions": parser.get_format_instructions()},
)
llm = GoogleGenerativeAI(model="gemini-pro", google_api_key=GEMINI_API_KEY)
news_model = prompt | llm | parser

# def parse_news(tweet):
#     result = news_model.invoke({"tweet": tweet})
#     return result

def twitter_news(username='Vignesh42453697', password='Shanthosh@123isGay', main_location='Ayanavaram', tweets_per_location=5):
    """
    Fetches tweets for a given location and processes them using the news model.

    Args:
        username (str): Twitter username.
        password (str): Twitter password.
        main_location (str): Location to fetch tweets from.
        tweets_per_location (int): Number of tweets to fetch per location.
        news_model (object): The news processing model with an `invoke` method.

    Returns:
        dict: Processed news results keyed by location.
    """
    try:
        from twitter import TwitterScraper

        # Initialize the scraper
        scraper = TwitterScraper(username=username, password=password)

        # Get news for the specified location
        location_news = scraper.get_news(
            main_location=main_location,
            tweets_per_location=tweets_per_location
        )

        if not location_news:
            return {"error": "No news found or an error occurred"}

        # processed_news = {}
        # for location, tweets in location_news.items():
        #     processed_news[location] = []
        #     for tweet in tweets:
        #         # Process each tweet using the news model
        #         result = news_model.invoke({"tweet": tweet['text']})
        #         processed_news[location].append(result)
        print("News Model invoked")
        print("_"*50)
        processed_news = news_model.invoke({"tweet": location_news})

        return json.dumps(processed_news)

    except Exception as e:
        return {"error": str(e)}


# tweet ='''{'Anna Nagar East': [{'text': 'Tamil Nadu Food Safety @tnfoodsafety · Nov 14, 2024 Tamilnadu Food Safety Department Chennai District officials action taken against WhatsApp Complaint No. 4567/2024 spoiled Che /Nov 12 D.O.Chennai, at Quality Foods,No.61/41,1st Avenue,Anna Nagar East, Chennai Action Taken * Improvement was issued. * penalty Imposed Rs.1000 31 74 456 38K', 'hashtags': [], 'mentions': ['@tnfoodsafety'], 'location': 'Anna Nagar East', 'timestamp': '2024-11-14T04:25:25.000Z'}, {'text': 'R Aishwaryaa @AishRavi64 · Oct 30, 2024 Waterlogging inside apartment premises in Anna Nagar East, fourth street. The inundation remained as is since 2 p.m., according to locals. Resident alleged no pumps were installed and that no officials took action even after multiple complaints. : Sourced @kgbias @THChennai Show more 2 8 29 1.7K', 'hashtags': [], 'mentions': ['@AishRavi64', '@kgbias', '@THChennai'], 'location': 'Anna Nagar East', 'timestamp': '2024-10-30T11:25:21.000Z'}, {'text': 'Everything Works @HereWorks · Oct 15, 2024 To assist people during heavy rainfall and ensure the availability of milk, Aavin has announced that eight of its Hi-Tech parlours in Chennai—including those in Ambattur, Anna Nagar, Madhavaram, Besant Nagar, Anna Nagar East, Sholinganallur, Virugambakkam, and Mylapore—will Show more 1 15 93 3.5K', 'hashtags': [], 'mentions': ['@HereWorks'], 'location': 'Anna Nagar East', 'timestamp': '2024-10-15T16:30:12.000Z'}, {'text': 'Sriram V @MadrasMobile · Feb 5, 2024 Chennai 600102 - Anna Nagar East - a new colony with some old history #ChennaiByPINCode 4 8 39 3.2K', 'hashtags': ['#ChennaiByPINCode'], 'mentions': ['@MadrasMobile'], 'location': 'Anna Nagar East', 'timestamp': '2024-02-05T04:36:06.000Z'}, {'text': 'somberist sangavva @sangu421 · Dec 6, 2023 Pictures from my house and area Anna Nagar East - VOC Nagar @MKMAnnaNagar No response from MLA side or party members for relief. @mkstalin @Udhaystalin @KanimozhiDMK Chennai is heavily affected, flood relief fund for each family have to be given by the TN government like 2015! 1 9 6 3K', 'hashtags': [], 'mentions': ['@sangu421', '@MKMAnnaNagar', '@mkstalin', '@Udhaystalin', '@KanimozhiDMK'], 'location': 'Anna Nagar East', 'timestamp': '2023-12-06T06:01:10.000Z'}], 'Ayanavaram': [{'text': 'TN Industrial & Investment Updates @TnInvestment · Dec 13, 2024 #TamilNadu Govt to buy 500 Electric low-floor buses with 340 AC buses #Chennai MTC - 320 buses #Coimbatore TNSTC - 80 #Madurai TNSTC - 100 - MTC to setup dedicated electric depots in Ayanavaram, #Adyar and #Tambaram 1 15 117 3.7K', 'hashtags': ['#TamilNadu', '#Chennai', '#Coimbatore', '#Madurai', '#Adyar', '#Tambaram'], 'mentions': ['@TnInvestment'], 'location': 'Ayanavaram', 'timestamp': '2024-12-13T03:13:59.000Z'}, {'text': 'Arvind Menon @MenonArvindBJP · Dec 10, 2024 𝐃𝐌𝐊 𝐆𝐨𝐯𝐞𝐫𝐧𝐦𝐞𝐧𝐭’𝐬 𝐆𝐫𝐚𝐯𝐞 𝐅𝐚𝐢𝐥𝐮𝐫𝐞 𝐢𝐧 𝐄𝐧𝐬𝐮𝐫𝐢𝐧𝐠 𝐖𝐨𝐦𝐞𝐧’𝐬 𝐒𝐚𝐟𝐞𝐭𝐲 𝐢𝐧 𝐓𝐚𝐦𝐢𝐥 𝐍𝐚𝐝𝐮!
#  The Horrifying incident in Chennai’s Ayanavaram, where a mentally challenged college student endured months of horrific sexual violence at the Show more Quote BJP Tamilnadu @BJP4TamilNadu · Dec 9, 2024 தமிழகத்தை அழிவின் விளிம்பிற்கு இட்டுச் செல்லும் @arivalayam! சென்னை சிந்தாதிரிப்பேட்டையில் மன            னவளர்ச்சி குன்றிய கல்லூரி மாணவி ஒருவர் தொடர் கூட்டுப்பாலியல் வன்கொடுமைக்கு ஆளான சம்பவம், தமிழகத்தில் சந்தி சிரிக்கும் சட்டம் ஒழுங்கைப் படம் போட்டுக்                          காட்டுகிறது. மேலும், அம்மாணவியின் Show more 1 33 68 3.5K', 'hashtags': [], 'mentions': ['@MenonArvindBJP', '@BJP4TamilNadu', '@arivalayam'], 'locati   ion': 'Ayanavaram', 'timestamp': '2024-12-10T06:19:37.000Z'}, {'text': 'ANI @ANI · Dec 8, 2024 Tamil Nadu BJP State President K. Annamalai tweets, "The news that a gang of seven members sexually assaulted a mentally challenged college student in the Ayanavaram area of Chennai is shocking. In this regard, the student\'s father filed a complaint at the Chennai Ayanavaram Show more 2 51 157 36K', 'hashtags': [], 'mentions': ['@ANI'], 'location': 'Ayanavaram', 'timestamp': '2024-12-08T16:35:35.000Z'}, {'text': 'Hrishi Jawahar @jhrishi2 · Oct 30, 2024 Ayanavaram water logged with severe spell of rainfall!! VC - @SaaiKrishna2002 #Chennairains #Monsoon2024 #NEM2024 #Tamilnadu #Chennai 1 4 72 3K', 'hashtags': ['#Chennairains', '#Monsoon2024', '#NEM2024', '#Tamilnadu', '#Chennai'], 'mentions': ['@jhrishi2', '@SaaiKrishna2002'], 'location': 'Ayanavaram', 'timestamp': '2024-10-30T08:06:47.000Z'}, {'text': 'Aaru Bhai @aaruksamy · May 26, 2024 . @dhanushkraja na should to do film like this again Thirukumaram from ayanavaram is a vibe From Sun Music 115 571 28K', 'hashtags': [], 'mentions': ['@aaruksamy', '@dhanushkraja'], 'location': 'Ayanavaram', 'timestamp': '2024-05-26T12:28:50.000Z'}], 'Shenoy Nagar': [{'text': 'Everything Works @HereWorks · Oct 31, 2024 Greater Chennai Corporation is privatizing its convention halls—Amma Arangam in Shenoy Nagar and Sir Pitty Thyagaraya Hall in T Nagar—to boost revenue and improve services, with five-year leases allowing contractors to collect revised fees. Despite prime locations, poor upkeep Show more 1 6 41 1.4K', 'hashtags': [], 'mentions': ['@HereWorks'], 'location': 'Shenoy Nagar', 'timestamp': '2024-10-31T13:00:55.000Z'}, {'text': 'Tamil Nadu Weatherman @praddy06 · Oct 30, 2024 The clouds which gave intense rains to Anna Nagar has weakened and moved in land. GCC Anna Nagar West - 111 mm followed by IMD Villivakkam 99 mm, GCC Shenoy Nagar 78 mm, GCC Kolathur 71 mm. But same time some part of City missed the rains too. Not every day we can see such Show more 33 54 646 49K', 'hashtags': [], 'mentions': ['@praddy06'], 'location': 'Shenoy Nagar', 'timestamp': '2024-10-30T09:26:24.000Z'}, {'text': 'Everything Works @HereWorks · Sep 11, 2024 In a few months, metro rail commuters in Chennai will have the convenience of picking up daily groceries and electronic items right at the station, with Lulu Hypermarket set to open at three metro stations. According to officials, the hypermarkets at Shenoy Nagar and Chennai Show more 3 20 182 5.9K', 'hashtags': [], 'mentions': ['@HereWorks'], 'location': 'Shenoy Nagar', 'timestamp': '2024-09-11T01:56:56.000Z'}, {'text': "TN Industrial & Investment Updates @TnInvestment · Jun 29, 2024 #LuLu hypermarkets to come up at three #Chennai Metro Rail stations - Three hypermarkets will come up in Chennai Metro Rail stations—Shenoy Nagar, Chennai Central and Wimco Nagar #CMRL #ChennaiMetro thehindu.com LuLu hypermarkets to come up at three Chennai Metro Rail stations LuLu's Hypermarket to open in Chennai Metro Rail stations, enhancing shopping options for residents and travelers by early next year. 1 17 102 3.3K", 'hashtags': ['#LuLu', '#Chennai', '#CMRL', '#ChennaiMetro'], 'mentions': ['@TnInvestment'], 'location': 'Shenoy Nagar', 'timestamp': '2024-06-29T04:44:00.000Z'}, {'text': 'bread @pizzapurist · Dec 22, 2023 FRIENDS! my bestest friends baby sister (my best sister) I’ve had the pleasure of watching grow up, has her own little tea cafe in Shenoy Nagar now, they’re a bunch of little kids working really hard please go visit them. Emptea Pocket 2 14 117 9.3K', 'hashtags': [], 'mentions': ['@pizzapurist'], 'location': 'Shenoy Nagar', 'timestamp': '2023-12-22T16:35:46.000Z'}], 'Kilpauk': [{'text': "Ajay Srinivasan @Ajaychairman · Dec 28, 2024 #Top10Movies2024 at EGA CINEMAS. #TheGOAT at No.1 #Amaran at No.2 #ManjummelBoys at No 3 Even in Kilpauk, that that film didn't make the Top-3. 7 219 576 8.7K", 'hashtags': ['#Top10Movies2024', '#TheGOAT', '#Amaran', '#ManjummelBoys'], 'mentions': ['@Ajaychairman'], 'location': 'Kilpauk', 'timestamp': '2024-12-28T14:58:35.000Z'}, {'text': 'Parasakthi @Parasakthee · Dec 28, 2024 Replying to @Senku23 and @sriramchennai07 Was it a group of Kilpauk patients whatsapp group ? 3 3 36 465', 'hashtags': [], 'mentions': ['@Parasakthee', '@Senku23', '@sriramchennai07'], 'location': 'Kilpauk', 'timestamp': '2024-12-27T18:36:36.000Z'}, {'text': 'Namma Chennai @NammaChennai_ · Dec 26, 2024 Stagnant sewage near Kilpauk Metro Station causes distress for Commuters CMRL blames illegal sewage connections from nearby flats and hospitals for drain clogs causing sewage overflow near Kilpauk Metro. Despite complaints, the issue persists, with no permanent solution. 2 32 674', 'hashtags': [], 'mentions': ['@NammaChennai_'], 'location': 'Kilpauk', 'timestamp': '2024-12-26T06:06:59.000Z'}, {'text': 'The Times Of India @timesofindia · Dec 22, 2024 In an attempt to kill herself and her children, a woman slit the throats of her sons, aged 18 months and four-and-a-half years, and then slit her own throat due to a family feud in Pullapuram, near Kilpauk Know more #Chennai 12 36 99 12K', 'hashtags': ['#Chennai'], 'mentions': ['@timesofindia'], 'location': 'Kilpauk', 'timestamp': '2024-12-22T10:15:00.000Z'}, {'text': 'Abhishek Srini @Abhihaasan732 · Dec 10, 2024 Rajini sir as the ward patient in Kilpauk (House of Mentalans) This post is unavailable. 15 92 333 9.3K', 'hashtags': [], 'mentions': ['@Abhihaasan732'], 'location': 'Kilpauk', 'timestamp': '2024-12-10T16:22:48.000Z'}]}'''
 
# print(twitter_news())