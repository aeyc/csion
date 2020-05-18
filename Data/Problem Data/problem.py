

#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created on Wed Mar 18 21:53:18 2020

@author: Ayca
"""

from pymongo import MongoClient
import pandas as pd
import json
import numpy
#pd.options.mode.chained_assignment = None 
df = pd.read_csv("Problem.csv",sep=';',dtype=str)
df['desireLevel'] = pd.to_numeric(df['desireLevel'], downcast='integer')
df['encourage'] = df['encourage'].apply(lambda x: x.split(','))
df['discourage'] = df['discourage'].apply(lambda x: x.split(','))

try: 
    cluster = MongoClient("mongodb+srv://mehmetsan:Northern61@clustermehmet-aio9p.mongodb.net/test?retryWrites=true&w=majority")
    print("Connected") 
    db = cluster["Personality"]
    collection = db["CareerProblems"]
    records = json.loads(df.T.to_json()).values()
    collection.insert(records)
except:   
    print("Could not connect to MongoDB")

