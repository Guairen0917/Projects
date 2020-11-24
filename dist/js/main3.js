console.log("登录页面，加载成功！");

require.config({
    paths: {
        "jquery" : "jquery-1.11.3",
        "login": "login"
    }
})

require(['login'], function(login){
    
})