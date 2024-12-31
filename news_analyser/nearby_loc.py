import requests
from pprint import pprint

NOMINATIM_API_URL = "https://nominatim.openstreetmap.org"
OVERPASS_API_URL = "http://overpass-api.de/api/interpreter"

NOMINATIM_QUERY_PARAMS = {
    "format": "json",
    "limit": 1
}

OVERPASS_RADIUS = 5000  # Radius in meters


def get_coordinates(place_name):
    """Fetch coordinates of a place using the Nominatim API."""
    headers = {
        "User-Agent": "YourAppName/1.0 (contact@example.com)"
    }
    nominatim_url = f"{NOMINATIM_API_URL}/search"
    params = {**NOMINATIM_QUERY_PARAMS, "q": place_name}
    
    response = requests.get(nominatim_url, headers=headers, params=params)
    if response.status_code != 200:
        raise Exception(f"Failed to fetch coordinates: HTTP {response.status_code}")
    
    data = response.json()
    if not data:
        raise Exception(f"No data found for {place_name}")
    
    return data[0]['lat'], data[0]['lon']


def get_nearby_locations(lat, lon):
    """Fetch nearby locations using the Overpass API."""
    overpass_query = f"""
    [out:json];
    (
      node(around:{OVERPASS_RADIUS},{lat},{lon});
      way(around:{OVERPASS_RADIUS},{lat},{lon});
      relation(around:{OVERPASS_RADIUS},{lat},{lon});
    );
    out center;
    """
    response = requests.get(OVERPASS_API_URL, params={'data': overpass_query})
    if response.status_code != 200:
        raise Exception(f"Failed to fetch nearby locations: HTTP {response.status_code}")
    
    data = response.json()
    if "elements" not in data:
        raise Exception("No nearby locations found.")
    
    nearby_locations = set()
    for element in data['elements']:
        if 'tags' in element and 'name' in element['tags']:
            nearby_locations.add(element['tags']['name'])
    
    # Filter to keep only names that look like areas (manual curation may be needed)
    area_keywords = {"Nagar", "Colony", "Ward", "Phase", "Area", "Village"}
    filtered_locations = {name for name in nearby_locations if any(keyword in name for keyword in area_keywords)}
    
    return filtered_locations


if __name__ == "__main__":
    place_name = "Ayanavaram"
    try:
        # Get coordinates for the place
        lat, lon = get_coordinates(place_name)
        print(f"Coordinates for {place_name}: Latitude {lat}, Longitude {lon}")
        
        # Get nearby locations
        locations = get_nearby_locations(lat, lon)
        print(f"Nearby locations to {place_name}:")
        for location in sorted(locations):
            print(location)
    except Exception as e:
        print(f"Error: {e}")
