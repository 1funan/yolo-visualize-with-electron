const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('API', {
    node: (callback) => {
        ipcRenderer.removeAllListeners('send-node');
        ipcRenderer.on('send-node', (_event, value) => callback(value));
    },
    sendData: (acc, pass, isLogin) => ipcRenderer.send('send-data', acc, pass, isLogin),
    openFile: () => ipcRenderer.send('open-file'),
    getIMGData: (callback) => {
        ipcRenderer.removeAllListeners('get-img-data')
        ipcRenderer.on('get-img-data', (_event, value) => (callback(value)));
    },
    sendYoloProp: (conf, in_path, model, save) => ipcRenderer.send('send-yolo-prop', conf, in_path, model, save),
    getOutFile: (callback) => {
        ipcRenderer.removeAllListeners('send-out-path');
        ipcRenderer.on('send-out-path', (_event, value) => callback(value))
    },
    getStaffData: (callback) => {
        ipcRenderer.removeAllListeners('get-staff-data')
        ipcRenderer.on('get-staff-data', (_event, value) => callback(value));
    },
    sendRequestStaff: () => ipcRenderer.send('get-request-staff'),
    getAnimalData: (callback) => {
        ipcRenderer.removeAllListeners('get-animal-data')
        ipcRenderer.on('get-animal-data', (_event, value) => callback(value));
    },
    sendRequestAnimal: () => ipcRenderer.send('get-request-animal'),
    deleteUserInfo: (id) => ipcRenderer.send('delete-user-info', id),
    getStatus: (callback) => {
        ipcRenderer.removeAllListeners('get-status')
        ipcRenderer.on('get-status', (_event, code) => callback(code))
    }
})