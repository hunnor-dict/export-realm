#!/usr/bin/env node

const fs = require("fs");
const realm = require("realm");
const yargs = require("yargs");

const models = require("./models.js")

const options = yargs
		.option("realm", {
			describe: "The target Realm database",
			type: "string",
			demandOption: true
		}).option("hu", {
			describe: "The Hungarian source JSON file",
			type: "string",
			demandOption: true
		}).option("nb", {
			describe: "The Norwegian source JSON file",
			type: "string",
			demandOption: true
		}).argv;

function loadFile(realm, file, lang) {
	const data = fs.readFileSync(file, {encoding: "UTF-8"});
	let entries = JSON.parse(data);
	entries.forEach(entry => {
		roots = [];
		entry.roots.forEach(root => {
			var word = {}
			word.value = root
			word.inflected = 0
			roots.push(word)
		});
		inflections = [];
		if (entry.inflections) {
			entry.inflections.forEach(inflection => {
				var word = {}
				word.value = inflection
				word.inflected = 1
				inflections.push(word)
			});
		}
		realm.write(() => {
			realm.create('Entry', {
				lang: lang,
				id: entry.id,
				content: entry.content,
				roots: roots,
				inflections: inflections
			});
		});
	});
}

realm.open({schema: [models.EntrySchema, models.WordSchema], path: options.realm}).then(database => {
	loadFile(database, options.hu, "hu");
	loadFile(database, options.nb, "nb");
	database.close();
});
