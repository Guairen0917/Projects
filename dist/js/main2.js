console.log("注册页面，加载成功！");

require.config({
    paths: {
        "jquery" : "jquery-1.11.3",
        "register": "register"
    }
})

require(['register'], function(register){
    register.registerSend();
})