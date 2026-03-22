const root = document.documentElement;
const themeButton = document.getElementById("themeToggle");
const themeIcon = document.getElementById("themeIcon");
const liveEditorInput = document.getElementById("liveEditorInput");
const livePreviewCard = document.getElementById("livePreviewCard");
const liveClassOutput = document.getElementById("liveClassOutput");
const liveTitleInput = document.getElementById("liveTitleInput");
const liveDescriptionInput = document.getElementById("liveDescriptionInput");
const livePreviewTitle = document.getElementById("livePreviewTitle");
const livePreviewDescription = document.getElementById(
  "livePreviewDescription",
);
const resetLiveEditor = document.getElementById("resetLiveEditor");
const runtimeStatus = document.getElementById("runtimeStatus");

const defaultLiveClasses =
  "flex items-center gap-6 p-8 bg-surface rounded-2xl border border-outline-variant/10 shadow-lg relative z-10 w-full max-w-sm";
const defaultLiveTitle = "Fast.";
const defaultLiveDescription = "No build required.";

function setThemeIcon() {
  const isDark = root.classList.contains("dark");
  themeIcon.textContent = isDark ? "light_mode" : "dark_mode";
  themeButton.setAttribute(
    "aria-label",
    isDark ? "Switch to light mode" : "Switch to dark mode",
  );
}

if (themeButton && themeIcon) {
  setThemeIcon();

  themeButton.addEventListener("click", () => {
    root.classList.toggle("dark");
    setThemeIcon();
  });
}

function updateLivePreview() {
  if (!liveEditorInput || !livePreviewCard || !liveClassOutput) {
    return;
  }

  const value = liveEditorInput.value.trim();
  const nextClasses = value || defaultLiveClasses;

  livePreviewCard.className = nextClasses;
  liveClassOutput.textContent = nextClasses;

  if (runtimeStatus) {
    runtimeStatus.textContent = value
      ? "Runtime: Active"
      : "Runtime: Active (default classes)";
  }
}

if (liveEditorInput && livePreviewCard && liveClassOutput) {
  updateLivePreview();
  liveEditorInput.addEventListener("input", updateLivePreview);
}

function updateLiveTextPreview() {
  if (
    !liveTitleInput ||
    !liveDescriptionInput ||
    !livePreviewTitle ||
    !livePreviewDescription
  ) {
    return;
  }

  livePreviewTitle.textContent =
    liveTitleInput.value.trim() || defaultLiveTitle;
  livePreviewDescription.textContent =
    liveDescriptionInput.value.trim() || defaultLiveDescription;
}

if (
  liveTitleInput &&
  liveDescriptionInput &&
  livePreviewTitle &&
  livePreviewDescription
) {
  updateLiveTextPreview();
  liveTitleInput.addEventListener("input", updateLiveTextPreview);
  liveDescriptionInput.addEventListener("input", updateLiveTextPreview);
}

if (resetLiveEditor && liveEditorInput) {
  resetLiveEditor.addEventListener("click", () => {
    liveEditorInput.value = defaultLiveClasses;
    if (liveTitleInput) {
      liveTitleInput.value = defaultLiveTitle;
    }
    if (liveDescriptionInput) {
      liveDescriptionInput.value = defaultLiveDescription;
    }
    updateLivePreview();
    updateLiveTextPreview();
  });
}
