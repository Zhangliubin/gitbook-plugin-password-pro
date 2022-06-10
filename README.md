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

```javascript
"password-pro": {
    "password": "123456",
    "tip": "请输入该页面的访问密码:",
    "errorTip": "密码错误, 请重新输入:",
    "reject": "当前页面拒绝访问: 身份验证失败."
},
```

此时，打开所有页面都需要使用密码 `123456`。这里的 `tip`, `errprTip`, `reject` 都具有默认值，可以不进行设置。

### 3. 为指定页面设置参数

```json
"password-pro": {
    "password": "123456",
    "tip": "请输入该页面的访问密码:",
    "errorTip": "密码错误, 请重新输入:",
    "reject": "当前页面拒绝访问: 身份验证失败."
    "README.md": {
        "password": "111",
        "tip": "请输入首页密码: ",
        "errorTip": "密码错误, 请联系管理员",
        "reject": "无法访问当前页面."
    },
},
```

此时，打开 `README.md` 页面需要使用密码 `111`，其他页面都需要使用密码 `123456`。

> 即，指定页面的参数不存在时，则使用全局参数替代。
>
> 可以不设置全局参数，只设置单独页面参数。

### 4. 在同一次访问中，只要单个页面正确输入了密码。则下次访问该页面也不需要密码。

