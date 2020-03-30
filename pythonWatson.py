import requests
import json
import globalMethods as gm

##################################################
#############-------KEYWORDS-------###############
##################################################
def findMostRelevants( listOfWords ):
    max = []

    while(len(max) < 5 and len(listOfWords)>0):
        index = 0
        maxIndex = -1
        maxScore = -1
        size = len(listOfWords)
        while(index < size):
            if(listOfWords[index]['relevance'] > maxScore):
                maxIndex = index
                maxScore = listOfWords[index]['relevance']
            index +=1
        max.append(listOfWords[maxIndex])
        del listOfWords[maxIndex]

    return max

def findKeywords(text):
    headers = {'Content-Type': 'application/json'}
    data = '{"text":"'+text+'","features":{"sentiment":{},"categories":{},"concepts":{},"entities":{},"keywords":{}}}'

    analyzeText = requests.post('https://gateway-lon.watsonplatform.net/natural-language-understanding/api/v1/analyze?version=2019-07-12', headers=headers, data=data, auth=('apikey', '7LNEjCMvP6ZcNShjAkjPob7QSCfIHeZMQkn4Ho3dQgte'))
    textResults = analyzeText.json()

    keywords = textResults["keywords"]
    newKeywords = gm.capitalizeList(keywords)
    if(len(keywords) < 5):  #IF WE COULDN'T GET ENOUGH KEYWORDS, ASK FOR MORE DETAIL
        print("Oops! Going to need more detail than that..If you can't be more specific leave this part empty and continue to typing relevant keywords\n")
        print(text)
        additionDescription = input("Enter more detail. Continue from where you left off..\n")
        newInput = text + additionDescription

        data = '{"text":"'+newInput+'","features":{"sentiment":{},"categories":{},"concepts":{},"entities":{},"keywords":{}}}'
        analyzeText = requests.post('https://gateway-lon.watsonplatform.net/natural-language-understanding/api/v1/analyze?version=2019-07-12', headers=headers, data=data, auth=('apikey', '7LNEjCMvP6ZcNShjAkjPob7QSCfIHeZMQkn4Ho3dQgte'))
        textResults = analyzeText.json()
        keywords = textResults["keywords"]
        keywords = gm.capitalizeList(keywords)

        if(len(keywords) < 5): #IF WE STILL HAVEN'T ACQUIRED ENOUGH KEYWORDS, ASK FOR IMPORTANT ASPECTS DIRECTLY FROM THE USER
            importants = len(keywords)
            index = 0


            prompt = "Enter an important aspect in your situation, like "
            while(index < importants - 1):
                prompt = prompt + keywords[index]["text"] + ", "
                index +=1
            prompt += keywords[index]["text"] + " etc. "

            count = 0
            missing = 7 - importants

            while(count < missing):
                entry = input(prompt)
                entry = gm.capitalize(entry)

                keywordsList = []
                for each in keywords:
                    keywordsList.append(each["text"])


                if(entry not in keywordsList):

                    keywords.append({"text":entry, "relevance":0.4})
                    synonym = gm.getGoodSynonym(entry)
                    if(synonym): #IF IT IS NOT NONE, (SO NOT MORE THAN ONE WORD)
                        if(synonym not in keywords):
                            print("The entry is "+entry+" and its synonym is "+synonym)
                            keywords.append({"text":gm.capitalize(synonym), "relevance":0.4})
                count += 1


    mostRelevants = findMostRelevants(keywords)
    return mostRelevants

##################################################
#############-------EMOTIONS-------###############
##################################################
def format(list):
    targets = '['
    size = len(targetsList)
    index = 0
    while(index < size -1):
        targets += '"' + targetsList[index]+ '"'
        targets += ','
        index += 1
    targets += '"' +targetsList[size-1] +'"'
    targets += ']'

    return targets

def findMax( list ):
    joy = 0
    fear = 0
    disgust = 0
    anger = 0

    for entry in emotionWords:
        emotions = entry["emotion"]
        for key in emotions.keys():
            if(key == "joy"):
                joy += emotions["joy"]
            elif(key == "fear"):
                fear += emotions["fear"]
            elif(key == "anger"):
                anger += emotions["anger"]
            elif(key == "disgust"):
                disgust += emotions["disgust"]

    maximum = max(joy,fear,anger,disgust)
    dominantEmotion = ''

    if (maximum == joy):
        dominantEmotion = "JOY"
    if (maximum == fear):
        dominantEmotion = "FEAR"
    if (maximum == disgust):
        dominantEmotion = "DISGUST"
    if (maximum == anger):
        dominantEmotion = "ANGER"
    return dominantEmotion

def findSentiment( textParam, targetsParam):
    #FORMATTING
    headers = {'Content-Type': 'application/json'}
    params = (('version', '2019-07-12'),)

    #INPUTS
    targetsList = targetsParam
    targets = format(targetsList)
    text = '"'+textParam+'"'


    dataEmotions = '{\n  "text": '+text+'  "features": {\n    "sentiment": {\n      "targets": '+targets+'\n    },\n    "keywords": {\n      "emotion": true\n    }\n  }\n}'
    emotions= requests.post('https://gateway-lon.watsonplatform.net/natural-language-understanding/api/v1/analyze?version=2019-07-12', headers=headers, params=params, data=dataEmotions, auth=('apikey', '7LNEjCMvP6ZcNShjAkjPob7QSCfIHeZMQkn4Ho3dQgte'))

    emotionsResults = emotions.json()
    emotionsResults["sentiment"]
    emotionWords = emotionsResults["keywords"]

    dominant = findMax(emotionWords)

##################################################
#############-------TINKERING-------##############
##################################################

file = open("inputs.txt","r")
results = []

desiredTextIndex = 4       # <<<<<<<<<<<<<-------------------------------------------------- ENTER THE INDEX OF TEXT CORPUS

count = 0
for each in file:
    if(count == desiredTextIndex):
        temp = findKeywords(each)
        results.append(temp)
    count +=1
print(results[0])
