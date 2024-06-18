import { LightningElement } from "lwc";
import FieldSelectionModal from "c/fieldSelectionModal";

export default class SelectField extends LightningElement {
	inputObjectName;

	handleInputChange(event) {
		this.inputObjectName = event.target.value;
	}
	async handleClick() {
		const result = await FieldSelectionModal.open({
			size: "large",
			description: "Accessible description of modal's purpose",
			objectname: this.inputObjectName
		});
		console.log(result);
	}
}
