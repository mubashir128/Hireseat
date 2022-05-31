export class Tab2 {
    id: string;
    displayText: string;
    selected: boolean;
    addedClass : string;
    showCreatedLogo: boolean;
    constructor(id: string, displayText: string, selected: boolean, addedClass : string) {
        this.id = id;
        this.displayText = displayText;
        this.selected = selected;
        this.addedClass = addedClass;
    }

    select() {
        this.selected = true;
    }
    deselect() {
        this.selected = false;
    }
}