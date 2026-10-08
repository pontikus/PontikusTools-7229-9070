import { useState } from "react";
import { tools } from "../lib/catalogue";
import { asset } from "../lib/asset";
import { ToolShell, FrameControl } from "../components/tool-shell";
import {
  CanvasPreview,
  Field,
  PhotoUpload,
  StyleChoices,
  useCanvasPages,
} from "../components/canvas-maker";
import { renderPhotoFrame, type PhotoFrameData } from "../lib/photo-frame-canvas";
const SAMPLE_PHOTO = asset("/images/coast.jpg");
let draft: PhotoFrameData = {
  photo: SAMPLE_PHOTO,
  caption: "A moment by the sea.",
  location: "The coast",
  credit: "",
  style: "classic",
  format: "square",
  removeFrame: false,
};
export default function PhotoFrame() {
  const tool = tools.find((t) => t.slug === "photo-frame")!;
  const [data, setData] = useState(draft),
    [page, setPage] = useState(0);
  const preview = useCanvasPages(data, renderPhotoFrame);
  function update(patch: Partial<PhotoFrameData>) {
    setData((d) => {
      draft = { ...d, ...patch };
      return draft;
    });
  }
  const form = (
    <>
      <StyleChoices value={data.style} onChange={(style) => update({ style })} />
      <label className="field">
        Export format
        <select
          aria-label="Export format"
          value={data.format}
          onChange={(e) => update({ format: e.target.value as PhotoFrameData["format"] })}
        >
          <option value="square">Square · 1080 × 1080</option>
          <option value="vertical">Vertical · 1080 × 1920</option>
        </select>
      </label>
      <PhotoUpload
        onPhoto={(photos) => {
          if (photos[0]) update({ photo: photos[0] });
        }}
      />
      {data.photo === SAMPLE_PHOTO && (
        <p className="sample-note">
          Sample coastal photograph shown. Add your own photograph to replace it.
        </p>
      )}
      <Field
        label="Caption"
        value={data.caption}
        maxLength={85}
        onChange={(caption) => update({ caption })}
      />
      <Field
        label="Location"
        value={data.location}
        maxLength={60}
        onChange={(location) => update({ location })}
      />
      <Field
        label="Photographer credit"
        value={data.credit}
        maxLength={65}
        onChange={(credit) => update({ credit })}
      />
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
      description="Give your coastal photograph a thoughtful frame, a caption and the credit it deserves."
      form={form}
      preview={
        <CanvasPreview
          {...preview}
          title={tool.name}
          name={`pontikus-photo-frame-${data.format}`}
          paper={data.format === "square" ? [180, 180] : [180, 320]}
          page={page}
          pageChange={setPage}
          description="Choose square or vertical, then download. PNG keeps the exact social dimensions; PDF uses a matching custom paper size."
        />
      }
    />
  );
}
