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

def getScore(word1, word2): #GET SIMILARITY SCORE OF TWO WORDS
    syn1 = wordnet.synsets(word1)[0]
    syn2 = wordnet.synsets(word2)[0]
    score = syn1.wup_similarity(syn2)
    return score

def capitalize(entry):      #FORMAT A SENTENCE OF WORD
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

def capitalizeList( myList ):   #FORMAT A LIST
    result = []
    for dict in myList:
        dict["text"] = capitalize(dict["text"] )
        result.append(dict)
    return result

def capitalizeAll():            #FORMAT EVERY ENTRY IN THE DATABASE
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

def gatherKeywords():       #INSERT EVERY KEYWORD TO THE KEYWORDPOOL
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

def synonymPopulator(word):     #GENERATE SYNONYMS FOR AN INPUTTED WORD
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
    syn1 = wordnet.synsets(originalWord)[0]
    maxScore = -1
    maxIndex = -1
    size = len(list)

    for i in range(size):
        if(list[i] != originalWord):
            word = list[i]
            syn2 = wordnet.synsets(word)[0]

            if(syn1.wup_similarity(syn2)):  #SOME WORDS DON'T HAVE A SIMILARITY SCORE
                score = syn1.wup_similarity(syn2)
                if(score > maxScore):       #IF THEY HAVE A BETTER SCORE
                    maxScore = score
                    maxIndex = i
    if(maxScore > 0.5):
        return list[maxIndex]
    else:
        return originalWord

#getGoodSynonym("job")
