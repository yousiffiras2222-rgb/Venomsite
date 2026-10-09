# Diagnostikare homepage mockup

A working proposal for a human-first diagnostikare.com: the care team leads, CORA supports.
Spanish (México) by default, with an ES / EN switch in the nav.

## Run it

```bash
npm install
npm run dev        # http://localhost:5317
```

From the folder above, `.claude/launch.json` starts the same server in Claude's browser pane.

## Pages

- `/` Homepage: hero → the team → one patient's first consult ("El relevo") → impact with a face → one trust strip → organizations → booking
- `/equipo` Our care team, with a filter by specialty

## Where things live

| What | File |
| --- | --- |
| Design tokens (color, type, space, motion) | `src/styles/tokens.css` |
| Base styles, buttons, reveals, sample fields | `src/styles/base.css` |
| All copy, both languages | `src/content/es.js`, `src/content/en.js` |
| Sections | `src/sections/*.jsx` |
| Photo placeholder with shot brief | `src/components/PhotoSlot.jsx` |
| "Atendió" record slip, stamp, discipline tabs | `src/components/RecordBits.jsx`, `Stamp.jsx` |

## Placeholders to replace

Every person is a marked sample. Nothing here is a real clinician, patient or testimonial.

- Names: `Nombre Apellido`, `[Apellido]`, `[Nombre]` (shown with a dotted underline)
- License numbers: `Céd. Prof. 0000000`
- Photos: every `PhotoSlot` carries a shot brief (`brief` in the content files). Together they are the shot list for the photo day. Swap a slot for an `<img>` when real photography arrives.
- Team counts on `/equipo`: `[N]`
- The booking form is a mockup and sends nothing.

Real facts kept from diagnostikare.com: 60 Decibels results, ISO 13485 / 9001 (AENOR), COFEPRIS letter, REPSE, clients, backers, contact details.
