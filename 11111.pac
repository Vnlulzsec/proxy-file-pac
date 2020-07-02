function FindProxyForURL(url, host) {
	var direct = 'DIRECT';
	var proxy = 'SOCKS5 192.168.31.41:11111';

	function binarySearch(decIp, list) {
		var left = 0;
		var right = list.length - 1;

	if (isPlainHostName(host)||
		host === '127.0.0.1'||
		host === 'localhost') {
		return direct;
	}

	var pos = host.lastIndexOf('.') + 1;

	do {
		hostStr = host.substring(pos);

		if (whiteList.hasOwnProperty(hostStr)) {
			return direct;
		}

		if (blackList.hasOwnProperty(hostStr)) {
			return proxy;
		}

		pos = host.lastIndexOf('.', pos - 2) + 1;
	} while (hostStr != host);

	var decIp = dnsResolve(host);

	if (!decIp) {
		return proxy;
	} else {
		decIp = toDec(decIp);
	}

	if (binarySearch(decIp, bypassIp)) {
		return direct;
	}

	return proxy;
}
