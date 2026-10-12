import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import App from "./App";
import { usePreviewStore } from "./store/preview";

beforeEach(() => {
  usePreviewStore.setState({ language: "en", format: "mp3", settingsOpen: false });
});

afterEach(() => {
  cleanup();
});

describe("Gate 0A preview shell", () => {
  it("shows the header, input card, and empty queue/history states", () => {
    render(<App />);

    expect(screen.getByRole("banner")).toBeInTheDocument();
    expect(screen.getByLabelText(/enter url/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /convert/i })).toBeInTheDocument();
    expect(screen.getByText(/no active downloads/i)).toBeInTheDocument();
    expect(screen.getByText(/no history yet/i)).toBeInTheDocument();
  });

  it("switches all preview copy between English and Spanish", () => {
    render(<App />);

    fireEvent.click(screen.getByRole("button", { name: /change language/i }));
    expect(screen.getByRole("button", { name: /convertir/i })).toBeInTheDocument();
    expect(screen.getByText(/no hay descargas activas/i)).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: /cambiar idioma/i }));
    expect(screen.getByRole("button", { name: /convert/i })).toBeInTheDocument();
  });

  it("keeps the convert action inside the preview and opens/closes settings", () => {
    render(<App />);

    fireEvent.click(screen.getByRole("button", { name: /convert/i }));
    expect(screen.getByRole("status")).toHaveTextContent(/enter a url/i);

    fireEvent.click(screen.getByRole("button", { name: /settings/i }));
    expect(screen.getByRole("dialog")).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: /close/i }));
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });
});
