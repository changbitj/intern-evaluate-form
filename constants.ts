/**
 * Application-wide constants
 * Following MSG Coding Standard Rule 13.0: Use UPPER_SNAKE_CASE for constants
 */

// UI Constants
export const MAX_STARS = 5;
export const STAR_SIZE = 20;
export const MAX_CANDIDATES = 50;
export const DEFAULT_ROLE = 'Intern/Member';
export const MAX_LINE_LENGTH = 100;

// API Constants
export const GEMINI_MODEL = 'gemini-3-flash-preview';

// Sample Data
export const SAMPLE_EVALUATION_DATA = `Điểm mạnh:
Nam thể hiện sự nhiệt huyết cao trong công việc.
Có kiến thức cơ bản vững chắc về Java.
Hoàn thành tốt các nhiệm vụ được giao.
Điểm yếu:
Cần cải thiện sự cẩn trọng và chú ý đến chi tiết để đảm bảo chất lượng đầu ra tốt nhất trước khi bàn giao.
Khuyến nghị:
Cần bổ sung các chương trình đào tạo chuyên sâu hoặc huấn luyện thêm về quy trình kiểm soát chất lượng.`;

// AI Prompts
export const PARSE_EVALUATION_PROMPT = `
You are an expert HR Data Analyst. Your task is to analyze unstructured performance review notes and convert them into a structured evaluation form.

Input Text contains reviews for multiple interns/employees. 
The text is separated by headers like "Điểm mạnh", "Điểm yếu", "Khuyến nghị". 
Sometimes multiple reviews are pasted sequentially. 
The input might contain names (e.g., "Nam") or be generic.

Your goal:
1. Identify distinct candidate reviews from the text block.
2. If a name is mentioned (e.g., "Nam"), use it. If not, generate a placeholder like "Intern 1", "Intern 2".
3. Extract specific, assessable items from "Điểm mạnh" (Strengths) and "Điểm yếu" (Weaknesses).
4. Extract the "Khuyến nghị" (Recommendation) as a string.
5. Ignore general "Lưu ý" (Notes) unless they contain specific feedback about the candidate's performance.

Return a JSON object conforming to the schema.
`;

export const TEMPLATE_PROMPT = `
You are an HR Specialist creating a Standardized Evaluation Form.
Analyze the provided performance reviews (Strengths/Weaknesses).
Synthesize them into a distinct list of **Positive, Scorable Criteria** (attributes) that can apply to any intern.

Rules:
1. Deduplicate similar points (e.g., "Good Java", "Java knowledge" -> "Java Knowledge").
2. Convert Weaknesses into Positive Attributes for scoring (e.g., "Careless" -> "Carefulness & Attention to Detail").
3. Keep descriptions concise but clear (in Vietnamese).
4. Return a flat list of criteria. Set the 'type' to 'STRENGTH' for all items as they are now positive attributes.
`;

// CSV Export Constants
export const CSV_BOM = '\uFEFF';
export const CSV_MIME_TYPE = 'text/csv;charset=utf-8;';
export const CSV_FILE_PREFIX = 'evaluation_results_';

// Error Messages
export const ERROR_API_KEY_MISSING = 'API Key is missing.';
export const ERROR_NO_AI_RESPONSE = 'No response from AI';
export const ERROR_TEMPLATE_GENERATION = 'Failed to generate criteria template.';
export const ERROR_PARSE_EVALUATION = 'Failed to parse evaluation data.';
export const ERROR_CRITERIA_EXTRACTION = 'Could not extract criteria from the provided text.';
export const ERROR_ANALYSIS = 'An error occurred while analyzing the text. Please check your API key and try again.';
