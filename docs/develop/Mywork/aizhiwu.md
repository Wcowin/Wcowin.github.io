---
title: 利用百度API进行植物识别
tags:
  - 我的作品
---
[植物识别_拍照识别植物-百度Al开放平台](https://ai.baidu.com/tech/imagerecognition/plant)

## 一、首先点上方链接去申请应用

有免费试用，随后得到ID和key
![image.png](https://s2.loli.net/2024/02/04/CglJrkUIEKztnHw.png)

## 二、打开Vscode输入代码
```python
import tkinter as tk
from tkinter import filedialog
import requests
import json
import base64

API_KEY = ""  #你的API Key
SECRET_KEY = "" #你的Secret Key

def main():
    root = tk.Tk()
    root.withdraw()  # 隐藏Tkinter窗口

    file_path = filedialog.askopenfilename()  # 打开文件选择对话框

    if file_path:
        classify_image(file_path)
    else:
        print("未选择文件。")

def classify_image(file_path):
    url = "https://aip.baidubce.com/rest/2.0/image-classify/v1/plant?access_token=" + get_access_token()

    with open(file_path, 'rb') as file:
        image_data = file.read()

    base64_data = base64.b64encode(image_data).decode('utf-8')  # 将图像数据转换为Base64编码

    payload = {
        'image': base64_data,
        'baike_num': 1
    }

    headers = {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json'
    }

    response = requests.post(url, headers=headers, data=payload)

    if response.status_code == 200:
        result = json.loads(response.text)
        if 'result' in result:
            plant_info = result['result'][0]
            plant_name = plant_info['name']
            plant_baike = plant_info['baike_info']['description']

            print("植物名称:", plant_name)
            print("百科信息:", plant_baike)
        else:
            print("无法识别植物。")
    else:
        print("识别失败。")

def get_access_token():
    url = "https://aip.baidubce.com/oauth/2.0/token"
    params = {"grant_type": "client_credentials", "client_id": API_KEY, "client_secret": SECRET_KEY}
    response = requests.post(url, params=params)
    
    if response.status_code == 200:
        access_token = response.json().get("access_token")
        return access_token
    else:
        print("获取访问令牌失败。")
        return None

if __name__ == '__main__':
    main()

```

 在这使用了base64.b64encode()方法将图像数据转换为Base64编码。在classify_image()函数中，创建一个payload字典，将Base64编码的图像数据和其他参数一起发送到API。注意这里将baike_num参数设置为1，以获取植物的百科信息。（可从本地选择图片）

![image.png](https://s2.loli.net/2024/02/04/uBSc3lF67pnGsCZ.png)

## 三、得到结果
![image.png](https://s2.loli.net/2024/02/04/G1v4VYEijofqKly.png)