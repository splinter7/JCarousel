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
}s