import time

import numpy as np
from sklearn.cluster import KMeans
import pandas as pd
import matplotlib.pyplot as plt

NodeNum = 50
current = time.time()
data = pd.read_csv('../data/d292afaf67ada8e88bf7cb2b49896ec5.csv', header=None, encoding='GBK')
data = np.array(data)
print('time ', time.time() - current)
current = time.time()
X = list()
N = 100000
for i in range(1, N):
    X.append([data[i][5], data[i][6]])
    X.append([data[i][7], data[i][8]])

X = np.array(X)
print('time ', time.time() - current)
current = time.time()
kmeans = KMeans(n_clusters=NodeNum, random_state=0).fit(X)

print('time ', time.time() - current)
current = time.time()

Point = kmeans.cluster_centers_
Start = list([0])
End = list([0])
for i in range(1, N):
    Start.append(kmeans.labels_[i * 2 - 2])
    End.append(kmeans.labels_[i * 2 - 1])

'''
input_file = open(r'input', 'w')
input_file.write(str(NodeNum) + '\n')

input_file.write()
for i in range(0, NodeNum):
    input_file.write(str(Point[i][0]) + ' ' + str(Point[i][1]) + '\n')

for i in range(1, N):
    input_file.write(str(kmeans.labels_[i * 2 - 2]) + ' ' + s)
    End.append(kmeans.labels_[i * 2 - 1])
    
for i in range(0, len(Start)):
    input_file.write(str(Start[i]) + ' ' + str(End[i]) + '\n')
'''