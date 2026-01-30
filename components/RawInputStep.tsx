import React, { useState } from 'react';
import { Loader2, Wand2, Users } from 'lucide-react';
import { SAMPLE_EVALUATION_DATA, MAX_CANDIDATES } from '../constants';

/**
 * Props for the SetupStep component
 */
interface SetupStepProps {
  onGenerate: (referenceText: string, candidates: string[]) => void;
  isProcessing: boolean;
}

const MIN_CANDIDATES = 1;
const DEFAULT_CANDIDATE_COUNT = 1;

/**
 * SetupStep component for initial evaluation setup
 * Allows users to input reference text and candidate names
 * @param props - Component props
 * @returns SetupStep component
 */
export const SetupStep: React.FC<SetupStepProps> = ({ onGenerate, isProcessing }) => {
  const [referenceText, setReferenceText] = useState('');
  const [candidateCount, setCandidateCount] = useState<number>(DEFAULT_CANDIDATE_COUNT);
  const [candidateNames, setCandidateNames] = useState<string[]>(['']);

  /**
   * Handles changes to candidate count input
   * Adjusts the candidateNames array size accordingly
   */
  const handleCountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const count = Math.max(MIN_CANDIDATES, parseInt(e.target.value) || 0);
    setCandidateCount(count);

    const newNames = [...candidateNames];
    if (count > newNames.length) {
      for (let i = newNames.length; i < count; i++) {
        newNames.push('');
      }
    } else {
      newNames.splice(count);
    }
    setCandidateNames(newNames);
  };

  /**
   * Handles changes to individual candidate name inputs
   */
  const handleNameChange = (index: number, value: string) => {
    const newNames = [...candidateNames];
    newNames[index] = value;
    setCandidateNames(newNames);
  };

  /**
   * Handles form submission
   * Generates evaluation forms with valid candidate names
   */
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!referenceText.trim()) {
      return;
    }

    const validNames = candidateNames.map((n) => n.trim()).filter((n) => n !== '');
    const finalNames = validNames.length > 0
      ? validNames
      : Array.from({ length: candidateCount }, (_, i) => `Intern ${i + 1}`);

    onGenerate(referenceText, finalNames);
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
          <Wand2 className="text-blue-600" />
          1. Define Criteria Source
        </h2>
        <p className="text-gray-600 mb-4">
          Paste previous reviews or example criteria below. The AI will synthesize them into a
          standard scoring form.
        </p>
        <div className="relative">
          <textarea
            value={referenceText}
            onChange={(e) => setReferenceText(e.target.value)}
            placeholder="Paste text like: 'Điểm mạnh: ... Điểm yếu: ...'"
            className="w-full h-48 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-y font-mono text-sm"
            disabled={isProcessing}
          />
          <button
            type="button"
            onClick={() => setReferenceText(SAMPLE_EVALUATION_DATA)}
            className="absolute bottom-4 right-4 text-xs bg-gray-100 hover:bg-gray-200 text-gray-600 px-3 py-1 rounded border border-gray-300 transition-colors"
            disabled={isProcessing}
          >
            Load Example
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
          <Users className="text-indigo-600" />
          2. Candidate List
        </h2>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Number of Candidates
          </label>
          <input
            type="number"
            min={MIN_CANDIDATES}
            max={MAX_CANDIDATES}
            value={candidateCount}
            onChange={handleCountChange}
            className="w-32 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-60 overflow-y-auto pr-2">
          {candidateNames.map((name, index) => (
            <div key={index} className="flex items-center gap-2">
              <span className="text-sm text-gray-400 w-6 text-right">{index + 1}.</span>
              <input
                type="text"
                placeholder={`Candidate Name ${index + 1}`}
                value={name}
                onChange={(e) => handleNameChange(index, e.target.value)}
                className="flex-1 p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 text-sm"
              />
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-end">
        <button
          onClick={handleSubmit}
          disabled={!referenceText.trim() || isProcessing}
          className={`flex items-center gap-2 px-8 py-4 rounded-lg font-bold text-white text-lg transition-all shadow-lg ${!referenceText.trim() || isProcessing
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 hover:shadow-xl hover:scale-105 transform'
            }`}
        >
          {isProcessing ? (
            <>
              <Loader2 className="animate-spin" size={24} />
              Synthesizing Form...
            </>
          ) : (
            <>Create Evaluation Forms</>
          )}
        </button>
      </div>
    </div>
  );
};