'use strict';

const controllers = require('./lib/controllers');
const winston = require.main.require('winston');
const meta = require.main.require('./src/meta');
const topics = require.main.require('./src/topics');
const async = require.main.require('async');

const plugin = {};

plugin.init = function (params, callback) {
	const router = params.router;
	const hostMiddleware = params.middleware;
	// const hostControllers = params.controllers;

	// We create two routes for every view. One API call, and the actual route itself.
	// Just add the buildHeader middleware to your route and NodeBB will take care of everything for you.

	router.get(
		'/admin/plugins/category-queue',
		hostMiddleware.admin.buildHeader,
		controllers.renderAdminPage
	);
	router.get('/api/admin/plugins/category-queue', controllers.renderAdminPage);
	meta.settings.get('category-queue', function (err, settings) {
		if (err) {
			winston.error(
				'[plugin/category-queue] Could not retrieve plugin settings!'
			);
			plugin.settings = { 1: '' };
			return;
		}

		plugin.settings = settings;
	});

	callback();
};

plugin.addAdminNavigation = function (header, callback) {
	header.plugins.push({
		route: '/plugins/category-queue',
		icon: 'fa-tint',
		name: 'category-queue',
	});

	callback(null, header);
};

plugin.postQueue = function (postData, callback) {
	var keys = Object.values(plugin.settings);

	var cid = postData.data.cid;
	async.waterfall(
		[
			(next) => {
				if (!cid) {
					// topic comment
					cid = topics.getTopicField(postData.data.tid, 'cid', next);
				} else {
					next(null, cid);
				}
			},
			(_cid, next) => {
				cid = _cid;
				if (keys.includes(String(cid))) {
					if (postData.data.tid) {
						// topic comment;
						if (keys.includes(`comment-${cid}`)) {
							postData.shouldQueue = true;
							winston.info(
								`Add comment of topic(${postData.data.tid}) to queue.`
							);
						}
					} else {
						// main post;
						postData.shouldQueue = true;
						winston.info(`Add topic(${postData.title}) to queue.`);
					}
				}

				next(null, postData);
			},
		],
		callback
	);
};

module.exports = plugin;
