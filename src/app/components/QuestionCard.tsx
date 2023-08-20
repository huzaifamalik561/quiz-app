import React, { useState } from "react";

interface QuestionCardProps {
  question: string;
  options: string[];
  onSubmit: (selectedOption: string) => void;
}

const QuestionCard: React.FC<QuestionCardProps> = ({ question, options, onSubmit }) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const handleOptionSelect = (option: string) => {
    setSelectedOption(option);
  };

  const handleSubmit = () => {
    if (selectedOption !== null) {
      onSubmit(selectedOption);
    }
  };

  return (
    <div className="p-4 border border-gray-300 rounded-lg shadow-md">
      <p className="text-xl font-medium mb-4">{question}</p>
      <ul className="list-disc pl-6">
        {options.map((option) => (
          <li
            key={option}
            className={`cursor-pointer ${selectedOption === option ? "font-bold" : ""}`}
            onClick={() => handleOptionSelect(option)}
          >
            {option}
          </li>
        ))}
      </ul>
      <button
        onClick={handleSubmit}
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
      >
        Submit
      </button>
    </div>
  );
};

export default QuestionCard;
