import os
from pydub import AudioSegment
import random

# Load the original WAV file
def load_wav(file_path):
    return AudioSegment.from_wav(file_path)

# Function to cut the WAV into eight pieces and remix
def remix_wav(original_wav):
    pieces = [original_wav[i:i + len(original_wav) // 8] for i in range(0, len(original_wav), len(original_wav) // 8)]
    remixed_pieces = []
    for piece in pieces:
        if random.randint(1, 3) == 1:
            piece = piece.reverse()
        remixed_pieces.append(piece)
    random.shuffle(remixed_pieces)
    return sum(remixed_pieces)

# Main function to create 10 remixes
def create_remixes(original_file_path, output_dir):
    original_wav = load_wav(original_file_path)
    for i in range(10):
        remix = remix_wav(original_wav)
        remix.export(os.path.join(output_dir, f'remix_{i+1}.wav'), format='wav')

if __name__ == '__main__':
    original_file_path = 'the_way_that_i_love_you.wav'
    output_dir = 'remixes/'
    create_remixes(original_file_path, output_dir)
