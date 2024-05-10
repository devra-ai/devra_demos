Develop a python script that can read guitar tablature from a text file and convert it into a MIDI file. 
The tool should handle simultaneous notes and apply standard guitar tuning to translate string 
and fret combinations into MIDI note numbers.

**Requirements:**

1. **File Reading and Writing:**
   - Implement functionality to read guitar tabs from the text file `house_of_the_rising_sun.txt`.
   - The tool must be able to generate and save a MIDI file to the tool's project directory.

2. **Tab Parsing:**
   - Develop a function to parse standard guitar tablature into musical notes.
   - The parser should identify the string from the tablature and compute the corresponding MIDI note number based on the fret number, considering standard guitar tuning.
   - The tuning should map E2 to MIDI 40, A2 to MIDI 45, D3 to MIDI 50, G3 to MIDI 55, B3 to MIDI 59, and E4 to MIDI 64.
   - The parser should organize notes to recognize simultaneous note occurrences based on their positions in the tablature.

3. **MIDI File Creation:**
   - Create a MIDI file structure with a single track.
   - Add parsed notes to the MIDI track. Notes that are vertically aligned in the tab should be played simultaneously.
   - Set a predefined duration for all notes (e.g., 120 ticks).

4. **Note Handling:**
   - Implement MIDI messages to start (note_on) and stop (note_off) notes.
   - Ensure that the MIDI messages handle the start time and duration of each note appropriately.
   - Properly manage the ending of notes, ensuring that all notes are turned off at the end of the piece.

5. **Logging and Feedback:**
   - The system should log the positions and notes being processed during the conversion.
   - Upon successful conversion, the system should inform the user that the MIDI file has been saved and provide the file's location.

**Additional Notes:**
- The system should be built in Python using the `mido` library.
- Consider error handling for input file issues and data integrity during the parsing process.