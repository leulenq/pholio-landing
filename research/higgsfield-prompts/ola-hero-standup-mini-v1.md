Use only the configured Higgsfield MCP.

The canonical start image is already uploaded and confirmed as Higgsfield media ID `7b6b504b-0229-4310-91b6-b6fa2a2f5470`.

The full `seedance_2_0` model failed before job creation because the account requires a Pro or Ultimate plan. Submit exactly one fallback generation using `seedance_2_0_mini`. Do not use any other service or model.

Call `generate_video` with:

- model: `seedance_2_0_mini`
- medias: one `start_image` using media ID `7b6b504b-0229-4310-91b6-b6fa2a2f5470`
- duration: 8 seconds
- aspect ratio: 3:4
- count: 1
- resolution: 720p
- bitrate mode: high
- genre: auto
- generate audio: false

Prompt:

Single continuous locked-off full-body fashion editorial shot. Begin from the exact supplied start image and preserve that exact opening composition and pose for the first 0.5 seconds. The same adult blonde woman then slowly lowers the hand framing her eye; her other arm calmly releases the raised knee; she places the raised black boot securely onto the ground; her torso leans slightly forward in a physically natural preparation; she pushes upward through both legs and rises smoothly to stand. Finish upright facing the camera, feet comfortably close, weight settled slightly into one hip, both arms relaxed naturally at her sides. Hold this final standing pose completely steady for the last 0.75 seconds.

Camera is completely locked: absolutely no zoom, dolly, orbit, pan, tilt, shake, lens change, crop, or reframing. Preserve original model scale and full-body portrait framing. Head, hair, both hands, fingers, legs, knees, ankles, and both boots remain fully resolved and inside frame throughout. No translation toward screen-right or screen-left.

Preserve the exact woman's face, blonde hairstyle, skin tone, body proportions, black top, black trousers, black lace-up boots, earrings, bracelet, and all jewelry from the input. Exact identity and wardrobe continuity; realistic anatomy and footwear through the entire rise. No identity drift, hairstyle change, wardrobe or jewelry change. No bag, strap, props, logos, text, or other people.

Isolate the model against a perfectly uniform neutral mid-gray background only. No floor line, studio environment, architecture, furniture, texture, gradient, reflections, props, cast shadow, or background movement.

Motion is calm, slow, balanced, premium fashion-editorial restraint with natural human timing. Neutral expression. No smile, talking, dance, spin, theatrical posing, extra pose changes, hair touching, or exaggerated hair movement. One continuous take.

After submission, poll the Higgsfield job until it succeeds or definitively fails. If successful, download the result to `/Users/lenquanhone/Projects/pholio-landing/public/videos/higgsfield/ola-hero-standup-mini-v1.mp4`. Report model, job ID, final status, and saved path. If the current Higgsfield plan rejects Mini too, report the exact error and stop.
