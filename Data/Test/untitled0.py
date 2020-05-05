#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created on Tue Apr 28 21:29:19 2020

@author: Ayca
"""
try: 
    cluster = MongoClient("mongodb+srv://mehmetsan:Northern61@clustermehmet-aio9p.mongodb.net/test?retryWrites=true&w=majority")
    print("Connected") 
    db = cluster["Personality"]
    collection = db["question_test_ayca"]
    records = json.loads(df.T.to_json()).values()
    collection.insert(records)
except:   
    print("Could not connect to MongoDB")

