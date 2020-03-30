# -*- coding: utf-8 -*-
"""
Created on Sun Mar 29 21:29:42 2020

@author: MehmetSanisoglu
"""
from pymongo import MongoClient
import nltk
from nltk.corpus import wordnet
from nltk import word_tokenize

cluster = MongoClient("mongodb+srv://mehmetsan:Northern61@clustermehmet-aio9p.mongodb.net/test?retryWrites=true&w=majority")
db = cluster["Personality"]
collection = db["personalities"]
keywordsPool = db["keywordsPool"]

def capitalize(entry):
    capitalized = ""
    cap = True
    for i in range(len(entry)):
        if(cap):
            capitalized += entry[i].upper()
            cap = False
        else:
            if(entry[i] == " "):
                cap = True
            capitalized += entry[i].lower()
    return capitalized

def capitalizeList( myList ):
    result = []
    for dict in myList:
        dict["text"] = capitalize(dict["text"] )
        result.append(dict)
    return result

def capitalizeAll():
    posts = collection.find({})
    for post in posts:
        tempPost = {"_id": typeId, "tends": tends, "strengths": strengths, "weaknesses": weaknesses, "growths": growths, "motivations": motivations, "Stresses": Stresses,
                 "positiveCareer": positiveCareer, "negativeCareer": negativeCareer, "jobs": jobs, "positiveFriendship": positiveFriendship, "negativeFriendship": negativeFriendship,
                 "positiveRelationship": positiveRelationship,"negativeRelationship": negativeRelationship, "keywords": keywords, "type": typeCategory, "name": typeName, "__v":0
                 }
        tempPost["_id"] = post["_id"]
        tempPost["type"] = post["type"]
        tempPost["name"] = post["name"]
        sorry = ""
        for key in post:
            if(key != "_id" and key != "__v" and key != "name" and key != "type"):
                line = post[key]
                entries = []
                for each in line:
                    entries.append(capitalize(each))
                tempPost[key] = entries
        collection.delete_one(post)
        collection.insert_one(tempPost)
    return

def gatherKeywords():
    pool = []
    posts = collection.find({})
    for post in posts:
        keywords = post["keywords"]
        for word in keywords:
            entry = capitalize(word)
            if( entry not in pool):
                if(entry != ""):
                    pool.append(capitalize(word))
    post = {"_id": "keywords", "words": pool }
    keywordsPool.insert_one(post)

    return


def synonymPopulator(word):
    synonyms = []
    for syn in wordnet.synsets(word):
        for l in syn.lemmas():
            if("_" not in l.name()):
                if(l.name() not in synonyms):
                    synonyms.append(capitalize(l.name()))
    return synonyms


def getGoodSynonym( originalWord ):

    if(" " in originalWord):    #IF MORE THAN ONE WORD ENTERED
        return
    list = synonymPopulator(originalWord)
    print(list)
    print(originalWord)
    syn1 = wordnet.synsets(originalWord)[0]
    maxScore = -1
    maxIndex = -1
    size = len(list)

    for i in range(size):
        if(list[i] != originalWord):
            word = list[i]
            syn2 = wordnet.synsets(word)[0]
            if(syn1.wup_similarity(syn2)):
                score = syn1.wup_similarity(syn2)
                if(score > maxScore):
                    maxScore = score
                    maxIndex = i

    return list[maxIndex]

#getGoodSynonym("job")
