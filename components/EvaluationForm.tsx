import React from 'react';
import { CandidateEvaluation } from '../types';
import { StarRating } from './StarRating';
import { User, ClipboardCheck, Briefcase, Download, RotateCcw } from 'lucide-react';
import { DEFAULT_ROLE, CSV_BOM, CSV_MIME_TYPE, CSV_FILE_PREFIX } from '../constants';

/**
 * Props for the EvaluationForm component
 */
interface EvaluationFormProps {
  candidates: CandidateEvaluation[];
  onUpdateScore: (candidateId: string, criteriaId: string, score: number) => void;
  onReset: () => void;
}

/**
 * Calculates the average score for a candidate
 * @param candidate - The candidate evaluation
 * @returns Average score as a string with one decimal place
 */
const calculateAverage = (candidate: CandidateEvaluation): string => {
  const ratedItems = candidate.criteria.filter((c) => c.score > 0);
  if (ratedItems.length === 0) {
    return '0';
  }

  const sum = ratedItems.reduce((acc, curr) => acc + curr.score, 0);
  return (sum / ratedItems.length).toFixed(1);
};

/**
 * Calculates the completion progress for a candidate
 * @param candidate - The candidate evaluation
 * @returns Progress percentage as a number
 */
const getProgress = (candidate: CandidateEvaluation): number => {
  const total = candidate.criteria.length;
  const completed = candidate.criteria.filter((c) => c.score > 0).length;
  return Math.round((completed / total) * 100);
};

/**
 * Escapes CSV field values
 * @param value - The value to escape
 * @returns Escaped CSV field
 */
const escapeCsvField = (value: string): string => {
  return `"${value.replace(/"/g, '""')}"`;
};

/**
 * EvaluationForm component for scoring candidates
 * @param props - Component props
 * @returns EvaluationForm component
 */
export const EvaluationForm: React.FC<EvaluationFormProps> = ({
  candidates,
  onUpdateScore,
  onReset,
}) => {
  /**
   * Exports evaluation data to CSV format
   */
  const handleExportCSV = () => {
    if (candidates.length === 0) {
      return;
    }

    // Prepare headers - assume all candidates share the same criteria structure
    const criteriaHeaders = candidates[0].criteria.map((c) => escapeCsvField(c.text));
    const headers = ['Candidate Name', 'Role', ...criteriaHeaders, 'Average Score', 'Progress'];

    // Prepare rows
    const rows = candidates.map((candidate) => {
      const name = escapeCsvField(candidate.name);
      const role = DEFAULT_ROLE;
      const scores = candidate.criteria.map((c) => c.score); // 0 if not rated
      const avg = calculateAverage(candidate);
      const progress = `${getProgress(candidate)}%`;

      return [name, role, ...scores, avg, progress].join(',');
    });

    // Combine with BOM for UTF-8 support in Excel
    const csvContent = CSV_BOM + [headers.join(','), ...rows].join('\n');

    // Trigger download
    const blob = new Blob([csvContent], { type: CSV_MIME_TYPE });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    const fileName = `${CSV_FILE_PREFIX}${new Date().toISOString().slice(0, 10)}.csv`;

    link.setAttribute('href', url);
    link.setAttribute('download', fileName);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="w-full max-w-6xl mx-auto space-y-8 pb-20">
      <div className="flex flex-col md:flex-row justify-between items-center bg-white p-4 rounded-lg shadow-sm gap-4">
        <div>
          <h2 className="text-xl font-bold text-gray-800">Scoring Dashboard</h2>
          <p className="text-sm text-gray-500">Rate the standardized criteria (1-5).</p>
        </div>

        <div className="flex gap-3">
          <button
            onClick={onReset}
            className="flex items-center gap-2 px-4 py-2 text-sm text-red-600 border border-red-200 rounded-md hover:bg-red-50 transition-colors"
          >
            <RotateCcw size={16} />
            Reset
          </button>

          <button
            onClick={handleExportCSV}
            className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-green-600 rounded-md hover:bg-green-700 transition-colors shadow-sm"
          >
            <Download size={16} />
            Export CSV
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-10">
        {candidates.map((candidate) => {
          const progress = getProgress(candidate);
          const average = calculateAverage(candidate);

          return (
            <div
              key={candidate.id}
              className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden"
            >
              {/* Header */}
              <div className="bg-gradient-to-r from-gray-50 to-white p-6 border-b border-gray-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center font-bold text-2xl shadow-inner">
                    <User size={28} />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">{candidate.name}</h3>
                    <div className="flex items-center gap-1 text-sm text-gray-500 mt-1">
                      <Briefcase size={14} />
                      <span>Role: {DEFAULT_ROLE}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-8 bg-white p-3 rounded-lg border border-gray-100 shadow-sm">
                  <div className="text-center min-w-[80px]">
                    <div className="text-xs text-gray-400 uppercase font-semibold tracking-wider">
                      Progress
                    </div>
                    <div className="text-lg font-bold text-gray-700">{progress}%</div>
                  </div>
                  <div className="w-px h-8 bg-gray-200" />
                  <div className="text-center min-w-[80px]">
                    <div className="text-xs text-gray-400 uppercase font-semibold tracking-wider">
                      Avg Score
                    </div>
                    <div className="text-2xl font-bold text-blue-600">{average}</div>
                  </div>
                </div>
              </div>

              {/* Body */}
              <div className="p-8">
                <div className="flex items-center gap-2 mb-6 pb-2 border-b border-gray-100">
                  <ClipboardCheck className="text-blue-500" size={20} />
                  <h4 className="font-semibold text-gray-800 text-lg">Evaluation Criteria</h4>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {candidate.criteria.map((item) => (
                    <div
                      key={item.id}
                      className="p-4 bg-gray-50 hover:bg-white hover:shadow-md transition-all rounded-lg border border-gray-200 group"
                    >
                      <div className="flex flex-col h-full justify-between gap-3">
                        <p className="text-sm font-medium text-gray-800 leading-snug">
                          {item.text}
                        </p>
                        <div className="flex justify-between items-end border-t border-gray-200 pt-3 mt-1">
                          <span className="text-xs text-gray-400">Score</span>
                          <StarRating
                            score={item.score}
                            onChange={(val) => onUpdateScore(candidate.id, item.id, val)}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {candidate.criteria.length === 0 && (
                  <p className="text-center text-gray-400 py-10">No criteria loaded.</p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};