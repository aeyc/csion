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

    #CURL CONNECTION PART
    headers = {'Content-Type': 'application/json'}
    data = '{"text":"'+text+'","features":{"sentiment":{},"categories":{},"concepts":{},"entities":{},"keywords":{}}}'
    analyzeText = requests.post('https://gateway-lon.watsonplatform.net/natural-language-understanding/api/v1/analyze?version=2019-07-12', headers=headers, data=data, auth=('apikey', '7LNEjCMvP6ZcNShjAkjPob7QSCfIHeZMQkn4Ho3dQgte'))
    textResults = analyzeText.json()

    keywords = textResults["keywords"]
    newKeywords = gm.capitalizeList(keywords)
    if(len(keywords) < 5):  #IF WE COULDN'T GET ENOUGH KEYWORDS, ASK FOR MORE DETAIL
        print("Oops! Going to need more detail than that..If you can't be more specific leave this part empty and continue to typing relevant keywords\n")
        print(text)
        additionDescription = input("Enter more detail. Continue from where you left off..\n")      #GETTING MORE DETAIL
        newInput = text + additionDescription

        #RESENDING THE CURL QUERY REQUIRES TUNING OF THE PARAMETERS
        data = '{"text":"'+newInput+'","features":{"sentiment":{},"categories":{},"concepts":{},"entities":{},"keywords":{}}}'
        analyzeText = requests.post('https://gateway-lon.watsonplatform.net/natural-language-understanding/api/v1/analyze?version=2019-07-12', headers=headers, data=data, auth=('apikey', '7LNEjCMvP6ZcNShjAkjPob7QSCfIHeZMQkn4Ho3dQgte'))
        textResults = analyzeText.json()
        keywords = textResults["keywords"]
        keywords = gm.capitalizeList(keywords)

        if(len(keywords) < 5): #IF WE STILL HAVEN'T ACQUIRED ENOUGH KEYWORDS, ASK FOR IMPORTANT ASPECTS DIRECTLY FROM THE USER
            importants = len(keywords)
            index = 0

            #PREPARING THE PROMPT
            prompt = "Enter an important aspect in your situation, like "
            while(index < importants - 1):
                prompt = prompt + keywords[index]["text"] + ", "
                index +=1
            prompt += keywords[index]["text"] + " etc. "


            count = 0
            missing = 7 - importants
            while(count < missing):         #WHILE WE STILL HAVE MISSING KEYWORDS
                entry = input(prompt)
                entry = gm.capitalize(entry)

                keywordsList = []
                for each in keywords:       #STORE THE KEYWORDS IN LIST FOMRAT ( THEY WERE IN DICTIONARY FORMAT )
                    keywordsList.append(each["text"])

                if(entry not in keywordsList):  #IF ENTERED KEYWORD IS NOT IN THE KEYWORDS LIST

                    keywords.append({"text":entry, "relevance":0.6})    #USER ENTERED KEYWORDS HAVE RELEVANCE OF 0.5
                    synonym = gm.getGoodSynonym(entry)
                    if(synonym):                                        #IF IT IS NOT NONE, (SO NOT MORE THAN ONE WORD) WE ALSO WANT TO INSERT ITS SYNONYM
                        if(synonym not in keywords):
                            print("The entry is "+entry+" and its synonym is "+synonym)
                            keywords.append({"text":gm.capitalize(synonym), "relevance":0.6})
                count += 1

    mostRelevants = findMostRelevants(keywords)
    return mostRelevants

##################################################
#############-------EMOTIONS-------###############
##################################################
def format(targetsList):
    targets = '['
    size = len(targetsList)
    index = 0
    while(index < size -1):
        targets = targets + '"' + targetsList[index]["text"]+ '"'
        targets += ','
        index += 1
    targets = targets + '"' +targetsList[size-1]["text"] +'"'
    targets += ']'

    return targets

def findMax( emotionWords ):
    joy = 0
    fear = 0
    disgust = 0
    anger = 0
    sadness = 0

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
            elif(key == "sadness"):
                sadness += emotions["sadness"]

    maximum = max(joy,fear,anger,disgust,sadness)
    dominantEmotion = ''
    mood = ''

    if (maximum == joy):
        dominantEmotion = "JOY"
        mood = "POSITIVE"
    if (maximum == fear):
        dominantEmotion = "FEAR"
        mood = "NEGATIVE"
    if (maximum == disgust):
        dominantEmotion = "DISGUST"
        mood = "NEGATIVE"
    if (maximum == anger):
        dominantEmotion = "ANGER"
        mood = "NEGATIVE"
    if (maximum == sadness):
        dominantEmotion = "SADNESS"
        mood = "NEGATIVE"

    return dominantEmotion

def findSentiment( textParam, targetsParam):
    #FORMATTING
    headers = {'Content-Type': 'application/json'}
    params = (('version', '2019-07-12'),)

    #INPUTS
    targetsList = targetsParam
    targets = format(targetsList)
    text = '"' + textParam + '",\n'

    dataEmotions = '{\n  "text": '+text+'  "features": {\n    "sentiment": {\n      "targets": '+targets+'\n    },\n    "keywords": {\n      "emotion": true\n    }\n  }\n}'
    emotions= requests.post('https://gateway-lon.watsonplatform.net/natural-language-understanding/api/v1/analyze?version=2019-07-12', headers=headers, params=params, data=dataEmotions, auth=('apikey', '7LNEjCMvP6ZcNShjAkjPob7QSCfIHeZMQkn4Ho3dQgte'))

    emotionsResults = emotions.json()
    emotionWords = emotionsResults["keywords"]

    dominant = findMax(emotionWords)
    return dominant
##################################################
#############---------USING---------##############
##################################################

file = open("inputs.txt","r")
results = []

desiredTextIndex = 2       # <<<<<<<<<<<<<-------------------------------------------------- ENTER THE INDEX OF TEXT CORPUS

textInput = ""
count = 0
for each in file:
    if(count == desiredTextIndex):
        textInput = each
        temp = findKeywords(each)
        results.append(temp)
    count +=1
print(results[0])


emotion = findSentiment(textInput, results[0])
print(emotion)