import csv
import os

# 数据源
import source.杜蕾斯 as source

keyword = "杜蕾斯"
# 共有的 id、tag、value、copyCount、author 值或前缀
id = "R"
tag = keyword
value = keyword + "/"

copyCount = 0
author = "网络"

# 文件名字
savedFileName = keyword
filePath = "/Users/mac/Documents/2021_my_media/project/algorithm-leetcode/project/python/2022_to_be_funny/csv/text/t_text_" + savedFileName + ".csv"

# 边界：若 文件不存在，则 进行创建
if not os.path.exists(filePath):
    os.system(r"touch {}".format(filePath))

# 表头写入
f = open(filePath, 'w')
myDict = {
    "id": "id",
    "tag": "tag",
    "value": "value",
    "copyCount": "copyCount",
    "author": "author"
}
w = csv.DictWriter(f, myDict.keys())
w.writerow(myDict)

rows = []
for index, content in enumerate(source.data):
    # 第一个换行符（\n）替换成 ： ，剩下的 \n 、 ' ' 替换成空字符串。
    content = content.replace("\n", "：", 1).replace("\n", "").replace(' ', '')
    myDict = {
        "id": id + str(index + 1),
        "tag": tag,
        "value": value + content,
        "copyCount": 0,
        "author": author
    }
    w.writerow(myDict)
f.close()
