#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created on Wed Mar 18 21:53:18 2020

@author: Ayca
"""

from pymongo import MongoClient
import pandas as pd
import json

df = pd.read_csv("C_Types.csv",sep=';',dtype=str)

for i in range(0,len(df)):
    for j in df.columns:
        if j != "type" and j != "name":
            (df.iloc[i])[j] = (df.iloc[i])[j].split(",")
try: 
    cluster = MongoClient("mongodb+srv://mehmetsan:Northern61@clustermehmet-aio9p.mongodb.net/test?retryWrites=true&w=majority")
    print("Connected") 
    db = cluster["Personality"]
    collection = db["personalities"]
    records = json.loads(df.T.to_json()).values()
    collection.insert(records)
except:   
    print("Could not connect to MongoDB")

