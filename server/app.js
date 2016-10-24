/**
 * 2016-10-24 程序猿的节日 😂
 * 配合Todo项目写的一个简单的后端，只能简单地模拟列表数据以及最简单的增删改查操作
 * 注:server每次重启都会初始化数据
 */

let koa = require('koa');
let bodyParser = require('koa-bodyparser');
let Router = require('koa-router');

const DEFAULT_PORT = 9001;

const UNDONE_LIST_URL = '/todo/r/undone/list';
const DONE_LIST_URL = '/todo/r/done/list';
const ADD_URL = '/todo/w/new';
const EDIT_URL = '/todo/w/update';
const COMPLETE_URL = '/todo/w/complete';
const REMOVE_URL = '/todo/w/remove';
const REOPEN_URL = '/todo/w/reopen';

let uncompleteData = require('./data/uncomplete.json').data;
let completeData = require('./data/complete.json').data;

let app = koa();
let router = Router();
app.use(bodyParser())
    .use(router.routes())
    .use(router.allowedMethods());

// 未完成列表
router.get(UNDONE_LIST_URL, function*() {
    this.body = {
        status: 1,
        code: 200,
        data: uncompleteData
    };
});
// 已完成列表
router.get(DONE_LIST_URL, function*() {
    this.body = {
        status: 1,
        code: 200,
        data: completeData
    };
});
// 新增
router.post(ADD_URL, function*() {
    let data = this.request.body;
    uncompleteData.push({
        id: GUID(),
        title: data.title,
        endTime: data.endTime,
        completedTime: null,
        isCompleted: false,
        priority: data.priority
    });
    this.body = {
        status: 1,
        code: 200,
        data: null
    };
});
// 编辑
router.post(EDIT_URL, function*() {
    let data = this.request.body;
    for (let i = uncompleteData.length - 1; i >= 0; i--) {
        if(uncompleteData[i].id === data.id){
            uncompleteData[i].priority = data.priority;
            uncompleteData[i].title = data.title;
            uncompleteData[i].endTime = data.endTime;
            break;
        }
    }
    this.body = {
        status: 1,
        code: 200,
        data: uncompleteData
    };
});
// 完成
router.post(COMPLETE_URL, function*() {
    let data = this.request.body;
    let index = uncompleteData.findIndex(function(todo){
        return todo.id === data.id;
    });
    if(index !== -1){
        let item = uncompleteData.splice(index, 1);
        item[0].isCompleted = true;
        item[0].completedTime = Date.now();
        completeData.push(item[0]);
        this.body = {
            status: 1,
            code: 200,
            data: {}
        };
    } else {
        this.body = {
            status: 0,
            code: 500,
            data: null,
            message: '该项不存在'
        };
    }
});
// 删除
router.post(REMOVE_URL, function*() {
    let data = this.request.body;
    let index = uncompleteData.findIndex(function(todo){
        return todo.id === data.id;
    });
    if(index !== -1){
        uncompleteData.splice(index, 1);
        this.body = {
            status: 1,
            code: 200,
            data: {}
        };
    } else {
        index = completeData.findIndex(function(todo){
            return todo.id === data.id;
        });
        if(index !== -1){
            completeData.splice(index, 1);
            this.body = {
                status: 1,
                code: 200,
                data: {}
            };
        } else {
            this.body = {
                status: 0,
                code: 500,
                data: null,
                message: '该项不存在'
            };
        }
    }
});
// 重新打开
router.post(REOPEN_URL, function*() {
    let data = this.request.body;
    let index = completeData.findIndex(function(todo){
        return todo.id === data.id;
    });
    if(index !== -1){
        let item = completeData.splice(index, 1);
        item[0].isCompleted = false;
        item[0].completedTime = null;
        uncompleteData.push(item[0]);
        this.body = {
            status: 1,
            code: 200,
            data: {}
        };
    } else {
        this.body = {
            status: 0,
            code: 500,
            data: null,
            message: '该项不存在'
        };
    }
});

app.listen(DEFAULT_PORT);
console.log('server listening on port %d', DEFAULT_PORT);

// 生成GUID
function GUID() {
    return 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx'.replace(/[x]/g, function(c) {
        let num = Math.random() * 16 | 0,
            v = c === 'x' ? num : (num & 0x3 | 0x8);
        return v.toString(16);
    });;
}