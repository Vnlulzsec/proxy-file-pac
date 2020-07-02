function FindProxyForURL(url, host) {
	var direct = 'DIRECT';
	var proxy = 'SOCKS5 127.0.0.1:1080';

	function binarySearch(decIp, list) {
		var left = 0;
		var right = list.length - 1;

		do {
			var mid = Math.floor((left + right) / 2),
				diff = decIp - list[mid][0];

			if (diff >= 0 && diff <= list[mid][1]) {
				return true;
			} else if (decIp > list[mid][0]) {
				left = mid + 1;
			} else {
				right = mid;
			}
		} while (left <= right - 1);

		return false;
	}

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