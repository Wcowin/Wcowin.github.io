---
tags:
  - python
---
:simple-python:
pip命令只能用在命令行中；但是不能用在python命令行中。

一个查找命令的简易方式：直接在命令行中输入pip，就可以得到一个pip主要命令表单

## 安装pip
=== "Windows"

    ``` 
    py -m pip --version
    ```

=== "Linux"

    ``` 
    pip install packagemane
    ```
检查是否安装了pip，否则你无法使用pip命令。  
### 1.Windows 环境下
使用```py -m pip --version```检查是否安装pip。  
使用命令行获得一个python文件：```curl https://bootstrap.pypa.io/get-pip.py -o get-pip.py```  
然后，在命令行中使用cd命令导航到此 .py 文件所在的文件夹，使用：```py get-pip.py```即可安全安装。（附：[pip官方网站](https://pip.pypa.io/en/stable/#)）  

### 2.Linux环境下
使用```python -m pip --version```检查是否安装pip。  
1.默认安装
```pip install packagemane```  
2.安装指定版本
```pip install --version packagename```   
2.从网址安装指定文件
```pip install http://my.package.repo/SomePackage-1.0.4.zip```   

## 换源安装

pip默认是从 PyPI
### 1.从指定源安装
```pip install --index-url http://my.package.repo/simple/ packagename```  
### 2.安装时搜索额外的源
```pip install --extra-index-url http://my.package.repo/simple packagename```  

### 3 查询类库/包的信息

1.查询主要信息：```pip show packagename```  
2.查询包的所有信息：```pip show --verbose packagename```  

## 查询安装的类库/包

### 1.查询所有安装的包
```pip list```  
### 2.查询版本过时的安装包
```pip list --o```  
### 3.查询指定路径下的安装包
```pip list --path ```指定路径(必须指定到直接存放包的文件)
### 4.更新指定包的依赖包

```
pip install pip-review  # 安装 pip-review
 
pip-review  # 查看可更新的包
 
pip-review --auto  # 自动更新所有包
 
pip-review --local --interactive  # 更新包，提供操作可选项：[Y]es, [N]o, [A]ll, [Q]uit
```

