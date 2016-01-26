function request(config, callback) {
	if (config.type === 'POST') {
		config.data = JSON.stringify(config.data);
	}

	$.ajax({
		type: config.type || 'POST',
		url: serverUrl + config.url,
		contentType: config.contentType || 'application/json; charset=utf-8',
		dataType: config.dataType || 'json',
		data: config.data,
		success: function (response) {
			callback(response);
		}
	});
}