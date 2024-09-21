import React, { useState, useCallback, useEffect } from "react";
import CustomButton from "./CustomButton";
import { fetchAIResponse } from "../utils/api";

interface AIPopupProps {
  closePopup: () => void;
}

const AIPopup: React.FC<AIPopupProps> = ({ closePopup }) => {
  const [userPrompt, setUserPrompt] = useState<string>(""); // User input for prompt
  const [aiResponse, setAIResponse] = useState<string>(""); // AI-generated response
  const [isGenerating, setIsGenerating] = useState<boolean>(false); // Loading state for AI response generation
  const [error, setError] = useState<string>(""); // Error message for UI feedback

  // Function to generate AI response
  const generateAIResponse = useCallback(async () => {
    if (!userPrompt) return;

    setIsGenerating(true);
    setError(""); // Clear previous errors
    try {
      const response = await fetchAIResponse(userPrompt);
      setAIResponse(response);
    } catch (err: any) {
      console.error("Failed to generate AI response:", err);
      setError("An error occurred while generating the response.");
    } finally {
      setIsGenerating(false);
    }
  }, [userPrompt]);

  // Insert generated response into the LinkedIn message box
  const insertResponse = () => {
    const searchInput = document.querySelector(
      "div.msg-form__contenteditable p"
    );
    const searchLabel = document.querySelector("div.msg-form__contenteditable");
    const searchLabel2 = document.querySelector("div.msg-form__placeholder");

    if (searchInput && searchLabel && searchLabel2) {
      searchInput.innerHTML = aiResponse;
      searchLabel.setAttribute("aria-label", "");
      searchLabel2.setAttribute("aria-hidden", "false");
      searchLabel2.setAttribute("data-placeholder", "");
      searchLabel2.textContent = "";

      // Reset inputs and close the popup
      setUserPrompt("");
      setAIResponse("");
      closePopup();
    } else {
      console.error("One or more elements not found:", {
        searchInput,
        searchLabel,
        searchLabel2,
      });
    }
  };

  // Clear error message after 3 seconds
  useEffect(() => {
    if (aiResponse) {
      const timer = setTimeout(() => setError(""), 3000);
      return () => clearTimeout(timer);
    }
  }, [aiResponse]);

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
      onClick={closePopup}
      role="dialog"
      aria-labelledby="ai-popup"
    >
      <div
        className="w-[500px] overflow-hidden bg-white shadow-lg p-4 gap-4 rounded-xl z-50 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 id="ai-popup" className="sr-only">
          AI Response Generator
        </h2>
        {error && <div className="text-red-600">{error}</div>}{" "}
        {/* Display error message */}
        {/* Display generated response */}
        {aiResponse && (
          <div className="mt-4">
            <div className="w-full flex justify-end">
              <div className="max-w-[75%] p-2 mb-6 bg-[#dfe1e7] rounded-xl text-[#666d80] text-2xl leading-9">
                {userPrompt}
              </div>
            </div>
            <div className="max-w-[75%] p-2 bg-blue-100 rounded-xl text-[#666d80] text-2xl leading-9 mb-6">
              {aiResponse}
            </div>
          </div>
        )}
        <input
          className="w-full max-w-[818px] max-h-[61px] p-3 rounded-lg mb-4 border border-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500"
          placeholder="Your Prompt"
          value={aiResponse ? "" : userPrompt} // Clear input field after response generation
          onChange={(e) => setUserPrompt(e.target.value)}
          aria-label="User Prompt"
        />
        <div className="flex justify-end gap-4">
          {aiResponse ? (
            <>
              <CustomButton
                label="Insert"
                icon="/icon/insert.svg"
                onClick={insertResponse} // Insert AI response into message box
                className="custom-button max-w-[129px] bg-white text-[#666d80]"
              />
              <CustomButton
                label="Regenerate"
                icon="/icon/regenerate.svg"
                onClick={generateAIResponse} // Regenerate AI response
                isLoading={isGenerating}
                className="bg-blue-500 text-white"
              />
            </>
          ) : (
            <CustomButton
              label="Generate"
              icon="/icon/generate.svg"
              onClick={generateAIResponse} // Generate AI response
              isLoading={isGenerating}
              disabled={!userPrompt}
              className="bg-blue-500 text-white"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default AIPopup;
