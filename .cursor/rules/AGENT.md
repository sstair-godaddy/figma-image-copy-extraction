# Figma Text Extraction Agent

This agent helps you extract text content from Figma designs using the Figma API.

## Prerequisites

1. **Image Text Extraction**
   - If a image is added as a context, ignore the figma flow and extract the text from the image instead.
   - DO NOT do steps 2, 3.
   - DO NOT do the Setup and Usage
   - Use the same Output flow to combine the copy

2. **Figma Access Token**
   - Go to your Figma account settings
   - Navigate to Access Tokens
   - Create a new access token
   - Save this token for later use

3. **Node.js and npm**
   - Make sure you have Node.js installed (v14 or higher)
   - npm will be included with Node.js

## Setup

1. **Clone and Install Dependencies**
   ```bash
   git clone <repository-url>
   cd figma-copy-extraction
   npm install
   ```

2. **Environment Setup**
   The agent is pre-configured with the necessary environment settings. You do not need to set up or modify any environment files.
   
   Note: While the agent uses environment variables internally, all configuration is handled automatically. You can ignore any references to `.env` files or environment setup.

## Usage

1. **Get the Figma URL**
   - Open your Figma design
   - Select the frame/component you want to extract text from
   - Copy the URL from your browser
   - The URL should look like: `https://www.figma.com/file/xxxxx/Design?node-id=347:3746`
   - Note: Make sure the URL includes the `node-id` parameter

2. **Run the Extraction**
   ```bash
   npm run build
   npm start "your-figma-url-here"
   ```

   Example:
   ```bash
   npm start "https://www.figma.com/design/AAVSLBXkUL9s42AEobvwBs/Design?node-id=347-3746"
   ```

3. **Output**
   - The tool will extract all text elements from the specified node
   - Text will be displayed in numbered order
   - Hidden text elements will be skipped
   - Use your best judgement to combine copy where it makes sense. For example:

     Price formatting:
     ```
     1. $14.99
     2. /mo
     Should be combined as: "$14.99/mo"
     ```

     Button text:
     ```
     1. Get
     2. Started
     Should be combined as: "Get Started"
     ```

     Lists and paragraphs:
     ```
     1. Welcome to
     2. our platform
     3. where you can
     4. build amazing things
     Should be combined as: "Welcome to our platform where you can build amazing things"
     ```

   Note: Text elements are often split in Figma for design purposes (layout, styling, etc.), 
   but should be logically combined when extracting for content purposes.

## Troubleshooting

1. **"Node not found in Figma response"**
   - Check that your URL includes a valid node-id
   - Make sure you have access to the Figma file
   - Verify that your access token has the necessary permissions

2. **"Invalid Figma URL format"**
   - Ensure your URL is from Figma and includes the node-id
   - The node-id can be in either format: `347-3746` or `347:3746`

## Notes

- The tool will automatically convert node IDs from dash format (`347-3746`) to colon format (`347:3746`)
- Only visible text elements will be extracted
- The tool recursively extracts text from nested components
- Make sure you have appropriate access permissions to the Figma file

## Dependencies

- node-fetch
- dotenv
- TypeScript

## Security

- Keep your Figma access token secure
- Regularly rotate your access tokens for security 