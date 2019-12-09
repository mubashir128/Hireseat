import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Resume } from '../../models/resume';
declare var jQuery: any;
@Component({
    selector: 'app-resume-item',
    templateUrl: './resume-item.component.html',
    styleUrls: ['./resume-item.component.css']
})
export class ResumeItemComponent implements OnInit {
    @Input() resume: Resume;
    @Output() selectedForEdit = new EventEmitter(false);
    @Output() selectedForDelete = new EventEmitter(false);
    resumeVisible: number = 0;
    public data: any;
    constructor() {
    }

    ngOnInit() {
        jQuery(".card").mouseenter(function (e) {
            if (jQuery(this).find('> .card-reveal').length) {
                if (jQuery(e.target).is(jQuery('.card .activator')) || jQuery(e.target).is(jQuery('.card .activator i'))) {
                    // Make Reveal animate up
                    jQuery(this).find('.card-reveal').css({ display: 'block' }).velocity("stop", false).velocity({ translateY: '-100%' }, { duration: 300, queue: false, easing: 'easeInOutQuad' });
                }
            }
            jQuery('.card-reveal').closest('.card').css('overflow', 'hidden');

        });
        jQuery(".card").mouseleave(function () {
            // Make Reveal animate down and display none
            jQuery(this).find('.card-reveal').velocity(
                { translateY: 0 },
                {
                    duration: 225,
                    queue: false,
                    easing: 'easeInOutQuad',
                    complete: function () {
                        jQuery(this).css({ display: 'none' });
                    }
                });
        });
    }

    showResume() {
        this.resumeVisible = 1;
    }

    closeResume() {
        this.resumeVisible = 0;
    }

    edit() {
        this.selectedForEdit.emit(this.resume);
    }

    delete() {
        this.selectedForDelete.emit(this.resume);
    }

    showResumeForResumeBank(){
        this.resumeVisible = 2;
    }
    

}
