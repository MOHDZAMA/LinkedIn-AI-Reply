import { createRoot, Root } from "react-dom/client";
import AIIcon from "./AIIcon";
import AIPopup from "./AIPopup";

const injectAIIcon = () => {
  const popupContainer = document.createElement("div");
  const iconContainer = document.createElement("div");
  iconContainer.id = "ai-icon";

  let popupRoot: Root | null = null;
  let iconRoot: Root | null = null;
  let isPopupOpen = false;
  let isIconClicked = false;

  const addAIIcon = () => {
    const messageInput = document.querySelector<HTMLDivElement>(
      "div.msg-form__contenteditable"
    );

    if (messageInput && !document.getElementById("ai-icon")) {
      messageInput.parentNode?.appendChild(iconContainer);

      if (!iconRoot) {
        iconRoot = createRoot(iconContainer);
        iconRoot.render(
          <AIIcon onMouseDown={handleIconMouseDown} onClick={handleIconClick} />
        );
      }

      // Attach event listeners for showing/hiding the icon
      messageInput.addEventListener("focus", handleInputFocus);
      messageInput.addEventListener("blur", handleInputBlur);
    }
  };

  const handleInputFocus = () => {
    iconContainer.style.display = "block";
  };

  const handleInputBlur = () => {
    // Delay hiding to allow for icon click handling
    setTimeout(() => {
      if (!isPopupOpen && !isIconClicked) {
        iconContainer.style.display = "none";
      }
      isIconClicked = false;
    }, 100);
  };

  const handleIconMouseDown = () => {
    isIconClicked = true;
  };

  const handleIconClick = () => {
    if (!isPopupOpen) {
      isPopupOpen = true;
      document.body.appendChild(popupContainer);
      popupRoot = createRoot(popupContainer);

      const closePopup = () => {
        isPopupOpen = false;
        popupRoot?.unmount();
        document.body.removeChild(popupContainer);
        iconContainer.style.display = "block";
      };

      popupRoot.render(<AIPopup closePopup={closePopup} />);
      iconContainer.style.display = "none";
    }
  };

  // Debounce the addAIIcon function to prevent excessive calls
  const debouncedAddAIIcon = debounce(addAIIcon, 300);

  // Set up MutationObserver to watch for DOM changes
  const observer = new MutationObserver(debouncedAddAIIcon);
  observer.observe(document.body, {
    childList: true,
    subtree: true,
  });

  // Initial call to add the icon
  addAIIcon();

  // Cleanup function
  return () => {
    observer.disconnect();
    popupRoot?.unmount();
    iconRoot?.unmount();
    popupContainer.remove();
    iconContainer.remove();
  };
};

// Debounce utility function
const debounce = (func: () => void, delay: number) => {
  let timeoutId: NodeJS.Timeout;
  return () => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(func, delay);
  };
};

export default injectAIIcon;
