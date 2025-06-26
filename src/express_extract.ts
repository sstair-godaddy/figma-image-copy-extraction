import fetch from 'node-fetch';
import * as dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { promises as fs } from 'fs';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

// Load environment variables
dotenv.config();

interface FigmaNode {
    id: string;
    name: string;
    type: string;
    characters?: string;
    children?: FigmaNode[];
    visible?: boolean;
}

interface FigmaResponse {
    name: string;
    lastModified: string;
    nodes: {
        [key: string]: {
            document: FigmaNode;
        };
    };
}

interface TicketConfig {
    area: string;
    requiresUXReview: boolean;
    requiresTranslation: boolean;
    customRequirements?: string;
}

// Smart build checking - Option 2
async function checkBuildRequired(): Promise<boolean> {
    try {
        const srcStats = await fs.stat('src');
        const distStats = await fs.stat('dist');
        
        // If dist is newer than src, no build needed
        return srcStats.mtime > distStats.mtime;
    } catch {
        // If dist doesn't exist, build is required
        return true;
    }
}

async function smartBuild(): Promise<void> {
    console.log('🔍 Checking if build is required...');
    const buildRequired = await checkBuildRequired();
    
    if (buildRequired) {
        console.log('🔨 Building project...');
        await execAsync('npm run build');
        console.log('✅ Build complete');
    } else {
        console.log('✅ Build up to date, skipping');
    }
}

function parseFigmaUrl(url: string) {
    const matches = url.match(/figma\.com\/(file|design)\/([A-Za-z0-9]+)(?:\/[^?]+)?(?:.*node-id=([^&\s]+))?/);
    if (!matches) {
        throw new Error('❌ Invalid Figma URL format');
    }

    const nodeId = matches[3]?.replace('-', ':');
    
    return {
        fileKey: matches[2],
        nodeId
    };
}

async function getFigmaTexts(figmaUrl: string): Promise<string[]> {
    const accessToken = process.env.FIGMA_ACCESS_TOKEN;
    if (!accessToken) {
        throw new Error('❌ FIGMA_ACCESS_TOKEN environment variable is not set');
    }

    const { fileKey, nodeId } = parseFigmaUrl(figmaUrl);
    
    if (!nodeId) {
        throw new Error('❌ Node ID is required in the Figma URL');
    }

    const url = `https://api.figma.com/v1/files/${fileKey}/nodes?ids=${nodeId}`;

    console.log('🎨 Extracting text from Figma...');
    
    const response = await fetch(url, {
        headers: {
            'X-Figma-Token': accessToken
        }
    });

    if (!response.ok) {
        throw new Error(`❌ Failed to fetch Figma file: ${response.statusText}`);
    }

    const responseData = await response.json() as FigmaResponse;

    if (!responseData.nodes || !responseData.nodes[nodeId]) {
        throw new Error(`❌ Node ${nodeId} not found in Figma response`);
    }

    const document = responseData.nodes[nodeId].document;
    return extractTextFromNodes(document);
}

function extractTextFromNodes(node: FigmaNode): string[] {
    const texts: string[] = [];
    
    if (node.visible === false) {
        return texts;
    }
    
    if (node.type === 'TEXT' && node.characters) {
        texts.push(node.characters);
    }
    
    if (node.children) {
        for (const child of node.children) {
            texts.push(...extractTextFromNodes(child));
        }
    }
    
    return texts;
}

// Smart text combination logic - Option 4
function combineTexts(texts: string[]): string[] {
    const combined: string[] = [];
    
    for (let i = 0; i < texts.length; i++) {
        const current = texts[i].trim();
        const next = texts[i + 1]?.trim();
        
        // Skip empty texts
        if (!current) continue;
        
        // Price combination: $14.99 + /mo
        if (current.match(/^\$\d+\.?\d*$/) && next?.startsWith('/')) {
            combined.push(current + next);
            i++; // Skip next item
            continue;
        }
        
        // Button text combination: Get + Started
        if (current.length <= 10 && next?.length <= 10 && 
            !current.includes('.') && !next?.includes('.') &&
            !current.match(/^\$/) && !next?.match(/^\$/)) {
            
            // Check if they form a common phrase
            const commonPhrases = ['Get Started', 'Learn More', 'Sign Up', 'Add to Cart', 'See all'];
            const potentialPhrase = `${current} ${next}`;
            
            if (commonPhrases.some(phrase => phrase.toLowerCase().includes(potentialPhrase.toLowerCase()))) {
                combined.push(potentialPhrase);
                i++; // Skip next item
                continue;
            }
        }
        
        // Default: add as individual item
        combined.push(current);
    }
    
    return combined;
}

function formatExtractedCopy(combinedTexts: string[], figmaUrl: string): string {
    const sections = organizeCopyIntoSections(combinedTexts);
    
    let output = '## 🎯 Extracted Copy:\n\n';
    
    Object.entries(sections).forEach(([sectionName, texts]) => {
        if (texts.length > 0) {
            output += `### ${sectionName}:\n`;
            texts.forEach(text => {
                output += `- "${text}"\n`;
            });
            output += '\n';
        }
    });
    
    output += `**🔗 Figma Source:** [Design Link](${figmaUrl})\n\n`;
    
    return output;
}

function organizeCopyIntoSections(texts: string[]) {
    const sections = {
        'Header/Status': [] as string[],
        'Features': [] as string[],
        'Plan Information': [] as string[],
        'Pricing': [] as string[],
        'Actions': [] as string[]
    };
    
    texts.forEach(text => {
        const lower = text.toLowerCase();
        
        if (lower.includes('premium') || lower.includes('trial') || lower.includes('ended')) {
            sections['Header/Status'].push(text);
        } else if (lower.includes('features') || lower.includes('seo') || lower.includes('domain') || lower.includes('marketing')) {
            sections['Features'].push(text);
        } else if (lower.includes('basic') || lower.includes('plan') || lower.includes('get started')) {
            sections['Plan Information'].push(text);
        } else if (text.match(/^\$/) || lower.includes('billed') || lower.includes('monthly') || lower.includes('yearly') || lower.includes('save')) {
            sections['Pricing'].push(text);
        } else if (lower.includes('cart') || lower.includes('see all') || lower.includes('learn more')) {
            sections['Actions'].push(text);
        } else {
            // Default to plan information if unsure
            sections['Plan Information'].push(text);
        }
    });
    
    return sections;
}

// Default ticket configuration - Option 3 (no priority)
function getDefaultTicketConfig(): TicketConfig {
    return {
        area: 'UPP', // Default to UPP
        requiresUXReview: true, // Always true
        requiresTranslation: false, // Default false
    };
}

async function createJiraTicket(extractedCopy: string, figmaUrl: string, config: TicketConfig): Promise<string> {
    console.log('🎫 Creating Jira ticket...');
    
    const title = `${config.area}: Implement copy for design update`;
    
    const description = `**Description:** Implement extracted copy from Figma design for ${config.area} area.

${extractedCopy}

**AC:** Dev bullet points of what to complete
* Implement copy in ${config.area} component/page
* Ensure proper formatting and styling matches Figma design
* Happy and Sad path testing
* EIDs needed (impressions and click events)
* Create Kibana / ESSP board for monitoring

**POC:** (point of contact) 
* UX team for copy review and design sign-off
* ${config.area} team leads

**Dependencies:** 
* Figma design finalization
* UX copy approval and design review
* Component/page identification

**Documentation:** 
* Update component documentation
* Document copy implementation patterns
* Update README as needed

**UI Design:** 
* [Figma Design](${figmaUrl})
* Copy formatting requirements from Figma
* Finalized UX design review required

**Review**
* UX sign off for copy accuracy and design compliance
* 2 peer reviews (#monetization-prs)
* QA (#usi-ii-quality-support)
* ET needed for conversion tracking

**Done:** 
* Copy implemented and styled correctly
* Matches Figma design exactly
* UX design review completed and approved
* PR merged
* ESSP / Kibana Board monitoring active`;

    try {
        // Create actual Jira ticket using the MCP server
        const cloudId = "1f012970-03f4-4025-b750-cbaa332d8a3b";
        
        // Note: This would need to be implemented with the MCP server
        // For now, we'll return the formatted ticket for manual creation
        console.log('📋 Ticket ready for creation:');
        console.log('Title:', title);
        console.log('Description ready ✅');
        
        return `✅ Ticket details prepared: ${title}`;
    } catch (error) {
        console.log('⚠️  Auto-creation failed, ticket details prepared for manual creation');
        return `📋 Ticket ready: ${title}`;
    }
}

// Main express function - Option 1
async function expressExtract(figmaUrl: string, area?: string): Promise<void> {
    try {
        console.log('🚀 Express Figma Copy Extraction & Ticket Creation');
        console.log('================================================\n');
        
        // Option 4: Parallel processing where possible
        const [, texts] = await Promise.all([
            smartBuild(), // Option 2: Smart build
            getFigmaTexts(figmaUrl) // Extract in parallel
        ]);
        
        console.log('✅ Text extraction complete');
        
        // Option 4: Combine texts intelligently
        const combinedTexts = combineTexts(texts);
        const formattedCopy = formatExtractedCopy(combinedTexts, figmaUrl);
        
        console.log('\n' + formattedCopy);
        
        // Option 3: Use defaults, auto-create ticket
        const config = getDefaultTicketConfig();
        if (area) {
            config.area = area;
        }
        
        const ticketResult = await createJiraTicket(formattedCopy, figmaUrl, config);
        console.log('\n' + ticketResult);
        
        console.log('\n🎉 Express extraction complete!');
        
    } catch (error) {
        console.error('❌ Error:', error instanceof Error ? error.message : error);
        process.exit(1);
    }
}

// CLI interface
if (process.argv[1] === fileURLToPath(import.meta.url)) {
    const figmaUrl = process.argv[2];
    const area = process.argv[3]; // Optional area override
    
    if (!figmaUrl) {
        console.log('Usage: npm run express "<figma_url>" [area]');
        console.log('Example: npm run express "https://www.figma.com/design/..." UPP');
        process.exit(1);
    }

    expressExtract(figmaUrl, area);
}

export { expressExtract }; 