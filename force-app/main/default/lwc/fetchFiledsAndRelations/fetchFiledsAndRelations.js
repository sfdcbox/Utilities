import { LightningElement, wire, api } from "lwc";
import getFieldsInfo from "@salesforce/apex/FeildsAndRelationsController.getFieldsInfo";

export default class FetchFiledsAndRelations extends LightningElement {
	@api objectName;
	@api level;
	objectLabel;
	fieldsInfo;

	@wire(getFieldsInfo, { sObjectName: "$objectName" })
	wiredData(result) {
		if (result.data) {
			this.objectLabel = result.data.label;
			this.fieldsInfo = result.data.fields;

			console.log("this.fieldsInfo  ", this.fieldsInfo);
		}
	}

	handleFieldClick(event) {
		const selectedApiName = event.target.value;
		const selectedFeild = this.fieldsInfo.find(
			(f) => f.apiName === selectedApiName
		);
		console.log(selectedFeild);
		const selectedEvent = new CustomEvent("selected", {
			detail: {
				object: this.objectName,
				level: this.level,
				field: selectedFeild
			}
		});

		// Dispatches the event.
		this.dispatchEvent(selectedEvent);
	}
}
