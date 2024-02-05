---
title: 人脸识别系统
tags:
  - 我的作品
status: new
---

**原文：**
>Bilibili:  [用300行代码实现人脸识别系统_哔哩哔哩_bilibili](https://www.bilibili.com/video/BV1ZZ4y1S76N/){target="_blank"}    

> CSDN博客：[用300行Python代码实现一个人脸识别系统_dejahu的博客-CSDN博客](https://blog.csdn.net/ECHOSON/article/details/122404926){target="_blank"}

## 基本原理

数据收集与预处理:  
首先，主要是借助dlib库，系统需要收集用于人脸识别的数据。这些数据包括已知身份的人脸图像，通常是系统的训练数据集。这些图像将用于创建人脸特征向量以及后续的人脸匹配。在收集数据后，对图像进行预处理，包括增强图像质量、调整大小和归一化等操作，以便进行更准确的识别。

人脸特征提取:  
对于每个人脸图像，系统使用人脸识别模型（通常是深度学习模型）来提取人脸的特征向量。这些特征向量是对人脸的独特表示，用于后续的比对和匹配。

人脸识别模型:  
通常，系统使用已经训练好的深度学习模型，例如基于卷积神经网络（CNN）的模型来进行人脸特征提取。这些模型在训练阶段学会了如何从人脸图像中提取有用的特征。

实时检测与识别:  
在实时检测过程中，系统捕捉视频流或图像帧，并使用人脸检测算法（例如Haar级联分类器或更高级的人脸检测器）来检测图像中的人脸位置。一旦检测到人脸，系统会提取该人脸的特征向量。

人脸匹配:  
提取的人脸特征向量与已知的人脸特征向量进行比对。这可以通过计算两个特征向量之间的相似度来实现。如果相似度超过预定的阈值（例如0.5），则认为是同一个人，否则被标记为“未知”。

结果显示:  
识别结果会显示在屏幕上，通常会在人脸周围绘制边界框，并显示人名或"Unknown"，表示未知身份。这些结果会实时更新，以便用户可以在视频流或图像中看到识别的人脸。

用户交互:  
系统通常提供用户交互界面，允许用户上传图像、开始或停止实时识别，并可能提供管理已知人脸数据的功能



**示意图**
![image-20220109232309780](https://vehicle4cm.oss-cn-beijing.aliyuncs.com/typoraimgs/image-20220109232309780.png)  

## 创建虚拟环境

创建虚拟环境前先下载[源码](https://gitee.com/song-laogou/face_dlib_py37_42){target="_blank"}到本地。

需要使用到python3.7的虚拟环境，命令如下：
```bash
conda create -n face python==3.7.3

conda activate face
```  

跑轮子（原作者[这里](https://mbd.pub/o/bread/ZJeYkpdt?next=pay&author_name=肆十二&author_avatar=https%3A%2F%2Fcdn.2zimu.com%2Fmbd_file_1679134971152.jpg)是要钱的，轮子也是必要的，其实也有其他方法实现，但是**我也付费了的**，也请尊重知识付费）
```bash
pip install dlib-19.17.0-cp37-cp37m-win_amd64.whl
```

![](https://cn.mcecy.com/image/20230923/f28378ab5069af2ada77be4388f78f15.png)

安装必要的库
```bash
pip install -r requirements.txt
```  

运行  
```bash
python 文件名.py
```
!!! note 
    如果Anaconda都不会，移步：  
    [如何在pycharm中配置anaconda的虚拟环境](https://blog.csdn.net/ECHOSON/article/details/117220445){target="_blank"}   
    [Python学习中Anaconda和Pycharm的正确打开方式](https://www.bilibili.com/video/BV15o4y127Rt/?vd_source=4c6908c51297ba49ec55863b71e0d24f){target="_blank"}

Pycharm/Vs code也不会的话，那…………下面的内容就不推荐阅读了

## 我在原作者基础上做的优化版

提高人脸识别精度的改进：

1. **增加人脸图像的数量和多样性**：在数据库中收集更多不同角度、不同光照条件下的人脸图像，以便算法可以更好地适应不同情况。

2. **使用更高级的人脸识别模型**：你目前使用的是基于dlib的人脸识别模型，可以考虑使用更高级的模型，例如基于深度学习的人脸识别模型，如FaceNet、VGGFace等。这些模型在大规模人脸识别任务上表现良好。

3. **进行人脸图像预处理**：你可以在上传人脸图像时进行一些预处理，例如：
   - 图像增强：你已经在代码中实现了对比度增强，可以考虑添加其他增强技术，如直方图均衡化，以改善图像质量。
   - 人脸对齐：确保上传的人脸图像都经过对齐，这有助于减少姿态和光照差异对识别的影响。

（4. **调整识别阈值**：在代码中，你可以通过调整人脸匹配的阈值来控制识别的严格程度。较高的阈值会提高识别的准确性，但可能会导致漏识别。较低的阈值可能会增加误识别的风险。

5. **处理多个人脸的情况**：当前的代码处理多个人脸时，只返回最相似的一个人名，你可以考虑扩展代码以识别和标识多个人脸。

6. **引入人脸质量评估**：在进行人脸匹配之前，可以使用人脸质量评估工具来评估图像中人脸的质量，然后选择性地处理质量较高的人脸，以提高准确性。

7. **在线学习和更新**：允许用户根据新上传的人脸图像不断更新人脸数据库，以不断改进模型的性能。

8. **异常处理**：在人脸检测和识别中，添加异常处理，以应对检测不到人脸或识别失败的情况，并提供用户友好的反馈。

9. **考虑隐私和安全性**：确保你的人脸识别系统遵守隐私法规，并采取适当的安全措施，以防止滥用和数据泄漏。

10. **性能优化**：对于实时人脸识别，优化代码以提高处理速度，以便更快地响应用户的请求。）


**后面几条暂未实现**，但是也增加了100多行代码

代码如下，已做注释：
```python
from PyQt5.QtWidgets import *
import threading
import sys
from PyQt5.QtCore import *
from PyQt5.QtWidgets import QFileDialog, QMessageBox, QDockWidget, QListWidget
from PyQt5.QtGui import *
import face_recognition
import cv2
import os
import face_recognition_models
import cv2
import locale
locale.setlocale(locale.LC_ALL, 'zh_CN.UTF-8')

def enhance_image_quality(image):
    # 增强对比度
    alpha = 1.5  # 调整对比度的参数
    beta = 30    # 调整亮度的参数
    enhanced_image = cv2.convertScaleAbs(image, alpha=alpha, beta=beta)
    
    return enhanced_image


# 窗口主类

class MainWindow(QTabWidget):
    # 基本配置不动，然后只动第三个界面
    def __init__(self):
        # 初始化设置
        super().__init__()
        self.setWindowTitle('实时人脸识别系统')
        self.resize(1100, 650)
        self.setWindowIcon(QIcon("UI_images/faxian.png"))
        # 要上传的图片路径
        self.up_img_name = ""
        # 要检测的图片名称
        self.input_fname = ""
        # 要检测的视频名称
        self.source = ''
        self.video_capture = cv2.VideoCapture(0)
        # 初始化中止事件
        self.stopEvent = threading.Event()
        self.stopEvent.clear()
        # 初始化人脸向量
        self.known_names, self.known_encodings = self.initFaces()
        # 加载lbp检测器
        # 加载人脸识别模型
        # 初始化界面
        self.initUI()
        self.set_down()


        

    # 初始化数据库的人脸
    def initFaces(self):
        # 存储知道人名列表
        known_names = []
        # 存储知道的特征值
        known_encodings = []
        # 遍历存储人脸图片的文件夹
        db_folder = "images/db_faces"
        face_imgs = os.listdir(db_folder)
        # 加载更复杂的人脸识别模型
        face_rec_model = "cnn"  # 使用深度学习模型，通常更准确
        # 遍历图片，将人脸图片转化为向量
        for face_img in face_imgs:
            face_img_path = os.path.join(db_folder, face_img)
            face_name = face_img.split(".")[0]
            load_image = face_recognition.load_image_file(face_img_path)  # 加载图片
            image_face_encoding = face_recognition.face_encodings(load_image, model=face_rec_model)[0]  # 获得128维特征值
            known_names.append(face_name)  # 添加到人名的列表
            known_encodings.append(image_face_encoding)  # 添加到向量的列表
        return known_names, known_encodings

    # 在 up_img 函数中添加图像预处理步骤
    def up_img(self):
        # 打开文件选择框
        openfile_name = QFileDialog.getOpenFileName(self, '选择文件', '', 'Image files(*.jpg , *.png)')
        # 获取上传的文件名称
        img_name = openfile_name[0]
        if img_name == '':
            pass
        else:
            # 上传之后显示并做归一化处理
            src_img = cv2.imread(img_name)
            src_img = enhance_image_quality(src_img)  # 增强图像质量
            src_img_height = src_img.shape[0]
            src_img_width = src_img.shape[1]
            target_img_height = 400
            ratio = target_img_height / src_img_height
            target_img_width = int(src_img_width * ratio)
            # 将图片统一处理到高为400的图片，方便在界面上显示
            target_img = cv2.resize(src_img, (target_img_width, target_img_height))
            cv2.imwrite("UI_images/tmp/toup.jpg", target_img)
            self.img_f_img.setPixmap(QPixmap("UI_images/tmp/toup.jpg"))
            self.up_img_name = "UI_images/tmp/toup.jpg"

    def open_local(self):
        # 选择录像文件进行读取
        mp4_filename = 0
        self.source = mp4_filename
        self.video_capture = cv2.VideoCapture(self.source)

        # 设置摄像头分辨率
        self.video_capture.set(cv2.CAP_PROP_FRAME_WIDTH, 640)
        self.video_capture.set(cv2.CAP_PROP_FRAME_HEIGHT, 480)

        th = threading.Thread(target=self.display_video)
        th.start()

    
    # 初始化界面
    def initUI(self):
        # 设置字体
        font_v = QFont('楷体', 14)
        generally_font = QFont('楷体', 15)
        # 图片检测
        img_widget = QWidget()
        img_layout = QVBoxLayout()
        img_f_title = QLabel("上传人脸图像")  # 设置标题
        img_f_title.setAlignment(Qt.AlignCenter)  # 设置标题位置为居中
        img_f_title.setFont(QFont('楷体', 18))  # 设置标题字体大小
        # todo 要上传的人脸图像
        self.img_f_img = QLabel()  # 设置第一个界面上要显示的图片
        self.img_f_img.setPixmap(QPixmap("UI_images/zhuye.jpeg"))  # 初始化要显示的图片
        self.img_f_img.setAlignment(Qt.AlignCenter)  # 设置图片居中

        # 创建一个表单布局来包含提示文本和人名输入框
        form_layout = QFormLayout()
        name_label = QLabel("请输入姓名: ")  # 添加提示文本
        self.face_name = QLineEdit()  # 设置当前图片对应的人名
        form_layout.addRow(name_label, self.face_name)  # 将提示文本和输入框添加到表单布局

        # 创建一个水平布局来包含"上传图片"按钮和"开始上传"按钮
        buttons_layout = QHBoxLayout()
        img_up_btn = QPushButton("上传图片")  # 设置上传图片的按钮
        img_det_btn = QPushButton("开始上传")  # 设置开始上传的按钮
        img_up_btn.clicked.connect(self.up_img)  # 联系到相关函数
        img_det_btn.clicked.connect(self.up_db_img)  # 连接到相关函数

        # 设置组件的样式
        img_up_btn.setFont(generally_font)
        img_det_btn.setFont(generally_font)
        img_up_btn.setStyleSheet("QPushButton{color:white}"
                                "QPushButton:hover{background-color: rgb(2,110,180);}"
                                "QPushButton{background-color:rgb(48,124,208)}"
                                "QPushButton{border:2px}"
                                "QPushButton{border-radius:5px}"
                                "QPushButton{padding:5px 5px}"
                                "QPushButton{margin:5px 5px}")
        img_det_btn.setStyleSheet("QPushButton{color:white}"
                                "QPushButton:hover{background-color: rgb(2,110,180);}"
                                "QPushButton{background-color:rgb(48,124,208)}"
                                "QPushButton{border:2px}"
                                "QPushButton{border-radius:5px}"
                                "QPushButton{padding:5px 5px}"
                                "QPushButton{margin:5px 5px}")

        # 将组件添加到布局上，然后设置主要的widget为当前的布局
        img_layout.addWidget(img_f_title)
        img_layout.addWidget(self.img_f_img)
        img_layout.addLayout(form_layout)  # 添加表单布局到垂直布局
        buttons_layout.addWidget(img_up_btn)  # 添加按钮到水平布局
        buttons_layout.addWidget(img_det_btn)  # 添加按钮到水平布局
        img_layout.addLayout(buttons_layout)  # 添加水平布局到垂直布局
        img_widget.setLayout(img_layout)




        '''
        *** 4. 视频识别界面 ***
        '''
        video_widget = QWidget()
        video_layout = QVBoxLayout()
        # 设置视频识别区的标题
        self.video_title2 = QLabel("摄像头/视频识别区")
        self.video_title2.setFont(font_v)
        self.video_title2.setAlignment(Qt.AlignCenter)
        self.video_title2.setFont(font_v)
        # 设置显示的界面
        self.DisplayLabel = QLabel()
        self.DisplayLabel.setPixmap(QPixmap(""))
        self.btn_open_rsmtp = QPushButton("人脸检测摄像头")
        self.btn_open_rsmtp.setFont(font_v)
        # 设置打开摄像头的按钮和样式
        self.btn_open_rsmtp.setStyleSheet("QPushButton{color:white}"
                                          "QPushButton:hover{background-color: rgb(2,110,180);}"
                                          "QPushButton{background-color:rgb(48,124,208)}"
                                          "QPushButton{border:2px}"
                                          "QPushButton{border-radius:5px}"
                                          "QPushButton{padding:5px 5px}"
                                          "QPushButton{margin:5px 5px}")
        # 设置选择文件的的按钮和样式
        self.btn_open = QPushButton("开始识别（选择文件）")
        self.btn_open.setFont(font_v)
        self.btn_open.setStyleSheet("QPushButton{color:white}"
                                    "QPushButton:hover{background-color: rgb(2,110,180);}"
                                    "QPushButton{background-color:rgb(48,124,208)}"
                                    "QPushButton{border:2px}"
                                    "QPushButton{border-radius:5px}"
                                    "QPushButton{padding:5px 5px}"
                                    "QPushButton{margin:5px 5px}")
        # 设置结束演示的按钮和样式
        self.btn_close = QPushButton("结束检测")
        self.btn_close.setFont(font_v)
        self.btn_close.setStyleSheet("QPushButton{color:white}"
                                     "QPushButton:hover{background-color: rgb(2,110,180);}"
                                     "QPushButton{background-color:rgb(48,124,208)}"
                                     "QPushButton{border:2px}"
                                     "QPushButton{border-radius:5px}"
                                     "QPushButton{padding:5px 5px}"
                                     "QPushButton{margin:5px 5px}")
        # 将组件添加到布局上
        self.btn_open_rsmtp.clicked.connect(self.open_local)
        self.btn_open.clicked.connect(self.open)
        self.btn_close.clicked.connect(self.close)
        video_layout.setAlignment(Qt.AlignCenter)
        video_layout.addWidget(self.video_title2)
        video_layout.addWidget(self.DisplayLabel)
        self.DisplayLabel.setAlignment(Qt.AlignCenter)
        video_layout.addWidget(self.btn_open_rsmtp)
        video_layout.addWidget(self.btn_open)
        video_layout.addWidget(self.btn_close)
        video_widget.setLayout(video_layout)
        '''
        *** 5. 关于界面 ***
        '''
        about_widget = QWidget()
        about_layout = QVBoxLayout()
        about_title = QLabel('欢迎使用人脸检测系统\n\n')  # todo 修改欢迎词语
        about_title.setFont(QFont('楷体', 18))
        about_title.setAlignment(Qt.AlignCenter)
        about_img = QLabel()
        about_img.setPixmap(QPixmap('UI_images/san.png'))
        about_img.setAlignment(Qt.AlignCenter)

        # label4.setText("<a href='https://oi.wiki/wiki/学习率的调整'>如何调整学习率</a>")
        label_super = QLabel()  # todo 更换作者信息
        label_super.setText("<a href='https://wcowin.work/'>-->联系我们</a>")
        label_super.setFont(QFont('楷体', 16))
        label_super.setOpenExternalLinks(True)
        # label_super.setOpenExternalLinks(True)
        label_super.setAlignment(Qt.AlignRight)
        about_layout.addWidget(about_title)
        about_layout.addStretch()
        about_layout.addWidget(about_img)
        about_layout.addStretch()
        about_layout.addWidget(label_super)
        about_widget.setLayout(about_layout)
        # 分别添加子页面
        self.addTab(img_widget, "上传人脸")
        self.addTab(video_widget, '视频检测')
        self.addTab(about_widget, '关于')
        self.setTabIcon(0, QIcon('UI_images/图片.png'))
        self.setTabIcon(1, QIcon('UI_images/图片.png'))
        self.setTabIcon(1, QIcon('UI_images/直播.png'))
        self.setTabIcon(2, QIcon('UI_images/logo_about.png'))

    # 第一个界面的函数
    def up_img(self):
        # 打开文件选择框
        openfile_name = QFileDialog.getOpenFileName(self, '选择文件', '', 'Image files(*.jpg , *.png)')
        # 获取上传的文件名称
        img_name = openfile_name[0]
        if img_name == '':
            pass
        else:
            # 上传之后显示并做归一化处理
            src_img = cv2.imread(img_name)
            src_img_height = src_img.shape[0]
            src_img_width = src_img.shape[1]
            target_img_height = 400
            ratio = target_img_height / src_img_height
            target_img_width = int(src_img_width * ratio)
            # 将图片统一处理到高为400的图片，方便在界面上显示
            target_img = cv2.resize(src_img, (target_img_width, target_img_height))
            cv2.imwrite("UI_images/tmp/toup.jpg", target_img)
            self.img_f_img.setPixmap(QPixmap("UI_images/tmp/toup.jpg"))
            self.up_img_name = "UI_images/tmp/toup.jpg"

    def up_db_img(self):
        # 首先判断该图像是否有一个人脸，多个人脸或者没有人脸都不行
        face_name = self.face_name.text()
        if face_name == "":
            QMessageBox.information(self, "不能为空", "请填写人脸姓名")
        else:
            load_image = face_recognition.load_image_file(self.up_img_name)  # 加载图片
            image_face_encoding = face_recognition.face_encodings(load_image)  # 获得128维特征值
            encoding_length = len(image_face_encoding)  # 获取人脸得数量
            if encoding_length == 0:  # 如果没有人脸，提示用户重新上传
                QMessageBox.information(self, "请重新上传", "当前图片没有发现人脸")
            elif encoding_length > 1:  # 如果人脸有多个，也提示用户重新上传
                QMessageBox.information(self, "请重新上传", "当前图片发现多张人脸")
            else:
                face_encoding = image_face_encoding[0]  # 获取解析得到得人脸数量
                img = cv2.imread(self.up_img_name)  # 将上传得图片保存在db目录下
                img_path = face_name + '.jpg'
                cv2.imwrite("images/db_faces/" + img_path, img)
                # 上传之后重新对字典进行处理
                self.known_names.append(face_name)
                self.known_encodings.append(face_encoding)
                QMessageBox.information(self, "上传成功", "数据已上传！")

    '''
    ### 3. 视频识别相关功能 ### 
    '''

    # 关闭事件 询问用户是否退出
    def closeEvent(self, event):
        reply = QMessageBox.question(self,
                                     '退出',
                                     "是否要退出程序？",
                                     QMessageBox.Yes | QMessageBox.No,
                                     QMessageBox.No)
        if reply == QMessageBox.Yes:
            self.close()
            event.accept()
        else:
            event.ignore()

    # 读取录像文件
    def open(self):
        # 选择录像文件进行读取
        mp4_fileName, fileType = QFileDialog.getOpenFileName(self, 'Choose file', '', '*.mp4')
        if mp4_fileName:
            # 启动录像文件读取得线程并在画面上实时显示
            self.source = mp4_fileName
            self.video_capture = cv2.VideoCapture(self.source)
            th = threading.Thread(target=self.display_video)
            th.start()

    def open_local(self):
        # 选择录像文件进行读取
        mp4_filename = 0
        self.source = mp4_filename
        # 读取摄像头进行实时得显示
        self.video_capture = cv2.VideoCapture(self.source)
        th = threading.Thread(target=self.display_video)
        th.start()

    # 退出进程
    def close(self):
        # 点击关闭按钮后重新初始化界面
        self.stopEvent.set()
        self.set_down()

    # todo 执行人脸识别主进程
    def display_video(self):
        self.btn_open.setEnabled(False)
        self.btn_close.setEnabled(True)
        process_this_frame = True
        while True:
            ret, frame = self.video_capture.read()
            rgb_frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
            if process_this_frame:
                face_locations = face_recognition.face_locations(rgb_frame)
                face_encodings = face_recognition.face_encodings(rgb_frame, face_locations)
                face_names = []
                for face_encoding in face_encodings:
                    matches = face_recognition.compare_faces(self.known_encodings, face_encoding, tolerance=0.5)
                    if True in matches:
                        first_match_index = matches.index(True)
                        name = self.known_names[first_match_index]
                    else:
                        name = "Unknown"
                    face_names.append(name)
            process_this_frame = not process_this_frame
            for (top, right, bottom, left), name in zip(face_locations, face_names):
                cv2.rectangle(frame, (left, top), (right, bottom), (0, 0, 255), 2)  # 修改边界框颜色为红色
                cv2.rectangle(frame, (left, bottom - 35), (right, bottom), (0, 0, 255), cv2.FILLED)  # 修改填充颜色为红色
                font = cv2.FONT_HERSHEY_DUPLEX
                cv2.putText(frame, name, (left + 6, bottom - 6), font, 1.0, (255, 255, 255), 1)
            frame = frame
            frame_height = frame.shape[0]
            frame_width = frame.shape[1]
            frame_scale = 500 / frame_height
            frame_resize = cv2.resize(frame, (int(frame_width * frame_scale), int(frame_height * frame_scale)))
            cv2.imwrite("images/tmp.jpg", frame_resize)
            self.DisplayLabel.setPixmap(QPixmap("images/tmp.jpg"))
            if cv2.waitKey(25) & self.stopEvent.is_set() == True:
                self.stopEvent.clear()
                self.DisplayLabel.clear()
                self.btn_close.setEnabled(False)
                self.btn_open.setEnabled(True)
                self.set_down()
                break
        self.btn_open.setEnabled(True)
        self.btn_close.setEnabled(False)
        self.set_down()

    # 初始化视频检测界面
    def set_down(self):
        self.video_capture.release()
        cv2.destroyAllWindows()
        self.DisplayLabel.setPixmap(QPixmap("UI_images/dier.jpeg"))


# https://www.lfd.uci.edu/~gohlke/pythonlibs/
# https://pypi.org/project/dlib/#files
# https://download.csdn.net/download/ECHOSON/75224362
if __name__ == "__main__":
    # 加载页面
    app = QApplication(sys.argv)
    mainWindow = MainWindow()
    mainWindow.show()
    sys.exit(app.exec_())


```

## 效果

![image.png](https://s2.loli.net/2024/02/04/AcdiBjGqRu3zZnO.jpg)

**准确度显著提高，多人照片识别也更快，UI交互也做了改进**  

## 持续优化ing
恰逢Pytho课程设计，于是我便拿出来作为小组设计作品，但是做了进一步完善  

团队(姚双、本作者、张平、刘银杰)优化后最终版本：  
**识别精度大幅提升，支持多人脸识别，支持多种人脸识别模型，支持人脸图像预处理，支持使用更高级的人脸识别模型，支持增加人脸图像的数量和多样性，支持使用更高级的人脸识别模型，支持人脸图像预处理，支持人脸匹配，支持结果显示，支持用户交互，支持数据收集与预处理，支持人脸特征提取**  

```py
from PyQt5.QtWidgets import *
import threading
import sys
from PyQt5.QtCore import *
from PyQt5.QtWidgets import QFileDialog, QMessageBox, QDockWidget, QListWidget
from PyQt5.QtGui import *
import face_recognition
import cv2
import os
from PIL import Image, ImageDraw, ImageFont
import numpy as np

# 窗口主类

class MainWindow(QTabWidget):
    # 基本配置不动，然后只动第三个界面
    def __init__(self):
        # 初始化设置
        super().__init__()
        self.setWindowTitle('实时人脸识别系统')
        self.resize(1100, 650)
        self.setWindowIcon(QIcon("UI_images/faxian.png"))
        # 要上传的图片路径
        self.up_img_name = ""
        # 要检测的图片名称
        self.input_fname = ""
        # 要检测的视频名称
        self.source = ''
        self.video_capture = cv2.VideoCapture(0)
        # 初始化中止事件
        self.stopEvent = threading.Event()
        self.stopEvent.clear()
        # 初始化人脸向量
        self.known_names, self.known_encodings = self.initFaces()
        # 加载lbp检测器
        # 加载人脸识别模型
        # 初始化界面
        self.initUI()
        self.set_down()

    # 初始化数据库的人脸
    def initFaces(self):
        # 存储知道人名列表
        known_names = []
        # 存储知道的特征值
        known_encodings = []
        # 遍历存储人脸图片的文件夹
        db_folder = "images/db_faces"
        face_imgs = os.listdir(db_folder)
        # 遍历图片，将人脸图片转化为向量
        for face_img in face_imgs:
            face_img_path = os.path.join(db_folder, face_img)
            face_name = face_img.split(".")[0]
            load_image = face_recognition.load_image_file(face_img_path)  # 加载图片
            image_face_encoding = face_recognition.face_encodings(load_image)[0]  # 获得128维特征值
            known_names.append(face_name)  # 添加到人名的列表
            known_encodings.append(image_face_encoding)  # 添加到向量的列表
        return known_names, known_encodings

    # 初始化界面
    def initUI(self):
        # 设置字体
        font_v = QFont('楷体', 14)
        generally_font = QFont('楷体', 15)
        # 图片检测
        img_widget = QWidget()
        img_layout = QVBoxLayout()
        img_f_title = QLabel("上传人脸图像")  # 设置标题
        img_f_title.setAlignment(Qt.AlignCenter)  # 设置标题位置为居中
        img_f_title.setFont(QFont('楷体', 18))  # 设置标题字体大小
        # todo 要上传的人脸图像
        self.img_f_img = QLabel()  # 设置第一个界面上要显示的图片
        self.img_f_img.setPixmap(QPixmap("UI_images/zhuye.jpeg"))  # 初始化要显示的图片
        self.img_f_img.setAlignment(Qt.AlignCenter)  # 设置图片居中
        self.face_name = QLineEdit()  # 设置当前图片对应的人名
        img_up_btn = QPushButton("上传图片")  # 设置上传图片的按钮
        img_det_btn = QPushButton("开始上传")  # 设置开始上传的按钮
        img_up_btn.clicked.connect(self.up_img)  # 联系到相关函数
        img_det_btn.clicked.connect(self.up_db_img)  # 连接到相关函数
        # 设置组件的样式
        img_up_btn.setFont(generally_font)
        img_det_btn.setFont(generally_font)
        img_up_btn.setStyleSheet("QPushButton{color:white}"
                                 "QPushButton:hover{background-color: rgb(2,110,180);}"
                                 "QPushButton{background-color:rgb(48,124,208)}"
                                 "QPushButton{border:2px}"
                                 "QPushButton{border-radius:5px}"
                                 "QPushButton{padding:5px 5px}"
                                 "QPushButton{margin:5px 5px}")
        img_det_btn.setStyleSheet("QPushButton{color:white}"
                                  "QPushButton:hover{background-color: rgb(2,110,180);}"
                                  "QPushButton{background-color:rgb(48,124,208)}"
                                  "QPushButton{border:2px}"
                                  "QPushButton{border-radius:5px}"
                                  "QPushButton{padding:5px 5px}"
                                  "QPushButton{margin:5px 5px}")
        # 将组件添加到布局上，然后设置主要的widget为当前的布局
        img_layout.addWidget(img_f_title)
        img_layout.addWidget(self.img_f_img)
        img_layout.addWidget(self.face_name)
        img_layout.addWidget(img_up_btn)
        img_layout.addWidget(img_det_btn)
        img_widget.setLayout(img_layout)

        '''
        *** 4. 视频识别界面 ***
        '''
        video_widget = QWidget()
        video_layout = QVBoxLayout()
        # 设置视频识别区的标题
        self.video_title2 = QLabel("视频识别区")
        self.video_title2.setFont(font_v)
        self.video_title2.setAlignment(Qt.AlignCenter)
        self.video_title2.setFont(font_v)
        # 设置显示的界面
        self.DisplayLabel = QLabel()
        self.DisplayLabel.setPixmap(QPixmap(""))
        self.btn_open_rsmtp = QPushButton("检测摄像头")
        self.btn_open_rsmtp.setFont(font_v)
        # 设置打开摄像头的按钮和样式
        self.btn_open_rsmtp.setStyleSheet("QPushButton{color:white}"
                                          "QPushButton:hover{background-color: rgb(2,110,180);}"
                                          "QPushButton{background-color:rgb(48,124,208)}"
                                          "QPushButton{border:2px}"
                                          "QPushButton{border-radius:5px}"
                                          "QPushButton{padding:5px 5px}"
                                          "QPushButton{margin:5px 5px}")
        # 设置选择文件的的按钮和样式
        self.btn_open = QPushButton("开始识别（选择文件）")
        self.btn_open.setFont(font_v)
        self.btn_open.setStyleSheet("QPushButton{color:white}"
                                    "QPushButton:hover{background-color: rgb(2,110,180);}"
                                    "QPushButton{background-color:rgb(48,124,208)}"
                                    "QPushButton{border:2px}"
                                    "QPushButton{border-radius:5px}"
                                    "QPushButton{padding:5px 5px}"
                                    "QPushButton{margin:5px 5px}")
        # 设置结束演示的按钮和样式
        self.btn_close = QPushButton("结束检测")
        self.btn_close.setFont(font_v)
        self.btn_close.setStyleSheet("QPushButton{color:white}"
                                     "QPushButton:hover{background-color: rgb(2,110,180);}"
                                     "QPushButton{background-color:rgb(48,124,208)}"
                                     "QPushButton{border:2px}"
                                     "QPushButton{border-radius:5px}"
                                     "QPushButton{padding:5px 5px}"
                                     "QPushButton{margin:5px 5px}")
        # 将组件添加到布局上
        self.btn_open_rsmtp.clicked.connect(self.open_local)
        self.btn_open.clicked.connect(self.open)
        self.btn_close.clicked.connect(self.close)
        video_layout.setAlignment(Qt.AlignCenter)
        video_layout.addWidget(self.video_title2)
        video_layout.addWidget(self.DisplayLabel)
        self.DisplayLabel.setAlignment(Qt.AlignCenter)
        video_layout.addWidget(self.btn_open_rsmtp)
        video_layout.addWidget(self.btn_open)
        video_layout.addWidget(self.btn_close)
        video_widget.setLayout(video_layout)
        '''
        *** 5. 关于界面 ***
        '''
        about_widget = QWidget()
        about_layout = QVBoxLayout()
        about_title = QLabel('欢迎使用人脸检测系统\n\n')  # todo 修改欢迎词语
        about_title.setFont(QFont('楷体', 18))
        about_title.setAlignment(Qt.AlignCenter)
        about_img = QLabel()
        about_img.setPixmap(QPixmap('UI_images/san.png'))
        about_img.setAlignment(Qt.AlignCenter)

        label_super = QLabel()  # todo 更换作者信息
        label_super.setText("<a href='https://wcowin.work/'>-->联系我</a>")
        label_super.setFont(QFont('楷体', 16))
        label_super.setOpenExternalLinks(True)
        # label_super.setOpenExternalLinks(True)
        label_super.setAlignment(Qt.AlignRight)
        about_layout.addWidget(about_title)
        about_layout.addStretch()
        about_layout.addWidget(about_img)
        about_layout.addStretch()
        about_layout.addWidget(label_super)
        about_widget.setLayout(about_layout)
        # 分别添加子页面
        self.addTab(img_widget, "上传人脸")
        self.addTab(video_widget, '视频检测')
        self.addTab(about_widget, '关于')
        self.setTabIcon(0, QIcon('UI_images/图片.png'))
        self.setTabIcon(1, QIcon('UI_images/图片.png'))
        self.setTabIcon(1, QIcon('UI_images/直播.png'))
        self.setTabIcon(2, QIcon('UI_images/logo_about.png'))

    # 第一个界面的函数
    def up_img(self):
        # 打开文件选择框
        openfile_name = QFileDialog.getOpenFileName(self, '选择文件', '', 'Image files(*.jpg , *.png)')
        # 获取上传的文件名称
        img_name = openfile_name[0]
        if img_name == '':
            pass
        else:
            # 上传之后显示并做归一化处理
            src_img = cv2.imread(img_name)
            src_img_height = src_img.shape[0]
            src_img_width = src_img.shape[1]
            target_img_height = 400
            ratio = target_img_height / src_img_height
            target_img_width = int(src_img_width * ratio)
            # 将图片统一处理到高为400的图片，方便在界面上显示
            target_img = cv2.resize(src_img, (target_img_width, target_img_height))
            cv2.imwrite("UI_images/tmp/toup.jpg", target_img)
            self.img_f_img.setPixmap(QPixmap("UI_images/tmp/toup.jpg"))
            self.up_img_name = "UI_images/tmp/toup.jpg"

    def up_db_img(self):
        face_name = self.face_name.text()
        # Convert the face name to a utf-8 encoded string
        face_name = face_name.encode('utf-8').decode('utf-8')

        if face_name == "":
            QMessageBox.information(self, "不能为空", "请填写人脸姓名")
        else:
            load_image = face_recognition.load_image_file(self.up_img_name)
            image_face_encoding = face_recognition.face_encodings(load_image)
            encoding_length = len(image_face_encoding)
            if encoding_length == 0:
                QMessageBox.information(self, "请重新上传", "当前图片没有发现人脸")
            elif encoding_length > 1:
                QMessageBox.information(self, "请重新上传", "当前图片发现多张人脸")
            else:
                face_encoding = image_face_encoding[0]
                img = cv2.imread(self.up_img_name)
                img_path = face_name + '.jpg'
                cv2.imwrite("images/db_faces/" + img_path, img)
                self.known_names.append(face_name)
                self.known_encodings.append(face_encoding)
                QMessageBox.information(self, "上传成功", "数据已上传！")

    '''
    ### 3. 视频识别相关功能 ### 
    '''

    # 关闭事件 询问用户是否退出
    def closeEvent(self, event):
        reply = QMessageBox.question(self,
                                     '退出',
                                     "是否要退出程序？",
                                     QMessageBox.Yes | QMessageBox.No,
                                     QMessageBox.No)
        if reply == QMessageBox.Yes:
            self.close()
            event.accept()
        else:
            event.ignore()

    # 读取录像文件
    def open(self):
        # 选择录像文件进行读取
        mp4_fileName, fileType = QFileDialog.getOpenFileName(self, 'Choose file', '', '*.mp4')
        if mp4_fileName:
            # 启动录像文件读取得线程并在画面上实时显示
            self.source = mp4_fileName
            self.video_capture = cv2.VideoCapture(self.source)
            th = threading.Thread(target=self.display_video)
            th.start()

    def open_local(self):
        # 选择录像文件进行读取
        mp4_filename = 0
        self.source = mp4_filename
        # 读取摄像头进行实时得显示
        self.video_capture = cv2.VideoCapture(self.source)
        th = threading.Thread(target=self.display_video)
        th.start()

    # 退出进程
    def close(self):
        # 点击关闭按钮后重新初始化界面
        self.stopEvent.set()
        self.set_down()
        
    #转换中文显示
    def nameText(self,img, text, position, textColor=(255, 0, 0), textSize=30):
        if (isinstance(img, np.ndarray)):  # 判断是否OpenCV图片类型
            img = Image.fromarray(cv2.cvtColor(img, cv2.COLOR_BGR2RGB))
        # 创建一个可以在给定图像上绘图的对象
        face_draw = ImageDraw.Draw(img)
        # 显示字体的格式
        name_font= ImageFont.truetype("simsun.ttc", textSize, encoding="utf-8")
        # 绘制人脸名称文本
        face_draw.text(position, text, textColor, font=name_font)
        # 转换回OpenCV格式
        return cv2.cvtColor(np.asarray(img), cv2.COLOR_RGB2BGR)

    # todo 执行人脸识别主进程
    def display_video(self):
        # 首先把打开按钮关闭
        self.btn_open.setEnabled(False)
        self.btn_close.setEnabled(True)
        process_this_frame = True
        while True:
            ret, frame = self.video_capture.read()  # 读取摄像头
            # opencv的图像是BGR格式的，而我们需要是的RGB格式的，因此需要进行一个转换。
            rgb_frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)  # 将图像转化为rgb颜色通道
            # gray_frame = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
            # 检查人脸 按照1.1倍放到 周围最小像素为5
            # face_zone = self.face_detect.detectMultiScale(gray_frame, scaleFactor=2, minNeighbors=2)  # maxSize = (55,55)
            if process_this_frame:
                face_locations = face_recognition.face_locations(rgb_frame)  # 获得所有人脸位置
                face_encodings = face_recognition.face_encodings(rgb_frame, face_locations)  # 获得人脸特征值
                face_names = []  # 存储出现在画面中人脸的名字
                for face_encoding in face_encodings:  # 和数据库人脸进行对比
                    # 如果当前人脸和数据库的人脸的相似度超过0.6，则认为人脸匹配
                    matches = face_recognition.compare_faces(self.known_encodings, face_encoding, tolerance=0.4)
                    if True in matches:
                        first_match_index = matches.index(True)
                        # 返回相似度最高的作为当前人脸的名称
                        name = self.known_names[first_match_index]
                    else:
                        name = "未知人脸"
                    face_names.append(name)
            process_this_frame = not process_this_frame
            # 将捕捉到的人脸显示出来
            for (top, right, bottom, left), name in zip(face_locations, face_names):
                cv2.rectangle(frame, (left, top), (right, bottom), (113,152,248), 2)  # 画人脸矩形框
                if name!='未知人脸':
                    name_list=list(name)
                    for i in range(0, len(name_list)):
                        if len(name_list)>=3 and i>0 and i<len(name_list)-1:
                            name_list[i]="*"
                        elif len(name_list)<3 and i>0 :
                            name_list[i]="*"
                    name=''.join(name_list)
                frame=self.nameText(frame, name,(left+55, bottom+15),(255, 0, 0), 30)
                
            
            # 保存图片并进行实时的显示
            frame = frame
            frame_height = frame.shape[0]
            frame_width = frame.shape[1]
            frame_scale = 500 / frame_height
            frame_resize = cv2.resize(frame, (int(frame_width * frame_scale), int(frame_height * frame_scale)))
            cv2.imwrite("images/tmp.jpg", frame_resize)
            self.DisplayLabel.setPixmap(QPixmap("images/tmp.jpg"))
            if cv2.waitKey(25) & self.stopEvent.is_set() == True:
                self.stopEvent.clear()
                self.DisplayLabel.clear()
                self.btn_close.setEnabled(False)
                self.btn_open.setEnabled(True)
                self.set_down()
                break
        self.btn_open.setEnabled(True)
        self.btn_close.setEnabled(False)
        self.set_down()

    # 初始化视频检测界面
    def set_down(self):
        self.video_capture.release()
        cv2.destroyAllWindows()
        self.DisplayLabel.setPixmap(QPixmap("UI_images/ae862.jpg"))



if __name__ == "__main__":
    # 加载页面
    app = QApplication(sys.argv)
    mainWindow = MainWindow()
    mainWindow.show()
    sys.exit(app.exec_())
```


## 参考文献
[1] 龙慧,朱孟春,邓娅倩等.基于 OpenCV 的智能校园人脸门禁系统的设计与实现[J].工业控制 计算机,2023,36(09):73-75.  
[2] 冯婧,顾梅花.基于 OpenCV 的人脸识别算法研究与实现[J].电脑知识与技 术,2020,16(14):3-5.DOI:10.14004/j.cnki.ckt.2020.1473  
[3] 廖周宇,王钰婷,陈科良.基于 OpenCV 的人脸识别算法[J].电子技术与软件工 程,2020,(09):133-136.  
[4] 李颖聪,陈贝文,廖晓芳等.基于 OpenCV 的人脸识别系统设计与实现[J].电脑知识与技 术,2022,18(18):53-55.DOI:10.14004/j.cnki.ckt.2022.1155  
[5] 张绿云,韦肖雨,李琳.基于Python与OpenCV的人脸识别系统设计与实现[J].电脑知识与技 术,2022,18(10):87-88.DOI:10.14004/j.cnki.ckt.2022.0783  
[6] 黄安祺, & 陈争奇. (2017). 基于 OpenCV 的人脸识别技术研究. 电子技术与软件工程, 16(13), 36-37.  
[7] 郑亚军, & 王丽娟. (2019). 基于 OpenCV 的人脸识别技术研究与实现. 电子技术与软件工 程, 18(5), 46-48.  
[8] 王志敏, & 刘杰. (2019). 基于 OpenCV 的人脸识别算法研究与实现. 现代计算机, (11), 26-28.  
[9] 张海波, & 王振华. (2019). 基于 OpenCV 的人脸识别算法研究与实现. 计算机与数字工程, (6), 169-170.  
[10] 赵宇航, & 张晓艳. (2018). 基于 OpenCV 的人脸识别算法研究与实现. 现代计算机, (12), 16-18.  