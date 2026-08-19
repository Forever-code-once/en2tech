# Image credits

All photography in `src/images/` is from [Unsplash](https://unsplash.com) under
the [Unsplash License](https://unsplash.com/license): free for commercial and
non-commercial use, no permission or attribution required.

| File                       | Source photo ID                        | Used on                    |
| -------------------------- | -------------------------------------- | -------------------------- |
| `team-workspace.jpg`       | `photo-1522071820081-009f0129c71c`     | Home hero (full-bleed)     |
| `planning-session.jpg`     | `photo-1552664730-d307ca884978`        | Home — "How we work"       |
| `client-conversation.jpg`  | `photo-1543269865-cbf427effbad`        | Sitewide CTA section       |
| `discovery-meeting.jpg`    | `photo-1517048676732-d65bc937f952`     | Home — "Why we're different" |

Any photo can be looked up at `https://unsplash.com/photos/<id>` if you want to
credit the photographer voluntarily.

---

## ⚠️ Read this before launch

**These are stock photos of people who do not work at EN2 Tech.**

That matters more here than it would for most businesses. EN2's entire pitch is
that you are a real, specific, local person who has been in Middle Tennessee
through four decades of technology — not an anonymous agency. Generic stock
photography of unnamed developers actively works against that claim, and
prospects in a small market are unusually good at spotting it.

Three options, in order of how well they serve the pitch:

1. **Replace with real photographs.** John at work, a client's dispatch floor
   (with permission), the actual office. Even phone photos beat stock when the
   selling point is authenticity. This is the strongest option by a wide margin.
2. **Replace with non-people imagery.** Screenshots of the systems you built,
   equipment, Murfreesboro itself. Honest, specific, and no licensing question.
3. **Keep the stock.** Fine as a placeholder while the site is being reviewed,
   and defensible if the images stay clearly generic rather than implying
   "this is our team."

**Swapping them is a one-line change per image.** Drop a replacement file into
`src/images/` with the same filename and rebuild — `next/image` picks up the new
dimensions and regenerates the blur placeholder automatically. Update the `alt`
text at the usage site to describe what the new photo actually shows.
