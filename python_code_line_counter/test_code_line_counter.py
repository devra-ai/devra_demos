import unittest
import os
from python.code_line_copunter.code_line_counter import count_lines, search_directory

# Temporary directory and file setup for testing
os.mkdir('temp_test_dir')
with open('temp_test_dir/temp_test_file.py', 'w') as temp_file:
    temp_file.write("""def example_function():\n    print('Hello, World!')\n# This is a comment\n\n\n""")


class TestCodeLineCounter(unittest.TestCase):
    def test_count_lines(self):
        self.assertEqual(count_lines('temp_test_dir/temp_test_file.py'), 2, "Should count 2 lines")

    def test_search_directory(self):
        # This test assumes the temporary directory and file structure is known and controlled for testing
        result = search_directory('temp_test_dir')
        self.assertEqual(result, 2, "Should return the correct count of lines")

    @classmethod
    def tearDownClass(cls):
        os.remove('temp_test_dir/temp_test_file.py')
        os.rmdir('temp_test_dir')

if __name__ == '__main__':
    unittest.main()