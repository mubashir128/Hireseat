export class EmployerTab {
    id: number;
    name : string;
    path: string;
    selected: boolean;
    constructor(id: number, name: string, path: string, selected: boolean) {
        this.id = id;
        this.name = name;
        this.path = path;
        this.selected = selected;
    }

    select() {
        this.selected = true;
    }

    deselect() {
        this.selected = false;
    }

}