require(["gitbook", "jQuery"], function (gitbook, $) {
    // book.js 参数信息
    var inputs;

    // 是否启动该插件
    var enable;

    // 全局参数
    var globalPassword;
    var globalTip;
    var globalErrorTip;
    var globalReject;

    // 使用日期进行混淆加密
    const S_KEY = new Date();

    // 已经验证的参数列表
    var okPage = {};

    gitbook.events.bind('start', function (e, config) {
        inputs = config['password-pro'];
        if (inputs) {
            // 匹配 global 信息
            globalTip = inputs.tip;
            globalErrorTip = inputs.errorTip;
            globalReject = inputs.reject;
            if (inputs.password) {
                globalPassword = md5(inputs.password + S_KEY);
            }
            enable = true;
        } else {
            enable = false;
        }
    });

    gitbook.events.bind('page.change', function (e, config) {
        // 当前页面路径:
        var id = gitbook.state.file.path;

        if (enable && okPage[id] == null) {
            var tip;
            var errorTip;
            var reject;
            var password;

            // 查看当前页面状态
            if (inputs[id]) {
                // 该页面有自定义的密码参数信息
                tip = inputs[id]["tip"] || globalTip;
                errorTip = inputs[id]["errorTip"] || globalErrorTip;
                reject = inputs[id]["reject"] || globalReject;

                if (inputs[id]["password"]) {
                    password = md5(inputs[id]["password"] + S_KEY);
                } else {
                    password = globalPassword;
                }
            } else {
                // 该页面没有自定义的密码参数信息
                tip = globalTip;
                errorTip = globalErrorTip;
                reject = globalReject;
                password = globalPassword;
            }

            if (password) {
                // 如果该页面有密码
                var inputPassword = prompt(tip);
                if (inputPassword != null) {
                    // 如果用户输入了密码
                    inputPassword = md5(inputPassword + S_KEY);
                    while (inputPassword != password) {
                        // 请重新输入密码
                        inputPassword = prompt(errorTip);
                        if (inputPassword != null) {
                            // 如果用户输入了密码
                            inputPassword = md5(inputPassword + S_KEY);
                        } else {
                            // 用户点击了取消
                            alert(reject);
                            return;
                        }
                    }

                    // 密码输入正确
                    okPage[id] = true;
                } else {
                    // 用户点击了取消
                    alert(reject);
                    return;
                }
            }
        }

        // 没有密码或密码正确, 该页面设置为显示
        document.getElementsByClassName("book-body")[0].style.display = "block";
    });
});
