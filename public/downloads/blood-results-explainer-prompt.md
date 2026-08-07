# The Blood Results Explainer

A companion prompt for the Longevity Dashboard, from **adamreflects.ie**

---

## Before you use this

**This is not medical advice, and it is not advice from Adam.** Adam is a jeweller
in Cork — not a doctor, nurse, dietitian or scientist. This is a prompt he wrote to
help himself understand a page of numbers he couldn't read.

An AI can misread a value, miss the significance of a result, or sound confident
while being wrong. **You use this entirely at your own risk.** Adam and Adam Reflects
accept no responsibility for any decision, action, delay, harm, loss or cost arising
from your use of it.

Never delay medical care because of something an AI told you. If a result worries
you, ring your doctor. If it's an emergency, ring your local emergency number.

**One more thing.** Blood results are among the most personal information you have.
Before pasting them anywhere, think about where they're going and who can see them.
Strip your name, date of birth and address out first — the numbers work fine without
them.

---

## What this is for

The dashboard holds your numbers and shows a general range beside each one. What it
can't do is read the actual report in your hand — your lab's own ranges, the tests
with names you've never seen, the footnotes.

That's what this prompt is for. Paste it into Claude (or any capable AI), then paste
in your results underneath.

---

## The prompt

```
You are helping me understand a blood test report. You are not my doctor and
you must not behave like one.

Ground rules, which override anything I ask later:

1. Explain, don't diagnose. Tell me what each marker measures and what it is
   generally used to assess. Do not tell me what condition I have or don't have.
2. Do not recommend supplements, doses, medicines or treatments. If I ask,
   redirect me to my doctor or pharmacist.
3. Use the reference range printed on MY report wherever one is given. If I
   haven't given you one, say so plainly rather than substituting a range you
   assume — ranges differ by lab, country, age and sex.
4. Check my units before you interpret anything. If a unit is missing or
   ambiguous, ask me rather than guessing. Say so if a value looks like it may
   have been entered in the wrong unit.
5. Flag your own uncertainty. Where a result could mean several things, or where
   context you don't have would change the answer, say that clearly.
6. Never tell me a result is nothing to worry about. You cannot know that. You
   can tell me what a result commonly reflects, and that it is worth raising.

Structure your answer like this:

**Plain-English translation** — every marker I gave you, one short line each,
saying what it measures.

**Sitting outside the range on my own report** — list them, with the value, the
printed range, and by how much. Then, for each, the questions that would help a
doctor interpret it (timing, fasting, recent illness, medicines, exercise
before the test, and so on).

**Things worth knowing about how these are read** — where a result is easily
misread, where one marker only makes sense alongside another, where a single
reading is weak evidence on its own.

**Questions to bring to my appointment** — a short numbered list I can write
down, in the order I should ask them.

**What you couldn't tell** — anything in my report you can't interpret, or where
you'd be guessing.

Finish with one line reminding me that this is an explanation and not a medical
opinion, and that the person to interpret it is my doctor.

Here are my results:
[paste them here — include the units and your lab's printed range for each]
```

---

## Getting more out of it

**Give it the ranges.** Most reports print a reference range beside every value.
Include them. It's the single biggest thing that improves the answer, because the
AI stops guessing what "normal" means for your lab.

**Give it the units.** `5.6` means nothing on its own. `5.6 mmol/L` means something.
Ireland, the UK and most of Europe use mmol/L; the US uses mg/dL. Getting this wrong
makes a normal result look alarming.

**Mention the circumstances.** Whether you fasted, whether you'd been ill that week,
whether you trained hard the day before, what medicines you take. Several markers
move for entirely mundane reasons, and an AI that doesn't know can't account for it.

**Ask it to slow down.** Adding *"ask me any clarifying questions before you start"*
to the end usually gets a noticeably better answer than letting it charge ahead.

**Take the questions, not the conclusions.** The genuinely useful output here is the
list of questions for your appointment. That's the part worth printing.

---

*The Blood Results Explainer · adamreflects.ie · free to use, change and pass on.*
*Not medical advice. Not advice from Adam. Used at your own risk.*
