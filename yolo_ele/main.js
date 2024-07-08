const { ipcMain, dialog, Menu, Notification, webContents } = require('electron')
const { app, BrowserWindow } = require('electron/main')
const path = require('node:path')
const { v4: uuidv4 } = require('uuid');
const { db, genid } = require('./utils/dbUtils')
const { processImg } = require('./utils/processImg');
const { removeAnsiEscapeCodes } = require('./utils/removeBlack')

function sendNotification() {
    const startMsg = new Notification({
        title: '开始使用',
        body: `欢迎使用Yolo动物识别`,
        icon: './icon.png'
    })
    startMsg.show()
}
function createWindow() {
    Menu.setApplicationMenu(null)
    const win = new BrowserWindow({
        width: 1200,
        height: 750,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        },
        icon: "icon.png"
    })
    //生产环境
    win.loadFile(path.join(__dirname, 'pages', 'index.html'))
    //开发环境
    // win.webContents.openDevTools()
    // win.loadURL("http://localhost:5173/")
    // 登录和注册接口
    ipcMain.on('send-data', async (_event, account, password, isLogin) => {
        const search_sql = "SELECT * FROM `admin` WHERE `account` = ?";
        const params_login = account
        //检查是否是登录请求
        if (isLogin == 'true') {
            const result = await db.async.all(search_sql, params_login)
            //检查是否存在账号
            if (result.length > 0) {
                console.log(result);
                // 检查密码是否正确
                if (result[0].password == password) {
                    // 密码正确返回
                    win.webContents.send('send-out-path', 'true')
                } else {
                    // 密码错误返回
                    win.webContents.send('send-out-path', '500');
                }
            } else {
                // 账号不存在返回
                win.webContents.send('send-out-path', 'false')
            }
        } else {
            token = uuidv4()
            const result_re = await db.async.all(search_sql, params_login)
            // 检测是否已存在账号
            if (result_re.length > 0) {
                // 返回已存在账号
                win.webContents.send('send-out-path', 'false')
            } else {
                win.webContents.send('send-out-path', 'true')
                const insert_sql = "INSERT INTO `admin` (`id`,`account`,`password`,`token`) VALUES(?,?,?,?)"
                const params = [genid.NextId(), account, password, token]
                const result = await db.async.run(insert_sql, params)
                console.log(__dirname);
                console.log(result, token);
            }
        }
    })
    // 打开文件接口
    ipcMain.on('open-file', async (_event) => {
        const result = await dialog.showOpenDialog({
            title: "请选择文件",
            properties: ['openFile', 'multiSelections'],
            filters: [{ name: 'Images', extensions: ['jpg', 'png'] },]
        })
        if (result.canceled == false) {
            console.log(result);
            win.webContents.send('get-img-data', result.filePaths[0])
        }
    })
    // 保存YOLO参数
    ipcMain.on('send-yolo-prop', async (_event, conf, in_path, model, save) => {
        console.log(conf, in_path, model, save);
        let timeDate = new Date()
        let label = 'No Label'
        let num = '0'
        const y = timeDate.getFullYear(); const m = timeDate.getMonth(); const d = timeDate.getDate();
        const h = timeDate.getHours(); const mi = timeDate.getMinutes(); const sec = timeDate.getSeconds();
        const createTime = `${y}-${m + 1}-${d}-${h}-${mi}-${sec}`
        const insert_sql_yolo = 'INSERT INTO `yolodata` (`id`,`conf`,`inpath`,`outpath`,`model`,`save`,`create_time`,`num`,`label`) VALUES (?,?,?,?,?,?,?,?,?)'
        try {
            let result = await processImg(in_path, conf, model)
            if (result.stdout.length != 0) {
                const regex = /Results saved to (.*)$/m;
                if (model == 'best.pt') {
                    label = result.stdout.split('\n')[1].split(' ')[5].slice(0, -1)
                    num = result.stdout.split('\n')[1].split(' ')[4]
                }
                console.log(num, label);
                const match1 = result.stdout.match(regex);
                if (match1 && match1[1]) {
                    const resultPath = match1[1].trim();
                    const newPath = removeAnsiEscapeCodes(resultPath);
                    console.log(path.join(__dirname, newPath));
                    //开发环境
                    // const out_path = path.join(__dirname, newPath, path.basename(in_path))
                    //生产环境
                    const out_path = path.join(process.resourcesPath,'../' ,newPath, path.basename(in_path))
                    win.webContents.send('send-out-path', out_path);
                    const params_yolo = [genid.NextId(), conf, in_path, out_path, model, save, createTime, num, label]
                    try {
                        const status = await db.async.run(insert_sql_yolo, params_yolo);
                        if (status == '0') {
                            console.log('200');
                        }
                    } catch (err) {
                        console.log(err);
                    }
                }
            }
        } catch (err) {
            console.log(err);
        }
    })
    //获取动物列表
    ipcMain.on('get-request-animal',async()=>{
        try{
            const search_animal_sql = 'SELECT `num`, `label`,`create_time` FROM `yolodata` WHERE `num` != 0'
            const result = await db.async.all(search_animal_sql)
            console.log(result);
            win.webContents.send('get-animal-data', result)
        }catch(err){
            console.log(err);
        }
    })
    ipcMain.on('get-request-staff',async()=>{
        try {
            const search_staff_sql = 'SELECT `id`, `account` FROM `admin` WHERE `account` != \'admin\''
            const result = await db.async.all(search_staff_sql)
            console.log(result);
            win.webContents.send('get-staff-data', result)
        } catch (err) {
            console.log(err);
        }
    })
    ipcMain.on('delete-user-info',async(_event,id)=>{
        try {
            const delete_staff_sql = 'DELETE FROM `admin` WHERE `id` = ?';
            const result = await db.async.run(delete_staff_sql, [id]);
            console.log(result);
            win.webContents.send('get-status','200')
        } catch (err) {
            console.log(err);
        }
    })
}
app.setAppUserModelId('Yolo动物识别')
app.whenReady().then(() => {
    createWindow()
    sendNotification()
    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow()
        }
    })
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})