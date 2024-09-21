import React, { useState } from "react";

const App: React.FC = () => {
  const [responseCount, setResponseCount] = useState<number>(0);
  const [isDisabled, setIsDisabled] = useState<boolean>(false);

  const toggleDisable = () => {
    setIsDisabled((prev) => !prev);
  };

  return (
    <div className="p-4 bg-gray-800 text-white w-96 h-full  ">
      <h1 className="text-lg font-semibold">LinkedIn AI Assistant</h1>

      {isDisabled ? (
        <p className="mt-2 text-red-400">
          The extension is currently disabled.
        </p>
      ) : (
        <>
          <p className="mt-2">
            Welcome! Generate AI responses for LinkedIn messages quickly.
          </p>
          <p className="mt-2">
            Instructions: Click the toggle below to enable or disable the
            extension.
          </p>
          <p className="mt-2 font-bold ">
            Responses generated this month: {responseCount}
          </p>
        </>
      )}

      <div className="flex items-center mt-4">
        <span className="mr-2">{isDisabled ? "Disabled" : "Enabled"}</span>
        <button
          className={`w-10 h-6 rounded-full ${
            isDisabled ? "bg-red-500" : "bg-green-500"
          }`}
          onClick={toggleDisable}
        >
          <div
            className={`w-6 h-6 bg-white rounded-full transition-transform ${
              isDisabled ? "translate-x-0" : "translate-x-4"
            }`}
          />
        </button>
      </div>

      <img src="./icon/magic.svg" alt="Magic Icon" className="mt-4" />
    </div>
  );
};

export default App;
