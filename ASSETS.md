# Design assets

Generated with the built-in ImageGen tool. Original outputs were copied into this repository.

- `public/10minutes-logo-transparent.png`: Background extraction from the user-supplied logo. Prompt: preserve the mint 3D app icon, stopwatch, phone, hand, original colors and exact Korean wordmark “10분만”; remove the ivory background to alpha transparency and the extraneous bottom-right sparkle; frame icon and wordmark horizontally. Original source retained as `public/10minutes-logo.png`.
- `public/video-call-hero.png`: Generated explanatory photograph. Prompt: a realistic warm Korean home scene, an older Korean woman with grey hair and mint cardigan holding one smartphone; its screen shows a friendly female digital teacher wearing a headset, plus a small customer thumbnail and simple call controls. Natural daylight, ivory and mint palette, no text, logos or watermarks; clearly communicate remote smartphone teaching by video call.
- `public/kakaotalk.png`: Kakao's published Talk image from https://developers.kakao.com/assets/img/about/logos/kakaotalksharing/kakaotalk_sharing_btn_medium.png (source example: https://developers.kakao.com/tool/demo/message/kakaolink).

The generated hero illustrates the intended service; it is not a recording of a real consultation.

## Rose logo and remote-help update

All four project assets below were made with the built-in ImageGen tool and copied into `public/`.

- `public/10minutes-logo-rose.png`: user-supplied rose/plum logo, background-extraction edit. Prompt: preserve exactly the pink rounded app icon, plum stopwatch, peach smartphone, hand, gold orbital arrow and exact dark wordmark “10분만”; remove the white background to alpha transparency, keep the original composition/colors/lettering and frame horizontally. A follow-up alpha cleanup requested removal of stray white speckles and fringes outside the icon and wordmark. CSS trims only unused edge space in the header.
- `public/remote-help-hero.png`: generated remote-help editorial diptych. Prompt: two separate locations, a Korean female digital teacher wearing a headset at her laptop and an older Korean woman holding her smartphone; both screens show the same photo gallery and a coral highlighted picture/cursor. Warm ivory, peach, rose and plum accents, natural light, no text, logos or watermark. Intended to explain remote screen guidance at a small website size.
- `public/teacher-junhyuk.png`: generated fictional male digital teacher headshot. Prompt: friendly Korean man around 35, neat black hair, subtle round glasses, headset, cream shirt and muted plum cardigan, centered shoulder-up portrait, warm ivory background, natural light, generous room for a rounded crop, no text/logo/watermark.
- `public/teacher-jieun.png`: generated fictional female digital teacher headshot. Prompt: friendly Korean woman around 35, neat shoulder-length dark hair, headset, cream blouse and dusty rose cardigan, centered shoulder-up portrait, warm ivory background, natural light, generous room for a rounded crop, no text/logo/watermark.

The profile photographs, names, ratings, sample review excerpts and consultation counts are fictional prototype data. The UI labels them as examples. Customer-authored reviews are kept only in the current React session and are not published.

## Inclusive studio direction

- `public/waiting-for-help.png`: built-in ImageGen generated editorial photograph. Prompt: a Korean adult woman around 35 in a cream shirt, at a contemporary home desk calmly holding a smartphone and waiting for help; no incoming-call interface, no urgency, natural daylight, warm ivory/grey with muted plum and subtle pale lime accents, premium editorial style, landscape 3:2, no text/logos/watermarks. This is an illustration of the service, not an actual customer photograph.
- `src/SupportOrb.jsx` and `src/studio.css`: code-native animated glass cursor with two translucent orbits. No generated bitmap or external 3D runtime is required. The object links to the help explanation, and motion is disabled for `prefers-reduced-motion`.
- Category clear-shell covers use CSS pseudo-elements with specular reflections, a molded rim, a tinted internal bed and a faint transparent surface. The existing two-cycle emphasis stays on the full icon assembly.

### Subsequent refinement

The experimental orbit/cursor object was removed from both home and the final introduction screen, along with its English eyebrow label. `src/CategoryArt.jsx` now supplies the category illustrations: phone adjustment controls, photo stack with video marker, calendar with confirmation ticket, documents with a check seal, and a colourful app grid. These are code-native SVG assets. The category cover uses smoked transparent edges and diagonal surface reflections without a thick opaque white inner tray. Existing hover/touch emphasis remains in place.
