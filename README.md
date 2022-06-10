# gitbook-plugin-password-pro

## 关于插件

这是一个 Gitbook/Honkit 可用的君子密码加密器。基本原理是将每个网页打开时的 `.book-body` 设置为隐藏 (即`display: none`)，输入了正确密码的页面会被解除隐藏。

与其他插件对比：gitbook-plugin-password 和 gitbook-plugin-password-z 是目前能找到的 gitbook 的加密插件。但是很遗憾都无法正常使用了。

此外，`gitbook-plugin-password` 的加密可以直接使用 `停止使用 javascript` 进行破解。而本插件则需要多一步。在糊弄小白上还是没什么问题的 (稍微有一点 html 基础都能破解吧 hhh)。

> 使用案例见：https://github.com/Zhangliubin/honkit-docker

## 插件下载及使用

下载：

```bash
npm install gitbook-plugin-password-pro
```

使用：

```javascript
"plugins": ["password-pro"]
```

注意，一直到这一步，网页都没有处于 “加密状态”。

## 配置插件

### 1. 引入插件配置

当 `pluginsConfig` 中导入插件 `password-pro` 时，页面的加密就开始了。

```json
{
    "pluginsConfig": {
        "password-pro": {
        }
    }
}
```

### 2. 设置全局参数

本插件有 4 个全局参数:

```javascript
"password-pro": {
    "password": "123456",
    "tip": "请输入该页面的访问密码:",
    "errorTip": "密码错误, 请重新输入:",
    "reject": "当前页面拒绝访问: 身份验证失败."
},
```

`"password"` 表示为所有页面都添加密码。当传入的字符串为空字符串或不传入时表示不加密。

### 3. 为指定页面设置参数

```json
"password-pro": {
    "README.md": "",
    "password": "20220611",
    "download.md": {
        "password": "12306",
        "tip": "下载资源需要验证密码:"
    },
    "command-line-interface.md": "complex12306",
    "tip": "请输入当前页面的访问密码:",
    "errorTip": "密码错误, 请重新输入:"
}
```

该语句表示 `README.md` 不加密，全局密码为 `20220611`，`download.md` 密码为 `12306`，`command-line-interface.md` 密码为 `complex12306`。

即格式有两种: 

```json
"<page>": "<password>"
```

和

```json
"<page>": {
    "password": "<password>",
    "tip": "<tip>",
    "errorTip": "<errorTip>",
    "reject": "<reject>"
},
```

在第二种格式中，缺少的字段将使用全局参数替代。

### 4. 在同一次访问中，只要单个页面正确输入了密码。则下次访问该页面也不需要密码。

