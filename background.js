chrome.contextMenus.create({
	id: "downloadWebPAsPNG",
	title: "Download WebP as PNG",
	contexts: ["image"]
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
	if (info.menuItemId === "downloadWebPAsPNG") {
		chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
			chrome.tabs.sendMessage(tabs[0].id, { message: "downloadWebPAsPNG", imgURL: info.srcUrl });
		});
	}
});