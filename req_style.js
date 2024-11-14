"use strict";
const fs = require("fs");
const path = require("path");
const nunjucks = require("nunjucks");;

const trait = function (req, res, query,pathname) {

	let page;
	let type;
	let sousType;
	let file =pathname;
	file = __dirname + file;

	let extname = path.extname(file);
	if (extname === ".html") {
		type = 'text';
		sousType = 'html';
	} else if (extname === ".css") {
		type = 'text';
		sousType = 'css';
	} else if (extname === ".js") {
		type = 'text';
		sousType = 'js';
	} else if (extname === ".jpg" || extname === ".jpeg") {
		type = 'image';
		sousType = 'jpeg';
	} else if (extname === ".gif") {
		type = 'image';
		sousType = 'gif';
	} else if (extname === ".png") {
		type = 'image';
		sousType = 'png';
	} else if (extname === ".mp3") {
		type = 'audio';
		sousType = 'mp3';
	}
	try {
		page = fs.readFileSync(file);
		res.writeHead(200, { 'Content-Type': type + "/" + sousType });
		res.write(page);
		res.end();
	} catch (e) {
		res.writeHead(404, { 'Content-Type': 'text/plain' });
		res.write('ERREUR 404 : ' + file + ' fichier non trouvé');
		res.end();
	}
};

module.exports = trait;
