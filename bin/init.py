import time

import numpy as np
from sklearn.cluster import KMeans
import pandas as pd
import matplotlib.pyplot as plt
import math

def rad(d):
    return d * math.pi / 180.0

def dis(pointa, pointb):
    radLat1 = rad(pointa[1])
    radLat2 = rad(pointb[1])
    a = radLat1 - radLat2
    b = rad(pointa[0]) - rad(pointb[0])
    s = 2 * math.asin(math.sqrt(math.pow(math.sin(a / 2), 2) +
                math.cos(radLat1) * math.cos(radLat2) * math.pow(math.sin(b / 2), 2)))
    s = s * 6378137
    return s

Cluster = []
def Merge_algorithm():
    dict = {}
    dict2 = {}
    sample_n = 0
    for i in range(1, len(data)):
        if data[i][4] == 0:
            continue
        sample_n += 1
        if dict.get((round(data[i][5], 3), round(data[i][6], 3))):
            dict[(round(data[i][5], 3), round(data[i][6], 3))][0] += data[i][4]
            dict[(round(data[i][5], 3), round(data[i][6], 3))][1] += data[i][4] * data[i][5]
            dict[(round(data[i][5], 3), round(data[i][6], 3))][2] += data[i][4] * data[i][6]
        else:
            dict[(round(data[i][5], 3), round(data[i][6], 3))] = [data[i][4],  data[i][4] * data[i][5], data[i][4] * data[i][6]]

        if dict.get((round(data[i][7], 3), round(data[i][8], 3))):
            dict[(round(data[i][7], 3), round(data[i][8], 3))][0] += data[i][4]
            dict[(round(data[i][7], 3), round(data[i][8], 3))][1] += data[i][4] * data[i][7]
            dict[(round(data[i][7], 3), round(data[i][8], 3))][2] += data[i][4] * data[i][8]
        else:
            dict[(round(data[i][7], 3), round(data[i][8], 3))] = [data[i][4],  data[i][4] * data[i][7], data[i][4] * data[i][8]]


    lst = list(dict.items())
    print(sorted(lst, key=lambda x:x[1]))

    Num_Cluster = 0
    while len(lst):
        Num_Cluster += 1
        Num_people = lst[0][1][0]
        long = lst[0][1][1]
        lat = lst[0][1][2]
        dict2[lst[0][0]] = Num_Cluster - 1
        del(lst[0])
        j = 0
        while j < len(lst):
            if dis((long / Num_people, lat / Num_people), (lst[j][1][1] / lst[j][1][0], lst[j][1][2] / lst[j][1][0])) > 1000:
                j += 1
                continue
            long += lst[j][1][1]
            lat += lst[j][1][2]
            Num_people += lst[j][1][0]
            dict2[lst[j][0]] = Num_Cluster - 1
            del(lst[j])
        Cluster.append([long / Num_people, lat / Num_people])
    return (dict2, sample_n)




data = pd.read_csv('NYC_taxi//train.csv', header=None, encoding='GBK')
input_file = open(r'input', 'w')
data = np.array(data)
for i in range(1, len(data)):
    data[i][5] = float(data[i][5])
    data[i][6] = float(data[i][6])
    data[i][7] = float(data[i][7])
    data[i][8] = float(data[i][8])
    data[i][4] = int(data[i][4])

(dict, sample_n) = Merge_algorithm()
input_file = open(r'input', 'w')

input_file.write( str(len(Cluster)) + '\n')
for i in range(0, len(Cluster)):
    input_file.write(str(Cluster[i][0]) + ' '+ str(Cluster[i][1]) + '\n')

input_file.write(str(sample_n) + '\n')
for i in range(1, len(data)):
    if data[i][4] == 0:
        continue
    for j in range(0, 11):
        if j < 5 or j >= 9:
            input_file.write(str(data[i][j]) + ' ')
        if j == 5:
            input_file.write( str(dict[(round(data[i][5], 3), round(data[i][6], 3))]) + ' ')
        if j == 7:
            input_file.write(str(dict[(round(data[i][7], 3), round(data[i][8], 3))]) + ' ')
    input_file.write('\n')