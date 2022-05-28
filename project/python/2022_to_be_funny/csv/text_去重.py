
import csv
import os

# 表头
header=['id','tag','value','copyCount','author']
# 写入的总文件路径
cleanFilePath = '/Users/mac/Documents/2021_my_media/project/algorithm-leetcode/project/python/2022_to_be_funny/csv/text/clean/clean.csv'
with open(cleanFilePath, 'w', newline='')as cleanFile:
    # 打开写入的总文件
    cleanFileWriter =csv.writer(cleanFile)
    cleanFileWriter.writerow(header)

    # 遍历读取要去重的文件
    path = "/Users/mac/Documents/2021_my_media/project/algorithm-leetcode/project/python/2022_to_be_funny/csv/text"          
    for root,dirs,files in os.walk(path):
        for file in files:
            rawFilePath = os.path.join(root, file)
            # 过滤自身（写入的总文件）
            if cleanFilePath == rawFilePath:
                continue
            
            print(rawFilePath)
            with open(rawFilePath, 'r') as rawFile:
                # 读取原始的单个文件 并 去重
                myDict = {}
                rows = []
                rawFileReader = csv.reader(rawFile)

                for line in rawFileReader:
                    # 过滤表头
                    if line[2] == "value":
                        continue
                    key = line[2]
                    # 之前没出现过
                    if myDict.get(key) != 1:
                        myDict[key] = 1
                        rows.append(line)
                
                # 写入总文件
                cleanFileWriter.writerows(rows)
            