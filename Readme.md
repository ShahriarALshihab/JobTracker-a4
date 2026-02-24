# Job Application Tracker

A responsive job application tracking app built with HTML, Tailwind CSS, and Vanilla JavaScript.

---

## Questions & Answers

**1. What is the difference between getElementById, getElementsByClassName, and querySelector / querySelectorAll?**

getElementById selects a single element by its unique ID and returns that one element. getElementsByClassName selects all elements that share a given class name and returns a live collection. querySelector accepts any CSS selector and returns only the first matching element. querySelectorAll also accepts any CSS selector but returns all matching elements as a static list.

---

**2. How do you create and insert a new element into the DOM?**

You first use document.createElement() to create a new element in memory, then you configure it by setting its classes, text, or attributes, and finally you attach it to an existing element in the page using appendChild() or insertAdjacentHTML(). The element only becomes visible on the page once it is attached to the document.

---

**3. What is Event Bubbling? And how does it work?**

Event bubbling is the behavior where an event fired on a child element automatically travels upward through its parent elements in the DOM tree. So if you click a button inside a div, the button's click event fires first, then the same event bubbles up and triggers any click listeners on the div, then its parent, and so on up to the document root. You can stop this behavior using event.stopPropagation().

---

**4. What is Event Delegation in JavaScript? Why is it useful?**

Event delegation is a technique where instead of adding event listeners to every individual child element, you add a single listener on a parent element and use event.target to figure out which child was actually interacted with. It is useful because it reduces the number of event listeners in memory, and it automatically works for elements that are added to the DOM dynamically after the page loads.

---

**5. What is the difference between preventDefault() and stopPropagation() methods?**

preventDefault() stops the browser from performing its default action for an event, such as preventing a form from submitting or a link from navigating to a new page. stopPropagation() stops the event from bubbling up to parent elements in the DOM. They are independent of each other — one controls browser behavior and the other controls how far the event travels through the DOM.
