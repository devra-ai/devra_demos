import mido
from mido import MidiFile, MidiTrack

# Mapping of guitar string notes to MIDI note numbers (assuming standard tuning)
# E2 = 40, A2 = 45, D3 = 50, G3 = 55, B3 = 59, E4 = 64
string_notes = {'E|': 40, 'A|': 45, 'D|': 50, 'G|': 55, 'B|': 59, 'e|': 64}

# Function to parse guitar tab
def parse_tab(tab_str):
    lines = tab_str.split('\n')
    notes_at_positions = {}
    for line in lines:
        if line[:2] in string_notes:
            for i, char in enumerate(line[2:]):
                if char.isdigit():
                    note = string_notes[line[:2]] + int(char)
                    if i not in notes_at_positions:
                        notes_at_positions[i] = []
                    notes_at_positions[i].append(note)
    return notes_at_positions

# Function to convert guitar tab to MIDI
def tab_to_midi(tab_path, midi_path):
    with open(tab_path, 'r') as file:
        tab_str = file.read()
    notes_at_positions = parse_tab(tab_str)

    mid = MidiFile()
    track = MidiTrack()
    mid.tracks.append(track)

    # Set a fixed note duration for all notes
    duration = 120

    # Initialize time to 0 for the first note
    time = 0

    # Add notes to the track, allowing for simultaneous notes
    for position, notes in sorted(notes_at_positions.items()):
        print(f'{position}, {notes}')
        for note in notes:
            track.append(mido.Message('note_on', note=note, velocity=64, time=time))
            # Set time to 0 after the first note to play simultaneously
            time = 0
        # After all notes at this position are started, wait for the next set
        time = duration

    # Ensure the last note_off messages are sent
    for note in notes:
        track.append(mido.Message('note_off', note=note, velocity=64, time=20))

    mid.save(midi_path)

if __name__ == '__main__':
    tab_path = 'tab.txt'
    midi_path = 'output.mid'
    tab_to_midi(tab_path, midi_path)
    print('Conversion complete. MIDI file saved as', midi_path)