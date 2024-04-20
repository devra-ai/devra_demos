from mido import MidiFile, MidiTrack, Message, MetaMessage
import tab_parser

# Create a new MIDI file with one track
def create_midi_from_tab(tab_path, midi_path):
    mid = MidiFile()
    track = MidiTrack()
    mid.tracks.append(track)

    # Set tempo (500000 microseconds per beat, default is 120bpm)
    track.append(MetaMessage('set_tempo', tempo=500000, time=0))

    # Program change to Acoustic Guitar
    track.append(Message('program_change', program=24, time=0))

    delta_time = 120  # Time between notes
    with open(tab_path, 'r') as file:
        time = 0
        for line in file:
            notes = tab_parser.parse_tab_line(line)
            for note in notes:
                # Note on
                track.append(Message('note_on', note=note, velocity=64, time=time))
                # Note stays on for delta_time, then turns off
                time += delta_time
                track.append(Message('note_off', note=note, velocity=64, time=delta_time))

    # Save the MIDI file
    mid.save(midi_path)

if __name__ == '__main__':
    tab_path = 'house_of_the_rising_sun.txt'
    midi_path = 'house_of_the_rising_sun.mid'
    create_midi_from_tab(tab_path, midi_path)
    print(f'MIDI file {midi_path} has been created successfully.')