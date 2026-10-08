import { ArrowLeft, LockKeyhole } from "lucide-react";
import { Link } from "wouter";
import { Header, PlaceholderLink } from "./brand";
import { settings } from "../lib/catalogue";

// Reusable shell: each future maker supplies its form and preview independently.
export function ToolShell({
  title,
  description,
  number,
  form,
  preview,
}: {
  title: string;
  description: string;
  number: number;
  form: React.ReactNode;
  preview: React.ReactNode;
}) {
  return (
    <>
      <Header compact />
      <main className="maker">
        <Link href="/" className="text-link back-link">
          <ArrowLeft size={16} />
          All tools
        </Link>
        <span className="eyebrow">SEA LOVERS / TOOL {String(number).padStart(2, "0")}</span>
        <h1>{title}</h1>
        <p className="maker-intro">{description}</p>
        <ol className="steps">
          {["Choose a style", "Add your details", "Preview", "Download"].map((step, i) => (
            <li key={step}>
              <span>{i + 1}</span>
              {step}
            </li>
          ))}
        </ol>
        <div className="maker-columns">
          <section className="maker-form" aria-label="Maker controls">
            {form}
          </section>
          <section className="maker-preview" aria-label="Live preview">
            {preview}
          </section>
        </div>
        <p className="privacy-note">
          Your details and photos stay in browser memory. Nothing is uploaded or saved to a server.
          Refreshing this page clears your work.
        </p>
      </main>
    </>
  );
}
export function FrameControl({
  removed,
  onChange,
}: {
  removed: boolean;
  onChange: (value: boolean) => void;
}) {
  return (
    <div className="frame-control">
      <div>
        <LockKeyhole size={16} />
        <strong>Remove frame</strong>
        <label className="switch">
          <input
            type="checkbox"
            aria-label="Remove Pontikus frame"
            checked={removed}
            disabled={settings.gateFrameRemoval}
            onChange={(e) => onChange(e.target.checked)}
          />
          <span />
        </label>
      </div>
      <p>
        Included with a verified profile ·{" "}
        <PlaceholderLink className="inline-link">Get verified</PlaceholderLink>
      </p>
      {!settings.gateFrameRemoval && (
        <small>Preview access: frame removal is unlocked for this review.</small>
      )}
    </div>
  );
}
