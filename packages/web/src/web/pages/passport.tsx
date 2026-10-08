import { useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import { tools } from "../lib/catalogue";
import { ToolShell, FrameControl } from "../components/tool-shell";
import { CanvasPreview, Field, StyleChoices, useCanvasPages } from "../components/canvas-maker";
import { renderPassport, type PassportData, type Visit } from "../lib/passport-canvas";
let draft: PassportData = {
  name: "Alex",
  style: "classic",
  removeFrame: false,
  visits: [{ place: "A quiet harbour", date: "", note: "The sound of rigging in the breeze." }],
};
export default function Passport() {
  const tool = tools.find((t) => t.slug === "passport")!;
  const [data, setData] = useState(draft);
  const [page, setPage] = useState(0);
  const preview = useCanvasPages(data, renderPassport);
  function update(patch: Partial<PassportData>) {
    setData((d) => {
      draft = { ...d, ...patch };
      return draft;
    });
  }
  function visit(index: number, patch: Partial<Visit>) {
    update({ visits: data.visits.map((v, i) => (i === index ? { ...v, ...patch } : v)) });
  }
  const form = (
    <>
      <StyleChoices value={data.style} onChange={(style) => update({ style })} />
      <Field
        label="Your name"
        value={data.name}
        maxLength={45}
        onChange={(name) => update({ name })}
      />
      <p className="sample-note">
        Sample entry shown. Replace it with a place you’ve visited. Up to 12 places on one A4 page.
      </p>
      {data.visits.map((v, i) => (
        <div className="entry-card" key={i}>
          <div className="entry-heading">
            <strong>Place {i + 1}</strong>
            <button
              className="icon-button"
              aria-label={`Remove place ${i + 1}`}
              disabled={data.visits.length === 1}
              onClick={() => update({ visits: data.visits.filter((_, n) => n !== i) })}
            >
              <Trash2 size={16} />
            </button>
          </div>
          <Field
            label={`Place ${i + 1} name`}
            value={v.place}
            maxLength={60}
            onChange={(place) => visit(i, { place })}
          />
          <Field
            label={`Place ${i + 1} date`}
            type="date"
            value={v.date}
            onChange={(date) => visit(i, { date })}
          />
          <Field
            label={`Place ${i + 1} note`}
            maxLength={65}
            value={v.note}
            onChange={(note) => visit(i, { note })}
          />
        </div>
      ))}
      <button
        className="button outline add-entry"
        disabled={data.visits.length >= 12}
        onClick={() => update({ visits: [...data.visits, { place: "", date: "", note: "" }] })}
      >
        <Plus size={17} />
        Add a place ({data.visits.length}/12)
      </button>
      <FrameControl
        removed={data.removeFrame}
        onChange={(removeFrame) => update({ removeFrame })}
      />
    </>
  );
  return (
    <ToolShell
      title={tool.name}
      number={tool.number}
      audience={tool.audience}
      description="Collect up to twelve coastal memories as stamp-style entries on a personal passport page."
      form={form}
      preview={
        <CanvasPreview
          {...preview}
          title={tool.name}
          name="pontikus-passport-A4"
          paper={[210, 297]}
          page={page}
          pageChange={setPage}
          description="A stamp-style keepsake. This is a personal record, not an official passport or verified travel document."
        />
      }
    />
  );
}
