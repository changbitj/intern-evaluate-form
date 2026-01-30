/**
 * Enum defining the types of evaluation criteria
 */
export enum CriteriaType {
  STRENGTH = 'STRENGTH',
  WEAKNESS = 'WEAKNESS',
  RECOMMENDATION = 'RECOMMENDATION',
  NOTE = 'NOTE',
}

/**
 * Interface representing a single evaluation criterion
 */
export interface EvaluationCriteria {
  id: string;
  text: string;
  type: CriteriaType;
  score: number; // 0 for unrated, 1-5 for rated
}

/**
 * Interface representing a candidate's complete evaluation
 */
export interface CandidateEvaluation {
  id: string;
  name: string; // Extracted name or "Intern X"
  positionRecommendation?: string;
  criteria: EvaluationCriteria[];
}

/**
 * Interface for the parse response structure
 */
export interface ParseResponse {
  candidates: CandidateEvaluation[];
}