# Job Application Tracker

A fully responsive, vanilla JavaScript + Tailwind CSS app to track your job applications across three states: **Not Applied**, **Interview**, and **Rejected**.

---

## Features

- Dashboard showing total, interview, and rejected counts
- 8 job cards with real company/position data (no lorem ipsum)
- Tab filtering: All / Interview / Rejected
- Toggle between Interview and Rejected status per card
- Delete cards with live count updates
- Empty state shown when a filtered tab has no jobs
- Fully responsive for mobile devices

---

## Tech Stack

- HTML5
- Tailwind CSS (via CDN)
- Vanilla JavaScript (all logic in `app.js`)

---

## How to Run

Just open `index.html` in any modern browser. No build step required.

---

## Q&A

### 1. What is the difference between `getElementById`, `getElementsByClassName`, and `querySelector` / `querySelectorAll`?

- **`getElementById(id)`** selects a single element by its unique `id` attribute. It returns one element or `null`. It is the fastest of the three because IDs are unique and browsers can look them up directly.

- **`getElementsByClassName(name)`** returns a live HTMLCollection of all elements that have the given class name. "Live" means if you add or remove elements from the DOM, the collection updates automatically. You can only pass a single class name (or space-separated names), not a full CSS selector.

- **`querySelector(selector)`** accepts any valid CSS selector (e.g., `".parent .child"`, `"#id > p"`, `"[data-tab]"`) and returns the **first** matching element, or `null`. It is versatile but slightly slower than `getElementById`.

- **`querySelectorAll(selector)`** is like `querySelector` but returns a **static** NodeList of **all** matching elements. Unlike `getElementsByClassName`, it does not update live when the DOM changes.

**Summary**: Use `getElementById` for fast single-element access by ID, `querySelector` / `querySelectorAll` when you need CSS-selector power or multiple elements.

---

### 2. How do you create and insert a new element into the DOM?

You use `document.createElement(tagName)` to create an element in memory, configure it, and then attach it to the DOM with an insertion method:

```js
// 1. Create
const card = document.createElement('div');
card.classList.add('job-card');
card.textContent = 'New Job';

// 2. Insert at the end of a container
document.getElementById('jobs-container').appendChild(card);

// 3. Or insert before a specific child
const container = document.getElementById('jobs-container');
container.insertBefore(card, container.firstChild);

// 4. Modern approach — insertAdjacentHTML for HTML strings
container.insertAdjacentHTML('beforeend', '<div class="job-card">New Job</div>');
```

The element only appears in the browser once it is attached to a node that is already in the document.

---

### 3. What is Event Bubbling? And how does it work?

Event bubbling is the behavior where an event fired on a child element automatically propagates ("bubbles") upward through each of its ancestor elements in the DOM tree, until it reaches the `document` root.

**Example:**
```html
<div id="parent">
  <button id="child">Click me</button>
</div>
```
```js
document.getElementById('parent').addEventListener('click', () => {
  console.log('Parent fired!');
});
document.getElementById('child').addEventListener('click', () => {
  console.log('Child fired!');
});
```
Clicking the button logs:
1. `Child fired!`
2. `Parent fired!`

The event starts at the deepest target and travels upward. You can stop this with `event.stopPropagation()` inside a handler if you do not want ancestors to receive the event.

---

### 4. What is Event Delegation in JavaScript? Why is it useful?

Event delegation is a pattern that exploits event bubbling. Instead of attaching a listener to every individual child element, you attach **one listener on a common ancestor** and check `event.target` inside the handler to determine which child was actually clicked.

```js
document.getElementById('jobs-container').addEventListener('click', function(e) {
  if (e.target.classList.contains('btn-interview')) {
    const id = e.target.dataset.id;
    setStatus(Number(id), 'interview');
  }
});
```

**Why it is useful:**
- **Performance**: One listener instead of dozens or hundreds.
- **Dynamic elements**: Works automatically on elements added to the DOM after the listener was set up — no need to re-attach handlers.
- **Cleaner code**: Centralizes related logic in one place.

---

### 5. What is the difference between `preventDefault()` and `stopPropagation()`?

They do two completely different things:

| Method | What it does |
|---|---|
| `event.preventDefault()` | Cancels the browser's **default action** for the event (e.g., stops a form from submitting, stops a link from navigating, stops a checkbox from toggling). It does **not** stop the event from bubbling. |
| `event.stopPropagation()` | Stops the event from **bubbling up** to parent elements. The element's own listeners still run; ancestors do **not** receive the event. It does **not** affect the browser's default action. |

