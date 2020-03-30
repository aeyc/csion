# -*- coding: utf-8 -*-
"""
Created on Sun Mar 15 17:14:38 2020

@author: MehmetSanisoglu
"""
from pymongo import MongoClient
import globalMethods as gm


cluster = MongoClient("mongodb+srv://mehmetsan:Northern61@clustermehmet-aio9p.mongodb.net/test?retryWrites=true&w=majority")
db = cluster["Personality"]
collection = db["personalities"]

#INITIALIZATION
typeId = typeId = typeName = ""
tends=strengths=weaknesses=growths=motivations=Stresses=Stresses=positiveCareer=negativeCareer=jobs=positiveFriendship=negativeFriendship = []
positiveRelationship = negativeRelationship = keywords = []

def resetPost():
    typeId = typeId = typeName = ""
    tends=strengths=weaknesses=growths=motivations=Stresses=Stresses=positiveCareer=negativeCareer=jobs=positiveFriendship=negativeFriendship = []
    positiveRelationship = negativeRelationship = keywords = []

def enterAttribute(attributeName, name):
    check = True
    while(check != "0"):
        prompt = "Enter "+name+" (Press 0 for exit): "
        check = input(prompt)
        if(check != "0" and check != ""):
            capitalized = gm.capitalize(check)

            if(capitalized not in attributeName):
                attributeName.append(capitalized)
    return

menuCheck = True
while(menuCheck):
    print("New Personality")
    typeId = input("Enter tpyeID, same as type (e.g. SC,Sc or Cs):")
    result = collection.find_one({"type":typeId})
    if(result is not None):
        choice = int(input("Personality already inserted. Want to update the inserted one with this new one? 1:YES, 0:NO  :"))
        if(choice):
            keys = result["keywords"]
            for each in keys:
                keywords.append(each)
            collection.delete_one({"type":typeId})
        else:
            print("Insertion aborted")
            break
    enterAttribute(tends,"tends")
    enterAttribute(strengths, "strengths")
    enterAttribute(weaknesses,"weaknesses")
    enterAttribute(growths,"growths")
    enterAttribute(motivations,"motivations")
    enterAttribute(Stresses,"Stresses")
    enterAttribute(positiveCareer,"positiveCareer")
    enterAttribute(negativeCareer,"negativeCareer")
    enterAttribute(jobs,"jobs")
    enterAttribute(positiveFriendship,"positiveFriendship")
    enterAttribute(negativeFriendship,"negativeFriendship")
    enterAttribute(positiveRelationship,"positiveRelationship")
    enterAttribute(negativeRelationship,"negativeRelationship")
    enterAttribute(keywords,"keywords")
    typeName = input("Enter type name, e.g. The Editor:")

    post = {"_id": typeId, "tends": tends, "strengths": strengths, "weaknesses": weaknesses, "growths": growths, "motivations": motivations, "Stresses": Stresses,
             "positiveCareer": positiveCareer, "negativeCareer": negativeCareer, "jobs": jobs, "positiveFriendship": positiveFriendship, "negativeFriendship": negativeFriendship,
             "positiveRelationship": positiveRelationship, "negativeRelationship": negativeRelationship, "keywords": keywords, "type": typeId, "name": typeName, "__v":0
             }
    print("SUMMARY OF CREATED POST")
    for each in post:
        print(each +":")
        print(post[each])

    choice = int(input("Add this to database? 0:NO, 1:YES :" ))
    if(choice):
        collection.insert_one(post)
        print("Added succesfully")

    resetPost()
    menuCheck = int(input("This personality is over. Continue with new personality? 0=NO, 1=YES :"))
