

class ButtonGroup {

    constructor(name, buttons) {
        this.name = name;
        // array of strings
        this.buttons = buttons;
        this.index = 0;
        this.current = this.buttons[this.index];
    }

    next() {
        if (this.index < this.buttons.length - 1) {
            this.current = this.buttons[++this.index];
        }
    }

    prev() {
        if (this.index > 0) {
            this.current = this.buttons[--this.index];
        }
    }

    atStart() {
        return this.index === 0;
    }

    atEnd() {
        return this.index === this.buttons.length - 1;
    }
}
