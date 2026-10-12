import { create } from "zustand";
import type { Format, Language } from "../../shared/contract";

interface PreviewState {
  language: Language;
  format: Format;
  settingsOpen: boolean;
  setFormat: (format: Format) => void;
  toggleLanguage: () => void;
  setSettingsOpen: (open: boolean) => void;
}

export const usePreviewStore = create<PreviewState>((set) => ({
  language: "en",
  format: "mp3",
  settingsOpen: false,
  setFormat: (format) => set({ format }),
  toggleLanguage: () =>
    set((state) => ({ language: state.language === "en" ? "es" : "en" })),
  setSettingsOpen: (settingsOpen) => set({ settingsOpen }),
}));
