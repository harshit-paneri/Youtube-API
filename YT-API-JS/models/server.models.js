const { Schema, model } = require("mongoose");

const yvApi = new Schema(
	{
		id: String,
		title: String,
		description: String,
		publishedAt: Date,
		// thumbnails: {
		// 	default: String,
		// 	medium: String,
		// 	high: String,
		// },
	},
	{ timestamps: true }
);

const YvidModel = model("server", yvApi);

module.exports = YvidModel;
