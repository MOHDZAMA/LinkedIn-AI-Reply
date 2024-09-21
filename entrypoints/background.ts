export default defineBackground(() => {
  console.log("Hello background!", { id: browser.runtime.id });
});

// chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
//   if (request.type === "generateReply") {
//     // Call your AI service here
//     sendResponse({
//       reply: "Thank you for the opportunity! If you have any more questions...",
//     });
//   }
// });
