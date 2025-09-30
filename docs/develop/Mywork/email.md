---
title: 用AirScript脚本给女/男朋友发送每日早安邮件（极简版本）
tags:
  - 我的作品
---

# 用AirScript脚本给女/男朋友发送每日早安邮件(极简版本)
## 先看效果

![image.png](https://s2.loli.net/2025/02/07/UpHaDLIWyMuOixh.png)


## 工具

金山文档/WPS提供了每日定时的AirScript脚本服务，非常方便～
![image.png](https://s2.loli.net/2025/02/07/vJFficRPdQKmOXE.png)

---

话不多说，我们以金山文档为例，只有简单的五个步骤～

## 教程开始

### 步骤1

我们打开金山文档新建一个智能表格
![image.png](https://s2.loli.net/2025/02/07/Zpeb4xa5uoP3LjO.png)


### 步骤2

按下图填写，注意是 ABC 这三列



| 是否开启      | 邮箱地址   |  是否发送提醒   |
| ----------- | ----------|--------|
| `是`:material-check:    | `你的目的邮箱地址` |  `是` :material-check: |



![image.png](https://s2.loli.net/2025/02/07/OABPyfnYU4FSovR.png)

### 步骤3

按下图找到AirScript脚本编辑器

![image.png](https://s2.loli.net/2025/02/07/RDKns8PgQ9fbO5Z.png)

### 步骤4

新建一个文档共享脚本，输入下方代码

注意！我的网易邮箱授权码是我自己去设置的，如果你想用自己的邮箱需要自己去申请（自行百度），当然你想直接用我的也没问题～

邮箱的具体内容可以自行修改（很简单），我加入了获取当前日期和计算回家天数

```js
// 配置对象
const config = {
    smtp: {
        host: "smtp.163.com",
        port: 465,
        username: "wkw1135801806@163.com", // 替换为您的网易邮箱地址
        password: "YBYBGVAKXDILFAKP", // 替换为您的网易邮箱授权码
        secure: true
    },
    startDate: new Date("2024-07-05"), // 开始回家的日期
    maxRows: 20, // 最大遍历行数
    columns: {
        signIn: "A",
        email: "B",
        sendEmail: "C"
    }
};

// 获取当前日期
var myDate = new Date();
var data_time = myDate.toLocaleDateString();
var daysAtHome = Math.floor((myDate - config.startDate) / (1000 * 60 * 60 * 24)) + 1;

// 祝福语数组
const greetings = [
    "早上好呀～祝你今天有美好的一天！",
    "新的一天，新的开始，加油！",
    "早安！愿今天的你心情愉快！",
    "早上好！今天又是美好的一天！",
    "早上好！希望你今天顺利快乐！"
];

// 随机选择祝福语
function getRandomGreeting() {
    return greetings[Math.floor(Math.random() * greetings.length)];
}

// 发送邮件函数
function sendEmail(to, subject, text) {
    let mailer = SMTP.login(config.smtp);

    mailer.send({
        from: `每日早安提醒<${config.smtp.username}>`, // 确保发件人地址与登录用户名一致
        to: to,
        subject: subject,
        text: text
    });
}

// 记录日志函数
function log(message) {
    console.log(message); // 打印消息到控制台
    // TODO: 将日志写入文件或其他存储
}

// 生成邮件内容函数（自行修改/自行修改/自行修改）
function generateEmailContent(date, daysAtHome) {
    const greeting = getRandomGreeting();
    return `${greeting}
    今天是${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}号，你已经回家${daysAtHome}天。想念你～`;
}

// 遍历数据行并发送早安邮件
function processEmails() {
    for (let row = 2; row <= config.maxRows; row++) {
        try {
            var sflq = Application.Range(config.columns.signIn + row).Text;
            var jsyx = Application.Range(config.columns.email + row).Text;
            var sendEmailFlag = Application.Range(config.columns.sendEmail + row).Text;

            if (sflq === "是" && sendEmailFlag === "是") {
                const logMessage = generateEmailContent(myDate, daysAtHome);
                sendEmail(jsyx, "每日早安提醒 - " + data_time, logMessage);
                log("邮件已发送");
            }
        } catch (error) {
            log("行 " + row + " - Error 404：Girlfriend Not Found.：" + error);
        }
    }
}

// 调用函数处理邮件发送
processEmails();

```

### 步骤5

直接运行的话大概率要报错，因为没有授权服务，按下图去把每个服务都打开
![image.png](https://s2.loli.net/2025/02/07/CcA9sjvW6gKGdrx.png)


## 如何添加每日定时

懂得都懂，点击 效率/高级开发/定时任务。自行设置～
![image.png](https://s2.loli.net/2025/02/07/hrXsC5vAfFDT3b4.png)

技术实现其实不难，对于广大同志们而言，难的是：
![image](https://s1.imagehub.cc/images/2025/01/10/6117b1e963ae201314b99da00151ed22.png)




​