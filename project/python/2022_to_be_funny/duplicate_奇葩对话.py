import csv
import os
from time import sleep, time
import requests

def get_file_row_count(filePath):
    cnt = 0
    with open(filePath, mode = 'rb') as f:
        for line in f:
            cnt += 1
    return cnt

# 数据源
import source.网易云 as source
keyword = "奇葩对话"
# 共有的 id、tag、value、copyCount、author 值或前缀
id = "J"
tag = keyword
value = keyword + "/"

copyCount = 0
author = "网络"
# 从网络爬的条目数
crawlCount = 5000
# 多少次，休息1秒
sleepOneSecondCount = 50

# print(os.path.dirname())
# 文件名字
savedFileName = keyword
filePath = "/Users/mac/Documents/2021_my_media/project/algorithm-leetcode/project/python/2022_to_be_funny/csv/t_text_" + savedFileName + ".csv"

myData = source.data
l = len(myData)

# 边界：若 文件不存在，则 进行创建
if not os.path.exists(filePath):
    os.system(r"touch {}".format(filePath))

# 表头写入
f = open(filePath, 'r+')
myDict = {
    "id": "id",
    "tag": "tag",
    "value": "value",
    "copyCount": "copyCount",
    "author": "author"
}
w = csv.DictWriter(f, myDict.keys())
w.writerow(myDict)
f.close()


# 列的写入（追加模式）
# 获取文件行数，避免内存爆掉（参考： https://blog.csdn.net/qq_42902673/article/details/105918766 ）
row_count = get_file_row_count(filePath)
# print(row_count)
f = open(filePath, 'a+')
w = csv.DictWriter(f, myDict.keys())

# 从网络获取
try:
    for count in range(crawlCount):
        headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/535.1 \
            (KHTML, like Gecko) Chrome/14.0.835.163 Safari/535.1'}
        
        url = 'https://api.oddfar.com/yl/q.php?c=1005&encode=json'
        res = requests.get(url, headers)

        statusCode = res.status_code
        content = res.json()

        if statusCode == 200 and content['code'] == '200' and content['text'] :
            print(content)
            myDict = {
                "id": id + str(row_count),
                "tag": tag,
                "value": value + content['text'],
                "copyCount": 0,
                "author": author
            }
            w.writerow(myDict)
            row_count += 1

        if (count % sleepOneSecondCount):
            sleep(1)
except:
    pass

f.close()
