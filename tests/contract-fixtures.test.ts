import fixture from "./contract-fixtures.json";
import en from "../shared/i18n/en.json";
import es from "../shared/i18n/es.json";
import type { DownloadRequest, Progress } from "../shared/contract";
import { describe, expect, it } from "vitest";

describe("shared contract fixtures", () => {
  it("keeps the TypeScript-facing request shape in camelCase", () => {
    const request = fixture.downloadRequest as DownloadRequest;
    expect(request).toMatchObject({
      format: "mp3",
      quality: { type: "audio", bitrate: 320 },
      isPlaylist: false,
    });
  });

  it("keeps playlist progress fields stable", () => {
    const progress = fixture.playlistProgress as Progress;
    expect(progress).toMatchObject({
      kind: "playlist",
      currentTitle: "Example",
      currentPercent: 42.5,
    });
  });

  it("keeps English and Spanish dictionaries complete", () => {
    expect(Object.keys(es).sort()).toEqual(Object.keys(en).sort());
  });
});
