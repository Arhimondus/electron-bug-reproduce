const { app, BrowserWindow, ipcMain } = require('electron');
	
var mainWindow;
var childWindow;

app.on('ready', function() {
	mainWindow = new BrowserWindow({ width: 800, height: 600 });
	mainWindow.loadURL(`file://${__dirname}/main-window.html`);
	
	childWindow = new BrowserWindow({ width: 440, height: 300, parent: mainWindow })
	childWindow.loadURL(`file://${__dirname}/modal-window.html`)
	childWindow.hide();
});

ipcMain.on('showModal', function(event, parentWindow) {
	console.log('ipc showModal');
	let child = new BrowserWindow({ width: 440, height: 300, parent: parentWindow, modal: true, show: true, resizable: false });
	child.setMenu(null);
	child.loadURL(`file://${__dirname}/modal-window.html`);
});

ipcMain.on('showModalByParentId', function(event, parentWindowId) {
	console.log('ipc showModalByParentId');
	let child = new BrowserWindow({ width: 440, height: 300, parent: BrowserWindow.fromId(parentWindowId), modal: true, show: true, resizable: false });
	child.setMenu(null);
	child.loadURL(`file://${__dirname}/modal-window.html`);
	child.on('closed', function() {
		child.destroy();
	});
});

ipcMain.on('showAlreadyCreatedWindow', (event) => {
	childWindow.show();
});