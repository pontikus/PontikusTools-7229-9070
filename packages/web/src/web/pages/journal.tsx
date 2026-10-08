import { useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import { tools } from "../lib/catalogue";
import { ToolShell, FrameControl } from "../components/tool-shell";
import {
  CanvasPreview,
  Field,
  PhotoUpload,
  StyleChoices,
  useCanvasPages,
} from "../components/canvas-maker";
import { renderJournal, type JournalData, type JournalDay } from "../lib/journal-canvas";
const emptyDay = (): JournalDay => ({
  date: "",
  where: "",
  company: "",
  moment: "",
  weather: "",
  noticed: "",
  photos: [],
});
let draft: JournalData = {
  title: "Days by the sea",
  style: "classic",
  removeFrame: false,
  days: [
    {
      ...emptyDay(),
      where: "A quiet harbour",
      company: "Good company",
      moment: "Watching the boats return at dusk.",
      weather: "A light breeze, calm water.",
      noticed: "Salt on the windows of the harbour café.",
    },
  ],
};
export default function Journal() {
  const tool = tools.find((t) => t.slug === "journal")!;
  const [data, setData] = useState(draft),
    [active, setActive] = useState(0);
  const preview = useCanvasPages(data, renderJournal);
  const day = data.days[active];
  function update(patch: Partial<JournalData>) {
    setData((d) => {
      draft = { ...d, ...patch };
      return draft;
    });
  }
  function changeDay(patch: Partial<JournalDay>) {
    setData((d) => {
      draft = { ...d, days: d.days.map((day, i) => (i === active ? { ...day, ...patch } : day)) };
      return draft;
    });
  }
  const form = (
    <>
      <StyleChoices value={data.style} onChange={(style) => update({ style })} />
      <Field
        label="Journal title"
        value={data.title}
        maxLength={65}
        onChange={(title) => update({ title })}
      />
      <p className="sample-note">
        Sample prompts are filled in for day one. Replace them with your own memories. Up to seven
        days, three photos per day.
      </p>
      <div className="page-tabs" aria-label="Choose day to edit">
        {data.days.map((_, i) => (
          <button
            key={i}
            className={active === i ? "active" : ""}
            onClick={() => setActive(i)}
            aria-pressed={active === i}
          >
            Day {i + 1}
          </button>
        ))}
      </div>
      <div className="entry-heading">
        <strong>Day {active + 1}</strong>
        <button
          className="icon-button"
          aria-label={`Remove day ${active + 1}`}
          disabled={data.days.length === 1}
          onClick={() => {
            update({ days: data.days.filter((_, i) => i !== active) });
            setActive(Math.max(0, active - 1));
          }}
        >
          <Trash2 size={16} />
        </button>
      </div>
      <Field label="Date" type="date" value={day.date} onChange={(date) => changeDay({ date })} />
      {(
        [
          ["where", "Where"],
          ["company", "Who with"],
          ["moment", "Best moment"],
          ["weather", "Tide and weather"],
          ["noticed", "A small thing you noticed"],
        ] as const
      ).map(([key, label]) => (
        <Field
          key={key}
          label={label}
          value={day[key]}
          maxLength={key === "moment" || key === "noticed" ? 180 : 140}
          multiline
          onChange={(value) => changeDay({ [key]: value })}
        />
      ))}
      <PhotoUpload
        label={`Day ${active + 1} photographs`}
        multiple
        onPhoto={(photos) => changeDay({ photos: [...day.photos, ...photos].slice(0, 3) })}
      />
      <p className="sample-note">
        {day.photos.length}/3 photographs. New photos fill the remaining slots.
      </p>
      <div className="photo-thumbs">
        {day.photos.map((photo, i) => (
          <div key={i}>
            <img src={photo} alt={`Day ${active + 1}, photograph ${i + 1}`} />
            <button
              className="icon-button"
              aria-label={`Remove photograph ${i + 1}`}
              onClick={() => changeDay({ photos: day.photos.filter((_, n) => n !== i) })}
            >
              <Trash2 size={15} />
            </button>
          </div>
        ))}
      </div>
      <button
        className="button outline add-entry"
        disabled={data.days.length >= 7}
        onClick={() => {
          update({ days: [...data.days, emptyDay()] });
          setActive(data.days.length);
        }}
      >
        <Plus size={17} />
        Add a day ({data.days.length}/7)
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
      description="A guided record of where you went, who was there and the small things you’ll want to remember."
      form={form}
      preview={
        <CanvasPreview
          {...preview}
          title={tool.name}
          name="pontikus-trip-journal-A4"
          paper={[210, 297]}
          page={active}
          pageChange={setActive}
          description="One A4 page per day. PDF includes every day; PNGs are bundled in a ZIP when there’s more than one page."
        />
      }
    />
  );
}
