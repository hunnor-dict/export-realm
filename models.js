exports.WordSchema = {
	name: "Word",
	properties: {
		value: "string",
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
