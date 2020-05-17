# -*- coding: utf-8 -*-
"""

@author: MehmetSanisoglu
"""
from pymongo import MongoClient
import json

cluster = MongoClient("mongodb+srv://mehmetsan:Northern61@clustermehmet-aio9p.mongodb.net/test?retryWrites=true&w=majority")
db = cluster["Personality"]
collection = db["RelationshipQuestions"]


question = {
    "_id"           :       "",
    "question"      :       "",
    "score"         :       0,
    "questiongId"   :       "",
}

problem = {
    'category'          :   "Relationship",
    'subcategory'       :   "Social",
    'problem'           :   "",
    'personalQuestions' :   [],
    "encourage"     :       [],
    "discourage"    :       [],
    "desireLevel"   :       0
}

def addQuestion( q, id ):

    question['question']    =   q
    question["_id"]         =   id
    question["questiongId"] =   id


    collection.insert_one(question)


def addProblem():
    #question['category']    = input("Category: ")
    #question['subcategory'] = input("Subcategory: ")
    problem['problem']    = input("Problem: ")
    encourage   = []
    discourage  = []

    count = 0
    while( True ):
        entry   = input("Encourage " + str(count))
        if(entry == '0'):
            count = 0
            break
        encourage.append(entry)
        count += 1
    problem['encourage'] = encourage
    while( True ):
        entry   = input("Discourage " + str(count))
        if(entry == '0'):
            break
        discourage.append(entry)
        count += 1
    problem['discourage']  = discourage

    collection.insert_one(problem)
    return
'''
f = open('questions.txt')

count = 0
for each in f.readlines():
    count += 1
    addQuestion(each , count )
'''
readFile = open('subcategories.txt','r')

collection = db["RelationshipProblems"]
for each in readFile.readlines():
    test = json.loads(each)
    collection.insert_one(test)

readFile.close()
