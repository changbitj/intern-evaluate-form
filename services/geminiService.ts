import { GoogleGenAI, Type, Schema } from '@google/genai';
import { CandidateEvaluation, CriteriaType, EvaluationCriteria } from '../types';
import {
  GEMINI_MODEL,
  PARSE_EVALUATION_PROMPT,
  TEMPLATE_PROMPT,
  ERROR_API_KEY_MISSING,
  ERROR_NO_AI_RESPONSE,
  ERROR_TEMPLATE_GENERATION,
  ERROR_PARSE_EVALUATION,
} from '../constants';

/**
 * Creates a standardized criteria template from reference text using AI
 * @param referenceText - The reference evaluation text to analyze
 * @returns Promise resolving to an array of evaluation criteria
 * @throws Error if API key is missing or AI generation fails
 */
export const createCriteriaTemplate = async (
  referenceText: string,
): Promise<EvaluationCriteria[]> => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    throw new Error(ERROR_API_KEY_MISSING);
  }

  const ai = new GoogleGenAI({ apiKey });

  const schema: Schema = {
    type: Type.OBJECT,
    properties: {
      criteria: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            id: { type: Type.STRING },
            text: {
              type: Type.STRING,
              description: 'The standardized criteria label (e.g. \'Kỹ năng Java\', \'Thái độ làm việc\')',
            },
            type: { type: Type.STRING, enum: [CriteriaType.STRENGTH] },
            score: { type: Type.NUMBER, description: 'Always 0' },
          },
          required: ['id', 'text', 'type', 'score'],
        },
      },
    },
  };

  try {
    const response = await ai.models.generateContent({
      model: GEMINI_MODEL,
      contents: [
        { role: 'user', parts: [{ text: TEMPLATE_PROMPT }] },
        { role: 'user', parts: [{ text: `Reference Data:\n${referenceText}` }] },
      ],
      config: {
        responseMimeType: 'application/json',
        responseSchema: schema,
      },
    });

    const text = response.text;
    if (!text) {
      throw new Error(ERROR_NO_AI_RESPONSE);
    }

    const data = JSON.parse(text);
    return data.criteria;
  } catch (error) {
    console.error('Gemini Template Error:', error);
    throw new Error(ERROR_TEMPLATE_GENERATION);
  }
};

/**
 * Parses raw evaluation text into structured candidate evaluations using AI
 * @param rawText - The raw evaluation text to parse
 * @returns Promise resolving to an array of candidate evaluations
 * @throws Error if API key is missing or parsing fails
 */
export const parseRawEvaluations = async (rawText: string): Promise<CandidateEvaluation[]> => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    throw new Error(ERROR_API_KEY_MISSING);
  }

  const ai = new GoogleGenAI({ apiKey });

  const schema: Schema = {
    type: Type.OBJECT,
    properties: {
      candidates: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            id: { type: Type.STRING },
            name: { type: Type.STRING },
            positionRecommendation: { type: Type.STRING },
            criteria: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  id: { type: Type.STRING },
                  text: {
                    type: Type.STRING,
                    description: 'The specific observation or behavior to evaluate.',
                  },
                  type: {
                    type: Type.STRING,
                    enum: [CriteriaType.STRENGTH, CriteriaType.WEAKNESS],
                  },
                  score: { type: Type.NUMBER, description: 'Initialize to 0' },
                },
                required: ['id', 'text', 'type', 'score'],
              },
            },
          },
          required: ['id', 'name', 'criteria'],
        },
      },
    },
  };

  try {
    const response = await ai.models.generateContent({
      model: GEMINI_MODEL,
      contents: [
        { role: 'user', parts: [{ text: PARSE_EVALUATION_PROMPT }] },
        { role: 'user', parts: [{ text: `Here is the raw text to parse:\n\n${rawText}` }] },
      ],
      config: {
        responseMimeType: 'application/json',
        responseSchema: schema,
        systemInstruction: 'You are a precise data extraction engine. Split the input text into individual candidate profiles accurately.',
      },
    });

    const text = response.text;
    if (!text) {
      throw new Error(ERROR_NO_AI_RESPONSE);
    }

    const data = JSON.parse(text);
    return data.candidates;
  } catch (error) {
    console.error('Gemini Parse Error:', error);
    throw new Error(ERROR_PARSE_EVALUATION);
  }
};