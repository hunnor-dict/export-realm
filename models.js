exports.WordSchema = {
	name: "Word",
	properties: {
		value: {
			type: "string",
			indexed: true
		},
		inflected: "int"
	}
};

exports.EntrySchema = {
	name: "Entry",
	properties: {
		lang: "string",
		id: "int",
		content: "string",
		roots: "Word[]",
		inflections: "Word[]"
	}
};
