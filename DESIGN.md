# A dive from New York Harbor

Abrar’s name sits above the harbor waterline. A yellow survey sub follows the reader down through the sunlit zone, the twilight zone and the midnight zone to a lit berth beside the home lab. The original portfolio’s underwater parallax informed the journey. So did Krillion, a game that turns depth into a scoreboard with diegetic instruments.

## Instruments

The header is a dive console: notched panels, a live depth readout, one pip per zone and the zone name. A ruler on the right edge marks where each zone begins and moves a `you ◀` marker as the reader descends. True ocean facts are pinned to the margins at their depths, on the side opposite the reading column. They only appear on wide screens.

## Travel and shortcuts

Scrolling carries the waterline overhead. Near the first reef, kelp crosses in front of the hull. The sub then parks in its own lane between the text and the ruler until the station comes into view. At the bottom the hull settles onto the berth, the signal light changes, and the sub sends one sonar ping. Visitors can ping again by clicking or tapping the sub, or by pressing P.

Work, Career and Lab in the navigation jump to the reading position. The launch button points to the reef entrance. Screen readers skip the scenery, the instruments and the depth facts. They hear the same headings and links.

## Reading under water

Each project leads with its catch: one measured number set in the instrument face, and only then the story. The dashed chronology belongs to Career. At the lab the services are a glossary, and the contact links sit beside the berth. On phones the depth facts and zone pips are hidden, passing animals recede while text is on screen, and the intro column leaves room for the sub’s lane.

## Implementation

Self-hosted Pixelify Sans sets titles with a chromatic red and cyan offset. VT323 drives the instruments and catches, IBM Plex Mono labels, and system sans the prose. Warm amber marks actions against water that shifts from teal to indigo. Faint scanlines and a vignette deepen with depth.

Motion follows native scrolling through CSS timelines. `dive.js` adds the instruments, a canvas for light shafts, marine snow, propeller bubbles, bioluminescence and sonar, and a fallback that scrubs the same keyframes in browsers without scroll timelines. Reduced-motion mode drops the canvas and uses stationary poses at sea and at the dock. The page remains readable and navigable without JavaScript.
