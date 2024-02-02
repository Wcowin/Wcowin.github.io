---
title: 基于讯飞人脸算法进行人脸比对(调用API)
tags:
  - 我的作品
---
## 先看结果
![image.png](https://s2.loli.net/2024/02/02/wH5lXKQDObRTgBZ.png)  

遥遥领先！  
![alt text](https://nimg.ws.126.net/?url=http%3A%2F%2Fdingyue.ws.126.net%2F2023%2F0416%2F2191007fj00rt61pm007ec000ej00mbm.jpg&thumbnail=660x2147483647&quality=80&type=jpg)
## 准备工作

这里我调用了：  
<https://www.xfyun.cn/doc/face/xffaceComparisonRecg/API.html#接口说明>  

代码里所涉及的APPID、APISecret、APIKey 皆从讯飞的控制台获取，自己注册去[讯飞开放平台-以语音交互为核心的人工智能开放平台](https://www.xfyun.cn/)申请即可。  

![](https://s1.imagehub.cc/images/2024/02/02/27089ea5a63f56d2d30cb8fcb9021e76.png)   

## 代码实现 

```python
##APPID、APISecret、APIKey一定要填写！！！##
 
import tkinter as tk
from tkinter import filedialog
from tkinter import Label
from tkinter import ttk
from PIL import Image, ImageTk
import json
import requests
import base64
import hmac
import hashlib
from datetime import datetime
from time import mktime
from wsgiref.handlers import format_date_time
from urllib.parse import urlencode
 
class AssembleHeaderException(Exception):
    def __init__(self, msg):
        self.message = msg
 
class Url:
    def __init__(this, host, path, schema):
        this.host = host
        this.path = path
        this.schema = schema
 
def sha256base64(data):
    sha256 = hashlib.sha256()
    sha256.update(data)
    digest = base64.b64encode(sha256.digest()).decode(encoding='utf-8')
    return digest
 
def parse_url(request_url):
    stidx = request_url.index("://")
    host = request_url[stidx + 3:]
    schema = request_url[:stidx + 3]
    edidx = host.index("/")
    if edidx <= 0:
        raise AssembleHeaderException("invalid request url:" + request_url)
    path = host[edidx:]
    host = host[:edidx]
    u = Url(host, path, schema)
    return u
 
def assemble_ws_auth_url(request_url, method="GET", api_key="", api_secret=""):
    u = parse_url(request_url)
    host = u.host
    path = u.path
    now = datetime.now()
    date = format_date_time(mktime(now.timetuple()))
    signature_origin = "host: {}\ndate: {}\n{} {} HTTP/1.1".format(host, date, method, path)
    signature_sha = hmac.new(api_secret.encode('utf-8'), signature_origin.encode('utf-8'),
                             digestmod=hashlib.sha256).digest()
    signature_sha = base64.b64encode(signature_sha).decode(encoding='utf-8')
    authorization_origin = "api_key=\"%s\", algorithm=\"%s\", headers=\"%s\", signature=\"%s\"" % (
        api_key, "hmac-sha256", "host date request-line", signature_sha)
    authorization = base64.b64encode(authorization_origin.encode('utf-8')).decode(encoding='utf-8')
    values = {
        "host": host,
        "date": date,
        "authorization": authorization
    }
 
    return request_url + "?" + urlencode(values)
 
def gen_body(appid, img1_path, img2_path, server_id):
    with open(img1_path, 'rb') as f:
        img1_data = f.read()
    with open(img2_path, 'rb') as f:
        img2_data = f.read()
    body = {
        "header": {
            "app_id": appid,
            "status": 3
        },
        "parameter": {
            server_id: {
                "service_kind": "face_compare",
                "face_compare_result": {
                    "encoding": "utf8",
                    "compress": "raw",
                    "format": "json"
                }
            }
        },
        "payload": {
            "input1": {
                "encoding": "jpg",
                "status": 3,
                "image": str(base64.b64encode(img1_data), 'utf-8')
            },
            "input2": {
                "encoding": "jpg",
                "status": 3,
                "image": str(base64.b64encode(img2_data), 'utf-8')
            }
        }
    }
    return json.dumps(body)
 
def run(appid, apikey, apisecret, img1_path, img2_path, server_id='s67c9c78c'):
    url = 'http://api.xf-yun.com/v1/private/{}'.format(server_id)
    request_url = assemble_ws_auth_url(url, "POST", apikey, apisecret)
    headers = {'content-type': "application/json", 'host': 'api.xf-yun.com', 'app_id': appid}
    response = requests.post(request_url, data=gen_body(appid, img1_path, img2_path, server_id), headers=headers)
    resp_data = json.loads(response.content.decode('utf-8'))
    result = base64.b64decode(resp_data['payload']['face_compare_result']['text']).decode()
    return result
 
def browse_file(entry_widget, image_label, img_num):
    file_path = filedialog.askopenfilename()
    if file_path:
        entry_widget.delete(0, tk.END)
        entry_widget.insert(0, file_path)
        load_and_display_image(file_path, image_label, img_num)
 
def load_and_display_image(file_path, image_label, image_num):
    try:
        image = Image.open(file_path)
        image = image.resize((200, 200))
        photo = ImageTk.PhotoImage(image)
        image_label.config(image=photo)
        image_label.image = photo
        if image_num == 1:
            global img1_data
            img1_data = image
        elif image_num == 2:
            global img2_data
            img2_data = image
    except Exception as e:
        result_label.config(text="加载图片出错，请检查文件格式")
 
def compare_faces():
    if 'img1_data' not in globals() or 'img2_data' not in globals():
        result_label.config(text="请选择两张图片进行比对")
        return
    
    try:
        img1_path = 'img1.jpg'
        img2_path = 'img2.jpg'
        img1_data.save(img1_path)
        img2_data.save(img2_path)
 
        result = run(appid='',#自行申请填写
                     apisecret='',#自行申请填写
                     apikey='',#自行申请填写
                     img1_path=img1_path,
                     img2_path=img2_path)
        score = float(json.loads(result)['score'])
 
        if score >= 0.67:
            result_label.config(text=f"这两张图片是同一个人，相似度：{score:.2f}")
        else:
            result_label.config(text=f"这两张图片不是同一个人，相似度：{score:.2f}")
    except Exception as e:
        result_label.config(text="比对出错，请检查图片和配置")
 
root = tk.Tk()
root.title("人脸比对")
 
# 设置样式主题
style = ttk.Style()
style.configure('TButton', font=('Helvetica', 12))
style.configure('TLabel', font=('Helvetica', 14))
 
frame = ttk.LabelFrame(root, text="选择图片")
frame.grid(row=0, column=0, columnspan=2, padx=10, pady=10, sticky="ew")
entry1 = tk.Entry(frame, width=50)
entry2 = tk.Entry(frame, width=50)
entry1.grid(row=0, column=0, padx=10, pady=10)
entry2.grid(row=1, column=0, padx=10, pady=10)
 
separator = ttk.Separator(root, orient='horizontal')
separator.grid(row=1, column=0, columnspan=2, sticky="ew")
 
button1 = ttk.Button(root, text="选择图片1", command=lambda: browse_file(entry1, img_label1, 1))
button2 = ttk.Button(root, text="选择图片2", command=lambda: browse_file(entry2, img_label2, 2))
button1.grid(row=2, column=0, padx=10, pady=10)
button2.grid(row=2, column=1, padx=10, pady=10)
 
compare_button = ttk.Button(root, text="比对图片", command=compare_faces)
compare_button.grid(row=3, column=0, columnspan=2, pady=20)
 
result_label = Label(root, text="", font=("Helvetica", 14))
result_label.grid(row=4, column=0, columnspan=2, padx=10, pady=10)
 
img_label1 = tk.Label(root)
img_label1.grid(row=5, column=0, padx=10, pady=10)
img_label2 = tk.Label(root)
img_label2.grid(row=5, column=1, padx=10, pady=10)
 
root.mainloop()

```

为了美观并优化弹窗的布局，使用了ttk.LabelFrame来创建一个带有标题的框架，用于容纳选择图片的部件。还在界面中添加了一个水平分隔符ttk.Separator，以提高界面的可读性。

官方代码里图片路径需要自行填写，改进后则使得可以从本地选择需要对比图片。


## Github项目地址

<https://github.com/Wcowin/XunFei-Face-compare>

打包好的地址：<https://github.com/Wcowin/XunFei-Face-compare/releases/download/exe/test4.exe.zip>

## 视频

<!-- <iframe src="//player.bilibili.com/player.html?aid=406004879&bvid=BV1GV411N7pj&cid=1270928476&p=1" scrolling="yes" border="0" frameborder="no" framespacing="0" allowfullscreen="true" style="width: 540px; height: 315px; max-width: 100%"> </iframe> -->
<iframe src="//player.bilibili.com/player.html?aid=406004879&bvid=BV1GV411N7pj&cid=1270928476&p=1" scrolling="yes" border="0" frameborder="no" framespacing="0" allowfullscreen="true" style="width: 560px; height: 315px; max-width: 100%"> </iframe>