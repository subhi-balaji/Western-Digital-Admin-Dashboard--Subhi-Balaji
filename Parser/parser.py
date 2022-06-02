# CSV Parser by Sofia Figueroa, sfigueroa12@ucmerced.edu               #
# ==================================================================== #
# row[ 0] host_hostname                                                #
# row[ 3] disk_bytes_read -> in bytes (convert to string, format)      #
# row[ 4] disk_bytes_written -> in bytes (convert to string, format)   #
# row[ 6] elapsed_time -> seconds (convert to string, days)            #
# row[11] name                                                         #
# row[15] path                                                         #
# row[24] start_time -> UNIX time (convert to string, date)            #
# ==================================================================== #

import csv
import sys
from datetime import datetime
from humanfriendly import format_size

def convert(row):
    # Convert Disk Byte Information
    row[3] = format_size(int(row[3]))
    row[4] = format_size(int(row[4]))
    # Convert elapsed_time from seconds to days
    row[6] = round(int(row[6]) / 60 / 60 / 24)
    # Convert start time from UNIX to Standard Formatting
    row[24] = datetime.utcfromtimestamp(int(row[24])).strftime('%Y-%m-%d %H:%M:%S')

def parseFile(file):
    with open(file, 'r') as csv_file:
        # Initialize Reader and new parsed CSV file
        reader = csv.reader(csv_file,doublequote=False,escapechar='\\',quoting=csv.QUOTE_MINIMAL)
        parsed_csv = open('searchinfos.csv', 'w')

        # Set Flag to avoid header row
        i = 0

        # Write to Parsed CSV
        for row in reader:
            if (i != 0):
                convert(row)
            rowdata = f"{row[0]},{row[3]},{row[4]},{row[6]},{row[11]},{row[15]},{row[24]}\n"
            parsed_csv.write(rowdata)

            i = 1
            
        # Clean up and close all files in use
        csv_file.close()
        parsed_csv.close()

def main():
    try:
        parseFile(str(sys.argv[1]))
    except:
        print("Usage: python3 parser.py <file_name.csv>")

if __name__ == "__main__":
    main()