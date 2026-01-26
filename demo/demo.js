// Carousel class
class Carousel {
    constructor(elements) {
        this.offset = 5;
        this.index = 0;
        this.elements = elements;
        this.queue = [];
        this.indexMax = this.elements.length-1;
        this.initialize();
    }

    initialize() {
        let elemSize = this.elements.length;
        let pos = 0;
        for(let i = 0; i < this.offset; i++) {
            if(i < 3){
                this.queue.push(this.elements[i]);
            } else {
                elemSize -= 1; 
                this.queue.unshift(this.elements[elemSize]);
            }
        }
        this.index = this.elements.length - 2;
    }

    next() {
        if(this.index >= this.indexMax){
            this.index = 0;
        } else {
            this.index++;
        }
        this.generateQueue();
    }

    prev() {
        if(this.index <= 0){
            this.index = this.indexMax;
        } else {
            this.index--;
        }
        this.generateQueue();
    }

    generateQueue() {
        this.queue = [];
        this.recreateQueue(this.index);

        let queueSize = this.offset - this.queue.length
        if(queueSize !== 0){
            this.recreateQueue(0);
        }
    }

    recreateQueue(max) {
        let elemSize = this.elements.length;
        for(let i = max; i < elemSize; i++) {
            if(this.queue.length < this.offset) {
                this.queue.push(this.elements[i]);
            }
        }
    }

    print(){
        console.log(this.queue);
    }

    getSelectedItem() {
        // The center item (index 2) is the selected item
        return this.queue[2];
    }

    goToStart() {
        this.index = 0;
        this.generateQueue();
    }

    goToEnd() {
        this.index = this.indexMax;
        this.generateQueue();
    }
}

// Initialize carousel with sample data
const sampleData = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
const carousel = new Carousel(sampleData);
let zoomLevel = 1;
let itemElements = new Map(); // Map to track DOM elements by item value

// Calculate left position for a given index
function getLeftPosition(index) {
    const itemWidth = 110; // 100px + 10px gap
    return 25 + (index * itemWidth); // 25px left padding
}

// Update display
function updateDisplay(animate = false, direction = null) {
    const display = document.getElementById('carouselDisplay');
    const currentQueue = [...carousel.queue];
    const currentItemSet = new Set(currentQueue);
    
    // Remove items that are no longer in the queue
    itemElements.forEach((element, item) => {
        if (!currentItemSet.has(item)) {
            if (animate) {
                // Slide out the item
                const currentLeft = parseInt(element.style.left);
                if (direction === 'next') {
                    element.style.left = (currentLeft - 110) + 'px';
                    element.style.opacity = '0';
                } else if (direction === 'prev') {
                    element.style.left = (currentLeft + 110) + 'px';
                    element.style.opacity = '0';
                }
                setTimeout(() => {
                    if (element.parentNode) {
                        element.remove();
                    }
                    itemElements.delete(item);
                }, 500);
            } else {
                element.remove();
                itemElements.delete(item);
            }
        }
    });
    
    // Update or create items in the current queue
    currentQueue.forEach((item, currentIdx) => {
        const targetLeft = getLeftPosition(currentIdx);
        const scale = currentIdx === 2 ? zoomLevel * 1.3 : zoomLevel;
        const isCenterItem = currentIdx === 2;
        
        if (itemElements.has(item)) {
            // Update existing item
            const div = itemElements.get(item);
            div.className = 'carousel-item' + (isCenterItem ? ' center' : '');
            div.style.left = targetLeft + 'px';
            div.style.transform = `scale(${scale})`;
            div.style.opacity = '1';
        } else {
            // Create new item
            const div = document.createElement('div');
            div.className = 'carousel-item' + (isCenterItem ? ' center' : '');
            div.textContent = item;
            div.style.opacity = '0';
            
            if (animate && direction) {
                // Start from off-screen position
                if (direction === 'next') {
                    div.style.left = getLeftPosition(4) + 110 + 'px';
                } else {
                    div.style.left = getLeftPosition(0) - 110 + 'px';
                }
            } else {
                div.style.left = targetLeft + 'px';
            }
            
            div.style.transform = `scale(${scale})`;
            display.appendChild(div);
            itemElements.set(item, div);
            
            // Trigger animation
            requestAnimationFrame(() => {
                div.style.left = targetLeft + 'px';
                div.style.opacity = '1';
            });
        }
    });
}

function moveNext() {
    carousel.next();
    updateDisplay(true, 'next');
}

function movePrev() {
    carousel.prev();
    updateDisplay(true, 'prev');
}

function moveStart() {
    itemElements.clear();
    document.getElementById('carouselDisplay').innerHTML = '';
    carousel.goToStart();
    updateDisplay(false);
}

function moveEnd() {
    itemElements.clear();
    document.getElementById('carouselDisplay').innerHTML = '';
    carousel.goToEnd();
    updateDisplay(false);
}

function zoomIn() {
    zoomLevel = Math.min(zoomLevel + 0.1, 1.5);
    updateDisplay(false);
}

function zoomOut() {
    zoomLevel = Math.max(zoomLevel - 0.1, 0.5);
    updateDisplay(false);
}

// Initialize display on load
updateDisplay(false);

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
        movePrev();
    } else if (e.key === 'ArrowRight') {
        moveNext();
    }
});
