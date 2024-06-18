import { api } from "lwc";
import LightningModal from "lightning/modal";

export default class FieldSelectionModal extends LightningModal {
	selectedObjects = [];
	selectedFields = [];
	_objectname;
	@api
	get objectname() {
		return this._objectname;
	}
	set objectname(value) {
		this._objectname = value;
		this.selectedObjects.push(value);
	}

	selectedField;
	handleSelected(event) {
		this.selectedField = event.detail.field;
		this.selectedObjects = this.selectedObjects.slice(
			0,
			event.detail.level + 1
		);
		this.selectedFields = this.selectedFields.slice(0, event.detail.level);
		this.selectedFields.push(this.selectedField);
		if (this.selectedField.isReference) {
			this.selectedObjects.push(this.selectedField.referenceTo[0]);
		}
	}

	get completeField() {
		let field = "";
		this.selectedFields.forEach((f) => {
			console.log(JSON.stringify(f));
			if (f.isReference) {
				field += "." + f.relationshipName;
			} else {
				field += "." + f.apiName;
			}
		});
		field = field.replace(".", "");
		return field;
	}

	handleOkay() {
		this.close("okay");
	}
}
