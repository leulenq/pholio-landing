import { Config } from "@remotion/cli/config";

// Velvet-ink launch film. Crisp stills, full quality, deterministic output.
Config.setVideoImageFormat("jpeg");
Config.setOverwriteOutput(true);
Config.setConcurrency(null); // let Remotion pick based on cores
Config.setChromiumOpenGlRenderer("angle");
