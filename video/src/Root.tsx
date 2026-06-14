import { Composition } from "remotion";
import { PholioLaunch, PREVIEW_FRAMES } from "./PholioLaunch";
import { FPS } from "./theme";
import "./fonts";

export const RemotionRoot: React.FC = () => {
  return (
    <Composition
      id="PholioLaunch"
      component={PholioLaunch}
      durationInFrames={PREVIEW_FRAMES}
      fps={FPS}
      width={1920}
      height={1080}
    />
  );
};
