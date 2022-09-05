import json
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


PRE_PATH = '/Users/mac/Documents/2021_my_media/project/algorithm-leetcode/project/python/2022_to_be_funny/poem/json/poet.song.'

poem_list_5 = []
poem_list_7 = []

for i in range(255):
# for i in range(1):
    print(i)
    with open(PRE_PATH + str(i * 1000) + '.json', 'r', encoding='utf8') as fp:
        poem_list = json.load(fp)
        poem_list_length = len(poem_list)
        for j in range(poem_list_length):
            author = poem_list[j]['author']
            title = poem_list[j]['title']
            paragraphs = poem_list[j]['paragraphs']

            for paragraphs_item in paragraphs:
                paragraphs_item = paragraphs_item.replace('。', '，').replace('！', '，').replace('？', '，').replace('；', '，')
                paragraphs_list = paragraphs_item[:-1].split('，')
                
                
                paragraphs_list_length = len(paragraphs_list)
                for k in range(paragraphs_list_length):
                    sentence = paragraphs_list[k]
                    if len(sentence) == 5:
                        poem_list_5.append(
                            {
                                "one": sentence[0],
                                "two": sentence[1],
                                "three": sentence[2],
                                "four": sentence[3],
                                "five": sentence[4],
                                "author": author,
                                "title": title
                            }
                        )
                    elif len(sentence) == 7:
                        poem_list_7.append(
                            {
                                "one": sentence[0],
                                "two": sentence[1],
                                "three": sentence[2],
                                "four": sentence[3],
                                "five": sentence[4],
                                "six": sentence[5],
                                "seven": sentence[6],
                                "author": author,
                                "title": title
                            }
                        )
            # break

# print(poem_list_5)
# print(poem_list_7)


savedFileName = 'song'
filePath = "/Users/mac/Documents/2021_my_media/project/algorithm-leetcode/project/python/2022_to_be_funny/poem/csv/t_text_poem_5/" + savedFileName + ".csv"

# 边界：若 文件不存在，则 进行创建
if not os.path.exists(filePath):
    os.system(r"touch {}".format(filePath))

# 表头写入
f = open(filePath, 'r+')
myDict = {
    "one": "one",
    "two": "two",
    "three": "three",
    "four": "four",
    "five": "five",
    # "six": "six",
    # "seven": "seven",
    "author": "author",
    "title": "title"
}
w = csv.DictWriter(f, myDict.keys())
w.writerow(myDict)
f.close()


# 列的写入（追加模式）
# 获取文件行数，避免内存爆掉（参考： https://blog.csdn.net/qq_42902673/article/details/105918766 ）
row_count = get_file_row_count(filePath)
f = open(filePath, 'a+')
w = csv.DictWriter(f, myDict.keys())

# 录入
try:
    for item in poem_list_5:
        myDict = {
            "one": item["one"],
            "two": item["two"],
            "three": item["three"],
            "four": item["four"],
            "five": item["five"],
            # "six": item["six"],
            # "seven": item["seven"],
            "author": item["author"],
            "title": item["title"],
        }
        w.writerow(myDict)
except:
    pass

f.close()


