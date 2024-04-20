import re

# Mapping from string number to MIDI note number for standard tuning
STRING_TO_MIDI = {
    'e': 64,  # E4
    'B': 59,  # B3
    'G': 55,  # G3
    'D': 50,  # D3
    'A': 45,  # A2
    'E': 40   # E2
}

def parse_tab_line(line):
    """Parse a single line of guitar tablature into MIDI notes."""
    notes = []
    # Extract the string character and notes from the line
    string_char = line[0]
    if string_char in STRING_TO_MIDI:
        for match in re.finditer(r'\d+', line):
            fret_number = int(match.group())
            midi_note = STRING_TO_MIDI[string_char] + fret_number
            notes.append(midi_note)
    return notes

# Example usage
if __name__ == '__main__':
    tab_line = 'e|-------------0-----------------------0-------------------2---2-------------------1---1-----------|'
    print(parse_tab_line(tab_line))