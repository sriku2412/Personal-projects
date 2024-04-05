from pytube import Playlist, YouTube, Search

output_path = 'C:\\Users\\srika\\OneDrive\\Documents\\York\\Sem-3 york\\Youtube\\'

# Function to download videos from a given URL
def download_video(url):
    yt = YouTube(url)
    yt.streams.first().download(output_path)

# Function to download videos from a playlist URL
def download_playlist(playlist_url):
    playlist = Playlist(playlist_url)
    for video in playlist.videos:
        video.streams.first().download(output_path)

# Function to download videos from a topic
def download_topic(query):
    max_results = 5
    search_results = Search(query.strip()).results[:max_results]
    for video in search_results:
        download_video(video.watch_url)

# Main program
with open('ResearchTopics.txt', 'r') as file:
    for line in file:
        line = line.strip()
        if 'youtube.com/watch?v=' in line:
            download_video(line)
        elif 'youtube.com/playlist?list=' in line:
            download_playlist(line)
        else:
            download_topic(line)
            
            
"""
# Example usage
# Download a single video
# download_video('https://youtube.com/watch?v=abc123')
# Download a playlist
# download_playlist('https://youtube.com/playlist?list=PLzMcBGfZo4-mP9GJ0XJHZHw9rqhYUoF84')
# Download videos from a topic
# download_topic('deep learning')
 """