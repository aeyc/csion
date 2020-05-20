# -*- coding: utf-8 -*-
"""

@author: MehmetSanisoglu
"""
from pymongo import MongoClient
import json

cluster = MongoClient("mongodb+srv://mehmetsan:Northern61@clustermehmet-aio9p.mongodb.net/test?retryWrites=true&w=majority")
db = cluster["Personality"]
collection = db["RelationshipProblems"]


question = {
    "_id"           :       "",
    "question"      :       "",
    "score"         :       0,
    "questionId"   :       "",
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

campaing = {
    ownerId     :   "",
    problem     :   "",
    questionIds :   [],
    answers     :   [],
    result      :   ""
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

readFile = open('subcategories.txt','r')

collection = db["RelationshipProblems"]
for each in readFile.readlines():
    test = json.loads(each)
    collection.insert_one(test)

readFile.close()

'''
def iterate():
    collection = db["subCategories"]
    results = collection.find({})

    collection2 = db["EducationProblems"]

    for each in results:
        temp = each


        #temp["subcategory"] = each["subCategory"]
        print(each["subCategory"])
        #del temp['subCategory']
        collection2.insert_one(temp)
    return


def iterateQuestions():
    collection = db["RelationshipQuestions"]
    results = collection.find({})

    for each in results:
        temp = each
        collection.delete_one(each)


        temp["question"] = temp["question"].strip()
        collection.insert_one(temp)


def iterateProblems():
    collection = db["RelationshipProblems"]
    results = collection.find({})
    for each in results:
        temp = each
        collection.delete_one(each)
        del temp["_id"]
        collection.insert_one(temp)






iterate()
