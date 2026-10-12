import { useState } from "react";
import { translate } from "./i18n";
import { GlobeIcon, LogoIcon, SettingsIcon, TrashIcon } from "./icons";
import { usePreviewStore } from "./store/preview";

function Panel({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <section className={`rounded-2xl border border-[var(--border)] bg-[var(--panel)] ${className}`}>{children}</section>;
}

function Header({ onSettings }: { onSettings: () => void }) {
  const language = usePreviewStore((state) => state.language);
  const toggleLanguage = usePreviewStore((state) => state.toggleLanguage);
  const t = (key: Parameters<typeof translate>[1]) => translate(language, key);

  return (
    <header className="flex h-[86px] items-center justify-between border-b border-[var(--border)] px-6 sm:px-10 lg:px-14" role="banner">
      <div className="flex items-center gap-3 text-white">
        <LogoIcon className="h-7 w-7 text-[var(--accent)]" />
        <span className="text-[20px] font-semibold tracking-[-0.03em]">{t("brand")}</span>
      </div>
      <div className="flex items-center gap-4 text-[var(--muted)]">
        <button className="icon-button" type="button" onClick={toggleLanguage} aria-label={t("changeLanguage")}>
          <GlobeIcon className="h-6 w-6" />
          <span className="text-sm font-medium text-[var(--text)]">{t("language")}</span>
        </button>
        <button className="icon-button" type="button" onClick={onSettings} aria-label={t("settings")}>
          <SettingsIcon className="h-6 w-6" />
        </button>
      </div>
    </header>
  );
}

function InputCard() {
  const language = usePreviewStore((state) => state.language);
  const format = usePreviewStore((state) => state.format);
  const setFormat = usePreviewStore((state) => state.setFormat);
  const t = (key: Parameters<typeof translate>[1]) => translate(language, key);
  const [url, setUrl] = useState("");
  const [notice, setNotice] = useState(false);

  function handleConvert() {
    setNotice(true);
  }

  return (
    <Panel className="p-6 sm:p-8 lg:p-10">
      <div className="mb-3 flex items-center justify-between gap-4">
        <label className="text-[17px] font-medium text-[var(--text)]" htmlFor="url-input">
          {t("inputTitle")}
        </label>
        <span className="rounded-full border border-[var(--border)] px-3 py-1 text-[11px] uppercase tracking-[0.14em] text-[var(--muted)]">
          {t("previewLabel")}
        </span>
      </div>
      <input
        id="url-input"
        className="field"
        type="url"
        value={url}
        onChange={(event) => setUrl(event.target.value)}
        placeholder={t("urlPlaceholder")}
        autoComplete="off"
      />

      <fieldset className="mt-7">
        <legend className="mb-3 text-[17px] font-medium text-[var(--text)]">{t("format")}</legend>
        <div className="grid gap-3 sm:grid-cols-2">
          {(["mp3", "mp4"] as const).map((option) => (
            <label key={option} className={`format-option ${format === option ? "format-option-active" : ""}`}>
              <input
                className="sr-only"
                type="radio"
                name="format"
                value={option}
                checked={format === option}
                onChange={() => setFormat(option)}
              />
              <span>{t(option)}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <button className="primary-button mt-7" type="button" onClick={handleConvert}>
        {t("convert")}
      </button>
      {notice && (
        <p className="mt-4 rounded-lg border border-[var(--accent)]/40 bg-[var(--accent)]/10 px-4 py-3 text-sm text-[var(--text)]" role="status">
          {url ? t("previewNotice") : t("urlRequired")}
        </p>
      )}
    </Panel>
  );
}

function QueueCard() {
  const language = usePreviewStore((state) => state.language);
  const t = (key: Parameters<typeof translate>[1]) => translate(language, key);
  return (
    <Panel className="p-6 sm:p-7">
      <h2 className="section-title">{t("queue")}</h2>
      <p className="empty-state">{t("noActiveDownloads")}</p>
    </Panel>
  );
}

function HistoryCard() {
  const language = usePreviewStore((state) => state.language);
  const t = (key: Parameters<typeof translate>[1]) => translate(language, key);
  return (
    <Panel className="p-6 sm:p-7">
      <div className="flex items-center justify-between gap-4">
        <h2 className="section-title">{t("history")}</h2>
        <button className="icon-button text-[var(--muted)]" type="button" aria-label={t("clearHistory")}>
          <TrashIcon className="h-5 w-5" />
        </button>
      </div>
      <p className="empty-state">{t("noHistory")}</p>
    </Panel>
  );
}

function SettingsPanel({ onClose }: { onClose: () => void }) {
  const language = usePreviewStore((state) => state.language);
  const t = (key: Parameters<typeof translate>[1]) => translate(language, key);
  return (
    <div className="fixed inset-0 z-10 flex items-start justify-center bg-black/65 p-4 pt-24" role="dialog" aria-modal="true" aria-labelledby="settings-title">
      <Panel className="w-full max-w-lg p-6 sm:p-8">
        <div className="flex items-center justify-between gap-4">
          <h2 id="settings-title" className="text-xl font-semibold text-white">{t("settingsTitle")}</h2>
          <button className="secondary-button" type="button" onClick={onClose}>{t("close")}</button>
        </div>
        <div className="mt-8 border-t border-[var(--border)] pt-6">
          <p className="text-sm font-medium text-[var(--text)]">{t("languageSetting")}</p>
          <p className="mt-2 text-sm text-[var(--muted)]">{t("english")} / {t("spanish")}</p>
        </div>
        <p className="mt-6 text-sm leading-6 text-[var(--muted)]">{t("developerInfo")}</p>
      </Panel>
    </div>
  );
}

export default function App() {
  const settingsOpen = usePreviewStore((state) => state.settingsOpen);
  const setSettingsOpen = usePreviewStore((state) => state.setSettingsOpen);

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--text)]">
      <Header onSettings={() => setSettingsOpen(true)} />
      <main className="mx-auto grid w-full max-w-[1440px] gap-7 px-5 py-8 sm:px-8 lg:px-12 lg:py-10 xl:grid-cols-[minmax(0,2fr)_minmax(280px,1fr)]">
        <div>
          <InputCard />
        </div>
        <aside className="space-y-5">
          <QueueCard />
          <HistoryCard />
        </aside>
      </main>
      {settingsOpen && <SettingsPanel onClose={() => setSettingsOpen(false)} />}
    </div>
  );
}
