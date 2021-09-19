import { Component, OnInit, ViewChild, ElementRef, TemplateRef } from '@angular/core';
import { PopupParam } from 'src/app/models/popup-param';
import { PopupType } from 'src/app/models/constants';
import { PopupServiceService } from 'src/app/services/popup/popup-service.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal-popup',
  templateUrl: './modal-popup.component.html',
  styleUrls: ['./modal-popup.component.css']
})
export class ModalPopupComponent implements OnInit {

  @ViewChild('modalform', { 
    read: TemplateRef,
    static: false 
  } ) modal: TemplateRef<any> | undefined;

  popupParam: PopupParam = new PopupParam();
  public get popupType(): typeof PopupType {
    return PopupType; 
  }

  constructor(private modalService: NgbModal, private popupService: PopupServiceService) { }

  ngOnInit() {
    this.popupService.openPopup.subscribe(x => {
      if (!x) {
        return;
      }
      this.popupParam = x;
      this.modalService.open(this.modal, {ariaLabelledBy: 'modal-basic-title'});
      //.result.then((result) => {}, (reject) => {});
    });
  }

  closePopup() {
    this.popupParam = new PopupParam();
    this.modalService.dismissAll();
  }

}
