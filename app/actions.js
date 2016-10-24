// 注：使用前请将该变量改成本机的ip地址
const HOSTNAME = '172.18.194.21';

const BASE_PATH = `http://${HOSTNAME}:9001`;
const UNDONE_LIST_URL = BASE_PATH + '/todo/r/undone/list';
const DONE_LIST_URL = BASE_PATH + '/todo/r/done/list';
const ADD_URL = BASE_PATH + '/todo/w/new';
const EDIT_URL = BASE_PATH + '/todo/w/update';
const REMOVE_URL = BASE_PATH + '/todo/w/remove';
const REOPEN_URL = BASE_PATH + '/todo/w/reopen';
const COMPLETE_URL = BASE_PATH + '/todo/w/complete';

let Actions = {};
// 获取未完成列表
Actions.getUndoneTodoList = async() => {
    try {
        let response = await fetch(UNDONE_LIST_URL);
        let responseJson = await response.json();
        return responseJson;
    } catch (error) {
        console.error(error);
    }
};
// 获取已经完成的列表
Actions.getDoneTodoList = async() => {
    try {
        let response = await fetch(DONE_LIST_URL);
        let responseJson = await response.json();
        return responseJson;
    } catch (error) {
        console.error(error);
    }
};
// 新增
Actions.addNewTodo = async ({title,endTime,priority}) => {
    try {
        let response = await fetch(ADD_URL, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({title,endTime,priority})
        });
        let responseJson = await response.json();
        return responseJson;
    } catch (error) {
        console.error(error);
    }
};
// 编辑
Actions.editTodo = async ({id,title,endTime,priority}) => {
    try {
        let response = await fetch(EDIT_URL, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({id,title,endTime,priority})
        });
        let responseJson = await response.json();
        return responseJson;
    } catch (error) {
        console.error(error);
    }
};
// 删除
Actions.removeTodo = async (id) => {
    try {
        let response = await fetch(REMOVE_URL, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({id})
        });
        let responseJson = await response.json();
        return responseJson;
    } catch (error) {
        console.error(error);
    }
};
// 重新打开
Actions.reopenTodoItem = async(id) => {
    try {
        let response = await fetch(REOPEN_URL, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id
            })
        });
        let responseJson = await response.json();
        return responseJson;
    } catch (error) {
        console.error(error);
    }
};
// 完成
Actions.completeTodoItem = async(id) => {
    try {
        let response = await fetch(COMPLETE_URL, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id
            })
        });
        let responseJson = await response.json();
        return responseJson;
    } catch (error) {
        console.error(error);
    }
};


export default Actions;