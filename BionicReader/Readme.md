# Bionic Reader

Bionic Reader is a tool designed to enhance reading speed by modifying the text in a Microsoft Word document. Inspired by the Bionic Reading method, this script emboldens characters in each word according to predefined rules, enhancing readability and potentially increasing reading speed. The criteria for emboldening characters are as follows:

| Length of Word | Characters to be Bolded |
|---|---|
| 1-3 | 1 |
| 4-7 | 2 |
| 8-10 | 3 |
| 11 and above | 4 |

## Usage

To use this script:

1. Ensure Python is installed on your system.
2. Install the `python-docx` library using pip:
```
pip install python-docx
```
3. Place the Word document you wish to modify in the same directory as the script, naming it "test.docx".
4. Run the script. The script will create a modified version of the document, saved as "test_modified.docx" in the same directory.

## File Descriptions

- `BionicReader.py`: The Python script that performs the text modification.
- `test.docx`: A sample input Word document.
- `test_modified.docx`: The resulting modified Word document.

## Requirements

- Python 3.x
- python-docx library

## Author

Sreekanth Potlabathini

## Disclaimer

This tool is inspired by the Bionic Reading method but is not my original invention. It was developed as a hobby project and is available free of charge for non-commercial use. Feel free to copy and use the code for personal purposes without any cost.
