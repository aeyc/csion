

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
df = pd.read_csv("Career.csv",sep=';',dtype=str)

df['score'] = pd.to_numeric(df['score'], downcast='integer')
df['questionId'] = pd.to_numeric(df['questionId'], downcast='integer')
try: 
    cluster = MongoClient("mongodb+srv://mehmetsan:Northern61@clustermehmet-aio9p.mongodb.net/test?retryWrites=true&w=majority")
    print("Connected") 
    db = cluster["Personality"]
    collection = db["CareerQuestions"]
    records = json.loads(df.T.to_json()).values()
    collection.insert(records)
except:   
    print("Could not connect to MongoDB")

