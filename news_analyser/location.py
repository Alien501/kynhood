import requests
from geopy.geocoders import Nominatim

# getting coordinates from location
geolocator = Nominatim(user_agent="geoapi")
def get_coordinates(place_name):
    '''getting coordinates for a paticular location
    Args:
    place_name: string
    
    Returns:
    latitude: float, longitude: float'''
    
    location = geolocator.geocode(place_name)
    return location.latitude, location.longitude
# location = geolocator.geocode("Ayanavaram, Chennai")
# lat, lon = location.latitude, location.longitude

# getting nearby locations from location
def get_nearby_locations(location_name):
    '''getting nearby locations for a paticular location using location_name
    Args: 
    location_name: string
    
    Returns: 
    List of nearby locations'''
    lat, lon = get_coordinates(location_name)
    overpass_url = "http://overpass-api.de/api/interpreter"
    
    overpass_query = f"""
    [out:json];
    (
    node(around:2000,{lat},{lon})["place"];
    );
    out body;
    """
    
    response = requests.get(overpass_url, params={'data': overpass_query})
    data = response.json()
    
    nearby_locations = [element['tags']['name'] for element in data['elements'] if 'name' in element['tags']]
    return nearby_locations[:5]

# example usage for location
arr = get_nearby_locations("Ayanavaram, Chennai");
print(arr)
# print(get_nearby_locations(lat, lon))