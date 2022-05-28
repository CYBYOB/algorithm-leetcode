
import csv
import os

# id开头的字母
idStrPrefixList = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L',
'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z',
'AA', 'AB', 'AC', 'AD', 'AE', 'AF', 'AG', 'AH', 'AI', 'AJ', 'AK', 'AL','AM',
'AN','AO', 'AP', 'AQ', 'AR', 'AS', 'AT', 'AU', 'AV', 'AW', 'AX', 'AY', 'AZ',
'AAA', 'AAB', 'AAC', 'AAD', 'AAE', 'AAF', 'AAG', 'AAH', 'AAI', 'AAJ', 'AAK','AAL', 'AAM',
'AAN', 'AAO', 'AAP', 'AAQ', 'AAR', 'AAS', 'AAT', 'AAU', 'AAV', 'AAW', 'AAX', 'AAY', 'AAZ',
'AAAA', 'AAAB', 'AAAC', 'AAAD', 'AAAE', 'AAAF', 'AAAG', 'AAAH', 'AAAI', 'AAAJ', 'AAAK', 'AAAL', 'AAAM',
'AAAN','AAAO', 'AAAP', 'AAAQ', 'AAAR', 'AAAS', 'AAAT', 'AAAU', 'AAAV', 'AAAW', 'AAAX', 'AAAY', 'AAAZ']
# 表头
header=['id','tag','value', 'viewCount', 'downloadCount', 'shareCount','author']
# 写入的总文件路径
cleanFilePath = '/Users/mac/Documents/2021_my_media/project/algorithm-leetcode/project/python/2022_to_be_funny/csv/img/clean/clean.csv'
with open(cleanFilePath, 'w', newline='')as cleanFile:
    # 打开写入的总文件
    cleanFileWriter =csv.writer(cleanFile)
    cleanFileWriter.writerow(header)

    # 遍历读取要去重的文件
    path = "/Users/mac/Documents/2021_my_media/project/algorithm-leetcode/project/python/2022_to_be_funny/csv/图片集 - 汇总"          
    idStrPrefixIndex = 0
    for root, dirs, files in os.walk(path):
        for dir in dirs:
            # 边界：有2个空目录，应该是 ./ 和 ../ ？
            if len(dir) != 0:
                curDir = os.path.join(root, dir)
                # print(curDir)

                for _, _, _files in os.walk(curDir):
                    idStrPrefix = idStrPrefixList[idStrPrefixIndex]
                    indexCount = 0
                    rows = []

                    for fileName in _files:
                        rawFilePath = os.path.join(curDir, fileName)

                        id = idStrPrefix + str(indexCount)
                        tag = dir
                        value = dir + '/' + fileName
                        viewCount = 0
                        downloadCount = 0
                        shareCount = 0
                        author = '网络'

                        row = [id, tag, value, viewCount, downloadCount, shareCount, author]
                        rows.append(row)

                        indexCount += 1
                    # 写入总文件
                    cleanFileWriter.writerows(rows)
                
                idStrPrefixIndex += 1
