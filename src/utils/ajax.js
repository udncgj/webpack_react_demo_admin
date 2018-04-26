const sync = {}
const async = {}
const ajaxData = {
    login: {
        type: 'async',
        method: 'POST',
        url: 'login'
    },

    menuAdd: {
        type: 'async',
        method: 'POST',
        url: 'u/menu/add'
    },
    menuGet: {
        type: 'async',
        method: 'POST',
        url: 'u/menu/get'
    },
    menuDel: {
        type: 'async',
        method: 'POST',
        url: 'u/menu/del'
    },
    menuUpDown: {
        type: 'async',
        method: 'POST',
        url: 'u/menu/upDownMove'
    },
    menuEdit: {
        type: 'async',
        method: 'POST',
        url: 'u/menu/edit'
    },

    roleGet: {
        type: 'async',
        method: 'POST',
        url: 'u/role/get'
    },
    roleEdit: {
        type: 'async',
        method: 'POST',
        url: 'u/role/edit'
    },
}
export default ajaxData;