# -*- coding: utf-8 -*-
"""
Created on Sun Mar 15 17:14:38 2020

@author: MehmetSanisoglu
"""
from pymongo import MongoClient

cluster = MongoClient("mongodb+srv://mehmetsan:Northern61@clustermehmet-aio9p.mongodb.net/test?retryWrites=true&w=majority")
db = cluster["Personality"]
collection = db["test"]

typeId = ""
tends = []
strengths = []
weaknesses = []
growths = []
motivations = []
Stresses = []
positiveCareer = []
negativeCareer = []
jobs = []
positiveFriendship = []
negativeFriendship = []
positiveRelationship = []
negativeRelationship = []
keywords = []
typeCategory = typeId
typeName = ""

def enterAttribute(attributeName, name):
    check = True

    while(check != "0"):
        prompt = "Enter "+name+" (Press 0 for exit): "
        check = input(prompt)
        if(check != "0"):
            attributeName.append(check)
    return

menuCheck = True
while(menuCheck):
    print("New Personality")
    typeId = input("Enter tpyeID, same as type:")
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
    menuCheck = int(input("This personality is over. Continue with new personality? 0=NO, 1=YES :"))

post = {"_id": typeId, "tends": tends, "strengths": strengths, "weaknesses": weaknesses, "growths": growths, "motivations": motivations, "Stresses": Stresses,
         "positiveCareer": positiveCareer, "negativeCareer": negativeCareer, "jobs": jobs, "positiveFriendship": positiveFriendship, "negativeFriendship": negativeFriendship,
         "negativeRelationship": negativeRelationship, "keywords": keywords, "type": typeCategory, "name": typeName, "__v":0
         }

result = collection.find({"_id":typeId})
if(len(result) != 0):
    print("Already inserted this personality"+ typeId)
    choice = int(input("Want to update the inserted one with this new one? 1:YES, 0:NO  :"))
    if(choice):
        collection.insert_one(post)
    else:
        print("Insertion aborted")
else:
    collection.insert_one(post)