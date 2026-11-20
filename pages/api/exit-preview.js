export default function handler(req, res) {
	res.setDraftMode({ enable: false });
	res.writeHead(307, { Location: '/' });
	return res.end();
}
