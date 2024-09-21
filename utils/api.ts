// Simulated AI response fetch function
export const fetchAIResponse = async (input: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (input) {
        resolve(
          "Thank you for the opportunity! If you have any more questions or if there's anything else I can help you with, feel free to ask."
        );
      } else {
        reject(new Error("Invalid input"));
      }
    }, 1000); // Simulate 1-second API call delay
  });
};
