# JCarousel

A JavaScript carousel class that displays elements in an infinite loop.

## Overview

JCarousel takes an array of 5 or more elements and cycles through them, displaying 5 items at a time. The item in the center position (index 2) is considered the selected/active item.

## Features

- Infinite loop navigation
- Displays 5 items at a time
- Center item represents the selected element
- Simple API with `next()` and `prev()` methods

## Demo

Open `demo.html` in your browser to see an interactive visual demonstration of the carousel. The demo includes:
- Visual display of the 5 items
- Next/Previous buttons
- Keyboard navigation (Arrow keys)
- Real-time display of the current index and selected item

## Usage

This code can be run in the browser console (tested in Chrome). Copy the class into the console and create an instance by passing an initial array to the constructor.

### Example

```javascript
// Create a carousel with an array of elements
const carousel = new Carousel([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);

// Navigate forward
carousel.next();

// Navigate backward
carousel.prev();

// Display the current queue (5 items)
carousel.print();
```

## Methods

- `next()` - Move to the next item in the carousel
- `prev()` - Move to the previous item in the carousel
- `print()` - Log the current queue of 5 items to the console

