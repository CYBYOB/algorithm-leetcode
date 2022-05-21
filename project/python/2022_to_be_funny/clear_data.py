# 去重后的数据 --> 生成对应的文件（直接用 wps 软件里的）

import csv
import os
def get_file_row_count(filePath):
    cnt = 0
    with open(filePath, mode = 'rb') as f:
        for line in f:
            cnt += 1
    return cnt

# 数据源
import source.网易云 as source
# 共有的 id、tag、value、copyCount、author 值或前缀
id = "A"
tag = "网易云"
value = "网易云/"
copyCount = 0
author = "网络"

# print(os.path.dirname())
# 文件名字
savedFileName = "网易云"
filePath = "/Users/mac/Documents/2021_my_media/project/algorithm-leetcode/project/python/2022_to_be_funny/csv/t_text_" + savedFileName + ".csv"

myData = source.data
l = len(myData)

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
print(row_count)
f = open(filePath, 'a+')
w = csv.DictWriter(f, myDict.keys())
for i in range(l):
    myDict = {
        "id": id + str(row_count + i + 1),
        "tag": tag,
        "value": value + myData[i],
        "copyCount": 0,
        "author": author
    }
    w.writerow(myDict)

f.close()
