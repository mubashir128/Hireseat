export class Tab {
    id: string;
    displayText: string;
    selected: boolean;
    constructor(id: string, displayText: string, selected: boolean) {
        this.id = id;
        this.displayText = displayText;
        this.selected = selected;
    }

    select() {
        this.selected = true;
    }
    deselect() {
        this.selected = false;
    }
}