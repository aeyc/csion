#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created on Sat May 16 00:55:34 2020

@author: Ayca
"""

import pandas as pd
import copy
df = pd.read_csv("emotion-data.csv")

from sklearn.model_selection import train_test_split
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn import svm
#from sklearn.linear_model import LogisticRegression
df_l = copy.copy(df)
df_l = df_l.drop('word',axis = 1)
df_cols = df_l.columns
df_l['MaxSc'] = df_l.max(axis = 1)

#for i in range(0,len(df_l)):
for i in range(0,5):
    for j in df_cols:
        if int(df[j].iloc[i]) == int(df_l.MaxSc.iloc[i]):
            df.iloc[i]['label'] = j
            print(j)

