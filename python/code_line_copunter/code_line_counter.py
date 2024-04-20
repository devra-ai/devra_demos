import os

# Define the file extensions to search for and directories to ignore
defined_extensions = ['.py', '.html', '.js', '.jsx']
ignore_directories = ['node_modules', 'venv', '.git', '__pycache__', 'dist']

# Function to count lines in a file, ignoring lines with less than five characters
def count_lines(file_path):
    with open(file_path, 'r') as file:
        lines = file.readlines()
        return sum(1 for line in lines if len(line.strip()) >= 5)

# Recursive function to search through directories, ignoring specified directories
def search_directory(directory):
    total_lines = 0
    for root, dirs, files in os.walk(directory):
        dirs[:] = [d for d in dirs if d not in ignore_directories]  # Modify dirs in-place to ignore specified directories
        for file in files:
            if any(file.endswith(ext) for ext in defined_extensions):
                total_lines += count_lines(os.path.join(root, file))
    return total_lines

if __name__ == '__main__':
    directory_path = input('Enter the directory path to search: ')
    total_lines = search_directory(directory_path)
    print(f'Total lines (with >=5 characters): {total_lines}')