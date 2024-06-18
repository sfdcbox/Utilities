public with sharing class FeildsAndRelationsController {
	@AuraEnabled(cacheable=true)
	public static ObjectDTO getFieldsInfo(String sObjectName) {
		ObjectDTO objectWithFields = new ObjectDTO();

		Schema.DescribeSObjectResult describeResult = Schema.getGlobalDescribe()
			.get(sObjectName)
			.getDescribe();

		objectWithFields.label = describeResult.getLabel();

		Map<String, Schema.SObjectField> fieldsMap = describeResult.fields.getMap();
		for (String fieldName : fieldsMap.keySet()) {
			Schema.SObjectField sObjfield = fieldsMap.get(fieldName);
			Schema.DescribeFieldResult fieldDescribe = sObjfield.getDescribe();

			FieldDTO field = new FieldDTO();
			field.apiName = fieldDescribe.getName();
			field.type = fieldDescribe.getType().name();
			field.label = fieldDescribe.getLabel();
			field.relationshipName = fieldDescribe.getRelationshipName();
			field.isCustom = fieldDescribe.isCustom();
			field.isAccessible = fieldDescribe.isAccessible();
			field.referenceTo = getNamesOfSobjects(
				fieldDescribe.getReferenceTo()
			);
			field.isReference = field.type == 'REFERENCE';
			objectWithFields.fields.add(field);
		}
		return objectWithFields;
	}

	class ObjectDTO {
		@AuraEnabled
		public String label;
		@AuraEnabled
		public List<FieldDTO> fields;
		public ObjectDTO() {
			fields = new List<FieldDTO>();
		}
	}

	class FieldDTO {
		@AuraEnabled
		public String apiName;
		@AuraEnabled
		public String type;
		@AuraEnabled
		public String label;
		@AuraEnabled
		public String relationshipName;
		@AuraEnabled
		public List<String> referenceTo;
		@AuraEnabled
		public Boolean isCustom;
		@AuraEnabled
		public Boolean isAccessible;
		@AuraEnabled
		public Boolean isReference;
	}

	public static List<String> getNamesOfSobjects(
		List<Schema.SObjectType> objectTypes
	) {
		List<String> names = new List<String>();

		for (Schema.SObjectType objectType : objectTypes) {
			names.add(objectType.getDescribe().getName());
		}

		return names;
	}
}
