import numpy as np
import pandas as pa
import sys

def check(time, BeginTime, EndTime):
    time = time.split(':')
    time = int(time[0]) * 60 + int(time[1])
    BeginTime = int(BeginTime) * 60
    EndTime = int(EndTime) * 60
    if time >= BeginTime and time < EndTime:
        return True
    return False

def AddEdge(BeginTime, EndTime):
    for i in range(0, len(data)):
        if not check(data[i][3], BeginTime, EndTime):
            continue
        Edge[int(data[i][7])][int(data[i][8])] += int(data[i][6])

def init():
    Cluster_Num = int(file.readline())
    for i in range(0, Cluster_Num):
        Cluster.append([float(x) for x in file.readline().split(' ')])
    Sample_Num = int(file.readline())
    for i in range(0, Sample_Num):
        s = file.readline()
        data.append([x for x in s.split(' ')])
    return (Cluster_Num, Sample_Num)

file = open('data/'+str(sys.argv[1])+'.temp', 'r')
data = []
Cluster = []
(Cluster_Num, Sample_Num) = init()
file.close()
print(data[0])
print(Cluster[0])

file = open('data/'+str(sys.argv[1])+'.out', 'w')
Edge = list([[0 for i in range(Cluster_Num)] for j in range(Cluster_Num)])

AddEdge(str(sys.argv[2]), str(sys.argv[3]))

file.write(str(Cluster_Num) + '\n')
for i in range(0, Cluster_Num):
    file.write(str(Cluster[i][0]) + ' ' + str(Cluster[i][1]) + '\n')
for i in range(0, Cluster_Num):
    for j in range(0, Cluster_Num):
        file.write(str(Edge[i][j]) + ' ')
    file.write('\n')

