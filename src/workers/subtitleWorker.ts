import { parentPort, workerData } from 'worker_threads';
import { AwsService } from '@services/awsService'; // Importing the AwsService, adjust if needed

// Function to break subtitle into tokens
async function tokenizeSubtitle(subtitle: string) {
    const lines = subtitle.split('\n'); // Split the subtitle into lines
    const tokens = []; // This will hold our tokens

    for (let lineNo = 0; lineNo < lines.length; lineNo++) {
        const line = lines[lineNo]; // Get the current line
        const parts = line.split(' '); // Split line into parts

        if (parts.length >= 3) { // Checking if we got enough parts
            const start = parseFloat(parts[0]); // Start time
            const end = parseFloat(parts[1]); // End time
            const text = parts.slice(2).join(' '); // Join the rest as text
            tokens.push({ line_no: lineNo + 1, text, start_time: start, end_time: end }); // Push the token into the array
        } else {
            console.warn(`Line ${lineNo + 1} ain't got enough parts: "${line}"`); // Warning for lines with not enough parts
        }
    }

    return tokens; // Return the tokens
}

async function main() {
    const s3Service = new AwsService(); // Create a new instance of the AwsService
    const { bucket, key } = workerData; // Get the bucket and key from worker data

    try {
        const subtitleData = await s3Service.getSubtitleFile(bucket, key); // Get the subtitle file from S3
        const tokens = await tokenizeSubtitle(subtitleData); // Tokenize the subtitle
        parentPort!.postMessage({ status: 'success', tokens }); // Send success message back to parent
    } catch (error) {
        // If something goes wrong, send error message back
        parentPort!.postMessage({ 
            status: 'error', 
            message: error instanceof Error ? error.message : String(error) 
        });
    }
}

main(); // Run the main function
