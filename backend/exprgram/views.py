from django.shortcuts import render
from django.contrib.staticfiles.templatetags.staticfiles import static
from glob import glob
import os
import json
from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt
import networkx as nx
import matplotlib.pyplot as plt
import random
from .models import *
from django.core import serializers
from django.db.models import Count
from django.db.models import Q

data = open(static('subtitle_aggregated.txt')).readlines()

def generate_graph(size_words=4):
    global data
    G = nx.Graph()
    with open(static('score.json')) as f:
        js = json.load(f)
        for i in js.keys():
            s = set([x[0] for x in js[i] if len(x[0].split())>4])
            if len(s)>size_words:
                for j in range(len(js[i])):
                    if len(js[i][j][0].split())>4:
                        if not js[i][j][0].strip() == data[int(i)]:
                            G.add_edge(int(i),js[i][j][2],weight=js[i][j][1])
    return G

def group(G=nx.Graph()):
    global data
    groups = {}
    for node in G.nodes:
        size = 100
        root = ''
        group = nx.node_connected_component(G,node)
        for n in group:
            l = len([x for x in G.neighbors(n)])
            if l < size:
                size=l
                root=n        
        if not data[root] in groups.keys():
            groups[root] = group
    return groups

# Create your views here.

SUBTITLE_PATH = static('subtitle/')
INDEX_PATH = static('filename_index.json')
f_index = json.load(open(INDEX_PATH))
groups = group(generate_graph(4))

# print(groups)

def fetch_videoList():
    lst = glob(SUBTITLE_PATH+'*')
    js = {}
    for s in lst:
        with open(s) as f:
            f_js = json.load(f)
            js[s.split('/')[-1]] = [int(f_js['0']['start']), int(f_js[str(len(f_js)-1)]['end'])]
    return js

# videoList = fetch_videoList()

@csrf_exempt
def fetchVideoList(request):
    global groups
    group = []
    progress = [p['target'] for p in Progress.objects.filter(userid=request.GET['userid']).values('target')]
    for g in random.sample(groups.keys(),5):
        r = random.choice(list(groups[g]))
        while r in progress:
            r = random.choice(list(groups[g]))
        group.append(r)
    # group = random.sample(groups.keys(),10)
    videoList = {}
    for g in group:
        videoList[f_index[str(g)][1]['sent']] = f_index[str(g)]
        start = int(f_index[str(g)][1]['start']) - 10
        start_ind = f_index[str(g)][2] - 5 if (f_index[str(g)][2])-5>0 else 0
        with open(SUBTITLE_PATH+f_index[str(g)][0]) as f:
            subtitleJS = json.load(f)
            s = int(subtitleJS[str(start_ind)]['start'])
            end_ind = f_index[str(g)][2] + 5 if f_index[str(g)][2] + 5<(len(subtitleJS)-1) else len(subtitleJS)-1
            e = int(subtitleJS[str(end_ind)]['end'])
            end = int(f_index[str(g)][1]['end']) + 7
        videoList[f_index[str(g)][1]['sent']][1]['start'] = s if s>start else start
        videoList[f_index[str(g)][1]['sent']][1]['end'] = e if e<end else end
        videoList[f_index[str(g)][1]['sent']].append(g)
    # for k in groups.keys():
    #     print (k.strip())
    #     print ([data[x].strip() for x in groups[k]])
    # print(len(groups.keys()))
    # print(videoList)
    return HttpResponse(json.dumps(videoList), content_type="application/json")

@csrf_exempt
def fetchSubtitle(request):
    js = json.load(open(SUBTITLE_PATH+request.GET['videoId']))
    return HttpResponse(json.dumps(js), content_type="application/json")

@csrf_exempt
def login(request):
    values = request.GET
    submittedId = values['id']
    submittedEmail = values['email']
    userinfo = userInfo.objects.get(userid=submittedId,email=submittedEmail)
    js={'success':'success','userid':submittedId}
    return HttpResponse(json.dumps(js), content_type="application/json")

@csrf_exempt
def register(request):
    """
        returns {success: string}
    """
    values = json.loads(request.body.decode('utf-8'))

    submittedId = values['submittedId']
    submittedEmail = values['submittedEmail']
    submittedId=values['submittedId']
    submittedNative=values['submittedNative']
    submittedCountry=values['submittedCountry']
    submittedNative=values['submittedNative']
    submittedEnglish=values['submittedEnglish']
    submittedFamiliarity=values['submittedFamiliarity']
    submittedReside=values['submittedReside']
    submittedReason=values['submittedReason']

    userinfo = userInfo(userid=submittedId,
                        email=submittedEmail,
                        country=submittedCountry,
                        mothertongue=submittedNative,
                        englishlevel=submittedEnglish,
                        familiarity=submittedFamiliarity,
                        residence=submittedReside,
                        reason=submittedReason)
    userinfo.save()
    return HttpResponse(json.dumps({'success':"success"}), content_type="application/json")

@csrf_exempt
def progressCheck(request):
    progress_all = Progress.objects.all().values('userid').annotate(total=Count('userid')).order_by('-total')
    leaderboard = []
    js = {}
    if len(progress_all)>10:
        _within_ten = False
        for i in range(10):
            leaderboard.append({
                'rank': i+1,
                'userid': progress_all[i]['userid'],
                'total': progress_all[i]['total']
            })
            if progress_all[i]['userid'] == request.GET['userid']:
                _within_ten = True
        if not _within_ten:
            for idx,p in enumerate(progress_all):
                if p['userid'] == request.GET['userid']:
                    leaderboard.pop()
                    leaderboard.append({
                        'rank': idx+1,
                        'userid': p['userid'],
                        'total': p['total']
                    })
    else:
        for i in range(len(progress_all)):
            leaderboard.append({
                'rank': i+1,
                'userid': progress_all[i]['userid'],
                'total': progress_all[i]['total']
            })
    progress = Progress.objects.filter(userid=request.GET['userid'])
    js['leaderboard'] = leaderboard
    if len(progress)>0:
        lst = []
        for p in progress:
            lst.append(p.target)
        js['userid'] = lst
        count = 0
        progress_groups = {}
        for title, vals in groups.items():
            progress_groups[f_index[str(title)][1]['sent']] = []
            for v in vals:
                count+=1
                progress_groups[f_index[str(title)][1]['sent']].append({
                    'videoID': f_index[str(v)][0],
                    'index': v,
                    'sent': f_index[str(v)][1]['sent'],
                    'watched': 1 if int(v) in lst else 0,
                    'start': f_index[str(v)][1]['start']-7,
                    'end': f_index[str(v)][1]['end']+7,
                    'sentNum': f_index[str(v)][2],
                })
        js['count'] = count
        js['progressGroups'] = progress_groups
    else:
        js = {}
    
    
    return HttpResponse(json.dumps(js), content_type="application/json")

@csrf_exempt
def activityResponse(request):
    activityNum = int(request.GET['number'])
    userid = request.GET['userid']
    target = request.GET['sentNumber']
    values = json.loads(request.body.decode('utf-8'))
    print(activityNum,values)
    if activityNum == 0:
        confidence = confidenceLabels(userid=userid,target=target,expressionValue=values['expression_value'],contextValue=values['context_value'])
        confidence.save()

    elif activityNum == 1:
        similar = similarExpression(userid=userid,target=target,expr=values['similar_expression'])
        similar.save()

    elif activityNum == 2:
        relationship, created = relationshipLables.objects.get_or_create(userid=userid,target=target,label=values['relationship'].lower().strip())
        # if not created:
        #     relationship.update(count=relationship.count+1)
        
        location, created = locationLables.objects.get_or_create(userid=userid,target=target,label=values['location'].lower().strip())
        # if not created:
        #     location.update(count=location.count+1)
        
        emotion, created = emotionLables.objects.get_or_create(userid=userid,target=target,label=values['emotion'].lower().strip())
        # if not created:
        #     emotion.update(count=emotion.count+1)

        intention, created = intentionLables.objects.get_or_create(userid=userid,target=target,label=values['intention'].strip())
        # if not created:
        #     intention.update(count=intention.count+1)

        progress, created = Progress.objects.get_or_create(userid=userid,target=target)

        relationship.save()
        location.save()
        emotion.save()
        intention.save()
        progress.save()

    # elif activityNum == 3:
    js={'success':'success'}
    return HttpResponse(json.dumps(js), content_type="application/json")

@csrf_exempt
def fetchSimilar(request):
    """
    returns json
        {
            sentence: 
                [videoID, 
                    {
                        start: int, 
                        end: int, 
                        sent: string, 
                        startOffset: int, 
                        endOffset: int    
                    }
                ]
        }
    """
    global groups
    _ind = request.GET['index']
    videoList = {}
    progress = [p['target'] for p in Progress.objects.filter(userid=request.GET['userid']).values('target')]
    for group in groups.values():
        if int(_ind) in list([int(x) for x in group]):
            for g in list(group):
                if not g in progress:
                    videoList[f_index[str(g)][1]['sent']] = f_index[str(g)]
                    # resetting start and end time
                    start = f_index[str(g)][1]['start'] - 7
                    start_ind = f_index[str(g)][2] - 5 if (f_index[str(g)][2])-5>0 else 0
                    with open(SUBTITLE_PATH+f_index[str(g)][0]) as f:
                        subtitleJS = json.load(f)
                        s = subtitleJS[str(start_ind)]['start']
                        end_ind = f_index[str(g)][2] + 5 if f_index[str(g)][2] + 5<(len(subtitleJS)-1) else len(subtitleJS)-1
                        e = subtitleJS[str(end_ind)]['end']
                        end = f_index[str(g)][1]['end'] + 7
                    videoList[f_index[str(g)][1]['sent']][1]['start'] = s if s>start else start
                    videoList[f_index[str(g)][1]['sent']][1]['end'] = e if e<end else end
                    videoList[f_index[str(g)][1]['sent']].append(g)
            return HttpResponse(json.dumps(videoList), content_type="application/json")


@csrf_exempt
def labelBandit(request):
    target = request.GET['target']
    relationship = relationshipLables.objects.filter(target=target).values('label').annotate(total=Count('label')).order_by('-total')

    location = locationLables.objects.filter(target=target).values('label').annotate(total=Count('label')).order_by('-total')

    emotion = emotionLables.objects.filter(target=target).values('label').annotate(total=Count('label')).order_by('-total')

    intention = intentionLables.objects.filter(target=target).values('label').annotate(total=Count('label')).order_by('-total')
    js={
        "relationship": [],
        "location": [],
        "emotion": [],
        "intention": [],
        }
    if len(relationship)>=3:
        relationship = relationship[:3]
        js['relationship'] = [r['label'].capitalize() for r in relationship]
    if len(location)>=3:
        location = location[:3]
        js['location'] = [r['label'].capitalize() for r in location]
    if len(emotion)>=3:
        emotion = emotion[:3]
        js['emotion'] = [r['label'].capitalize() for r in emotion]
    if len(intention)>=3:
        intention = intention[:3]
        js['intention'] = [r['label'].capitalize() for r in intention]
    return HttpResponse(json.dumps(js), content_type="application/json")