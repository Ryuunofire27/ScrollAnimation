# ScrollAnimation

Scroll animation is a function to navigate within the page

## How to use

Adding the script.

```
<script src="https://cdn.jsdelivr.net/npm/scroll-animation-js/dist/scroll-animation.min.js" ></script>
```

Or install

```
npm i --save scroll-animation-js
```

and using with [browserify](https://github.com/browserify/browserify)

### Using

scrollAnimation(listElements, delay[, addingHeight, scrollContainerElement]);

### Parameters

listElements : Array of "li" elements with "a" like first children.

delay : The time in milliseconds to navigate to the link.

#### Optional

addingHeight : Extra height if some element does not allow to see the information.

scrollContainerElement : The element with the scroll, by defect is the document.
