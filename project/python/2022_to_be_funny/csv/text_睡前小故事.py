import csv
import docx
import os
import re
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
import requests
from lxml import etree
from docx import Document


# 配置
file_name = '睡前小故事'
tag = '睡前小故事'
copyCount = 0
author = '网络'

# 表头
header=['tag','value','copyCount','author']
# 写入的总文件路径
writeFilePath = '/Users/mac/Documents/2021_my_media/project/algorithm-leetcode/project/python/2022_to_be_funny/csv/text/t_text_' + file_name + '.csv'
with open(writeFilePath, 'a+', newline='')as cleanFile:
    # 读取 txt
    path = '/Users/mac/Documents/2021_my_media/project/algorithm-leetcode/project/python/2022_to_be_funny/csv/text/doc/' + file_name + '.txt'
    lines = []
    with open(path, 'r', encoding='utf-8') as f:
        lines = f.readlines()

    value = ''
    value_list = []
    for line in lines:
        title_list = re.findall(r"\d\.(.*?)\n", line)
        if len(title_list) == 1:
            value_list.append(value)
            value = "《" + title_list[0] + "》\n"
        else:
            value += line

    # 添加最后1个 + 去除第一个
    value_list.append(value)
    value_list = value_list[1:]

    # 遍历 value_list，录入 csv
    myDict = {
        "tag": "tag",
        "value": "value",
        "copyCount": "copyCount",
        "author": "author"
    }
    w = csv.DictWriter(cleanFile, myDict.keys())
    # 表头
    w.writerow(myDict)
    for value in value_list:
        row = {
            "tag": tag,
            "value": tag + "/" + value,
            "copyCount": copyCount,
            "author": author
        }
        # print('row', row)
        w.writerow(row)
            