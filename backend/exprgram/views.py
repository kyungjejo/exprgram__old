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
from .common import fetch_topic
from random import shuffle

data = open(static('subtitle_aggregated.txt')).readlines()
SUBTITLE_PATH = static('subtitle/')
INDEX_PATH = static('filename_index.json')
f_index = json.load(open(INDEX_PATH))

def sentenceInfo(g):
    videoList = []
    videoList = f_index[str(g)]
    start = int(f_index[str(g)][1]['start']) - 10
    start_ind = f_index[str(g)][2] - 5 if (f_index[str(g)][2])-5>0 else 0
    with open(SUBTITLE_PATH+f_index[str(g)][0]) as f:
        subtitleJS = json.load(f)
        s = int(subtitleJS[str(start_ind)]['start'])
        end_ind = f_index[str(g)][2] + 5 if f_index[str(g)][2] + 5<(len(subtitleJS)-1) else len(subtitleJS)-1
        e = int(subtitleJS[str(end_ind)]['end'])
        end = int(f_index[str(g)][1]['end']) + 7
    videoList[1]['start'] = s if s>start else start
    videoList[1]['end'] = e if e<end else end
    videoList.append(g)
    return videoList

def generate_graph(size_words=4):
    global data
    G = nx.Graph()
    with open(static('score.json')) as f:
        js = json.load(f)
        for i in js.keys():
            s = set([x[0] for x in js[i] if len(x[0].split())>size_words])
            if len(s)>size_words:
                for j in range(len(js[i])):
                    if len(js[i][j][0].split())>4:
                        if not js[i][j][0].strip() == data[int(i)]:
                            G.add_edge(int(i),js[i][j][2],weight=js[i][j][1])
    return G

def group(G=nx.Graph(),size_min_set=3, size_max_set=7):
    global data
    groups = {}
    for node in G.nodes:
        size = 0
        root = ''
        group = nx.node_connected_component(G,node)
        for n in group:
            l = len([x for x in G.neighbors(n)])
            if l >= size:
                size=l
                root=n
        if root and not root in groups.keys() and \
            len(list(set([data[x] for x in list(group)])))>=size_min_set and \
            len(list(set([data[x] for x in list(group)])))<=size_max_set and \
            len(list([data[x] for x in list(group)]))<len(list(set([data[x] for x in list(group)])))+3:
            groups[root] = group
    lst_remove = []
    count=0
    for g in groups.keys():
        group = [data[x] for x in groups[g]]
        topic = fetch_topic(group)
        topic = topic.split(' ')
        _count = 0
        for t in topic:
            if '_____' in t:
                _count+=1
        if _count>2 or _count>=len(topic)/2:
            lst_remove.append(g)
        if len(topic)<4:
            lst_remove.append(g)
        if '_____' in topic[0]:
            lst_remove.append(g)
        if g not in lst_remove:
            count+=1
            # print ("%d, Topic: %s, Representative: %s, length: %d" %(g, " ".join(topic),data[g].strip(), len(groups[g])))
            # print ("https://exprgram.kyungjejo.com/video/%s/%s/%s/%s/%s/{userid}" %(sentenceInfo(g)[0],sentenceInfo(g)[1]['start'],sentenceInfo(g)[1]['end'],sentenceInfo(g)[2],sentenceInfo(g)[3]))
            # print ("\n")
            # "http://localhost:3000/video/NZ6_ucAP5Ag/183/197/71/4829/kyungjejo"
            # print ("Related Expressions: %s" %" ".join([data[x] for x in groups[g]]))

    for l in lst_remove:
        groups.pop(l,None)
    # print("Number of groups: %d"  %len(groups))
    # print("Total number of expressions: %d" %len([x for x in groups.values() for x in x]))
    return groups

# Create your views here.
groups = group(generate_graph(0),5,8)

def fetch_videoList():
    lst = glob(SUBTITLE_PATH+'*')
    js = {}
    for s in lst:
        with open(s) as f:
            f_js = json.load(f)
            js[s.split('/')[-1]] = [int(f_js['0']['start']), int(f_js[str(len(f_js)-1)]['end'])]
    return js

@csrf_exempt
def fetchVideoList(request):
    _groups = groups.copy()
    group = []
    videoList = {}
    progress = [p['target'] for p in Progress.objects.filter(userid=request.GET['userid']).values('target')]
    for g in [12186,28633,37080,6365,30300,19158,24667,22392,23187,37715,27572,23826]:
        _groups.pop(g,None)
    while len(videoList.keys())<5 and len(_groups.keys())>len(videoList.keys()):
        group = random.sample(_groups.keys(),1)[0]
        chosen_group = [x for x in list(_groups[group]) if x not in progress]
        try:
            g = random.choice(chosen_group)
        except IndexError:
            continue
        topic = fetch_topic([f_index[str(x)][1]['sent'] for x in chosen_group])
        if not topic:
            continue
        _groups.pop(group)
        idx = str(len(videoList))
        videoList[idx] = {}
        videoList[idx]['topic'] = topic
        videoList[idx]['main'] = sentenceInfo(g)
        videoList[idx]['related'] = []
        for sent in chosen_group:
            if not g == sent:
                videoList[idx]['related'].append(sentenceInfo(sent))

    # all verified labels
    #   select * from (select target,  label, count(label) as total from exprgram_relationshiplables group by label, target) where total>10
    # choose maxmimum five from
    #   select distinct label from (select * from (select target,  label, count(label) as total from exprgram_relationshiplables group by label, target) where total>1)
    
    # verified_relationship_set = relationshipLables.objects.raw('select * from (select id, target,  label, count(label) as total from exprgram_relationshiplables group by label, target) where total>1')
    # verified_relationship_labels = relationshipLables.objects.raw('select distinct label from (select * from (select id, target, label, count(label) as total from exprgram_relationshiplables group by label, target) where total>1)')
    # print(verified_relationship_set.columns)
    # print(list(verified_relationship_set))
    # print(len(list(verified_relationship_set)))
    # for v in verified_relationship_set:
    #     print(v.label)
    # print(verified_relationship_labels.columns)
    # print(list(verified_relationship_labels))
    # print(len(list(verified_relationship_labels)))
    # for v in verified_relationship_labels:
    #     print(v.label)
    # 
    # select * from (select target,  label, count(label) as total from exprgram_emotionlables group by label, target) where total>10
    # select * from (select target,  label, count(label) as total from exprgram_locationlables group by label, target) where total>10
    js={}
    js['videoList'] = videoList
    return HttpResponse(json.dumps(js), content_type="application/json")

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

    # Generating leaderboard
    # If learner's rank is higher than 10, retrieve 9 and add learner
    # If learner's rank is within 10, retrieve 10
    if len(progress_all)>10:
        _within_ten = False
        for i in range(10):
            leaderboard.append({
                'rank': i+1 if len(leaderboard)==0 or leaderboard[i-1]['total']>progress_all[i]['total'] else leaderboard[i-1]['rank'],
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
                'rank': i+1 if len(leaderboard)==0 or leaderboard[i-1]['total']>progress_all[i]['total'] else leaderboard[i-1]['rank'],
                'userid': progress_all[i]['userid'],
                'total': progress_all[i]['total']
            })
    progress = Progress.objects.filter(userid=request.GET['userid'])
    js['leaderboard'] = leaderboard

    # Retrieve expressions learners learned with its metadata
    if len(progress)>0:
        lst = []
        for p in progress:
            lst.append(p.target)
        js['userid'] = lst
        count = 0
        progress_groups = {}
        for v in lst:
            for title, vals in groups.items():
                # print(v,vals)
                if v in vals:
                    progress_groups[v] = []
                    count+=1
                    progress_groups[v].append({
                        'videoID': f_index[str(v)][0],
                        'index': v,
                        'sent': f_index[str(v)][1]['sent'],
                        'watched': 1,
                        'start': f_index[str(v)][1]['start']-7,
                        'end': f_index[str(v)][1]['end']+7,
                        'sentNum': f_index[str(v)][2],
                    })
                    break
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
    # relationship_
    if activityNum == 0:
        confidence = confidenceLabels(userid=userid,target=target,expressionValue=values['expression_value'],contextValue=values['context_value'])
        confidence.save()

    elif activityNum == 1:
        relationship = values['relationship']
        location = values['location']
        emotion = values['emotion']
        intention = values['intention']
        relationship_lst = [r for r in values['relationship_lst'] if r != relationship] if len(values['relationship_lst'])>0 else []
        location_lst = [l for l in values['location_lst'] if l != location] if len(values['location_lst'])>0 else []
        emotion_lst = [e for e in values['emotion_lst'] if e != emotion] if len(values['emotion_lst'])>0 else []
        intention_lst = [i for i in values['intention_lst'] if i != intention] if len(values['intention_lst'])>0 else []

        _relationship, created = relationshipLables.objects.get_or_create(target=target,label=relationship.lower().strip())
        if not created:
            _relationship.vote = _relationship.vote+1
            _relationship.save()
        for r in relationship_lst:
            _relationship = relationshipLables.objects.get(target=target,label=r.lower().strip())
            _relationship.vote = _relationship.vote-1
            _relationship.save()

        _location, created = locationLables.objects.get_or_create(target=target,label=location.lower().strip())
        if not created:
            _location.vote = _location.vote+1
            _location.save()
        for l in location_lst:
            _location = locationLables.objects.get(target=target,label=l.lower().strip())
            _location.vote = _location.vote-1
            _location.save()
        
        _emotion, created = emotionLables.objects.get_or_create(target=target,label=emotion.lower().strip())
        if not created:
            _emotion.vote = _emotion.vote+1
            _emotion.save()
        for e in emotion_lst:
            _emotion = emotionLables.objects.get(target=target,label=e.lower().strip())
            _emotion.vote = _emotion.vote-1
            _emotion.save()

        _intention, created = intentionLables.objects.get_or_create(target=target,label=intention.strip())
        if not created:
            _intention.vote = _intention.vote+1
            _intention.save()
        for i in intention_lst:
            _intention = intentionLables.objects.get(target=target,label=i)
            _intention.vote = _intention.vote-1
            _intention.save()

        progress, created = Progress.objects.get_or_create(userid=userid,target=target)
    
    elif activityNum == 2:
        similar = similarExpression(target=target,expr=values['similar_expression'])
        similar.save()
    
    elif activityNum == 3:
        js = values['js']
        for sim in values['similar_expressions']:
            for j in js[sim]:
                similar = expressionSimilarity.objects.filter(target=target,similar=j)
                if len(similar)>0:
                    for s in similar:
                        s.vote = s.vote+1
                        s.save()
                else:
                    expressionSimilarity.objects.create(target=target,similar=j,vote=1)
            similar = similarExpression.objects.filter(target=target,expr=sim)
            for s in similar:
                s.vote = s.vote+1
                s.save()
        for sim in [v for v in values['original_expressions'] if v not in values['similar_expressions']]:
            for j in js[sim]:
                similar = expressionSimilarity.objects.filter(target=target,similar=j)
                if len(similar)>0:
                    for s in similar:
                        s.vote = s.vote-1
                        s.save()
                else:
                    expressionSimilarity.objects.create(target=target,similar=j,vote=-1)
            similar = similarExpression.objects.filter(target=target,expr=sim)
            for s in similar:
                s.vote = s.vote-1
                s.save()

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
    activity = 0
    if not 'activity' in request.GET.keys():
        videoList = {}
        progress = [p['target'] for p in Progress.objects.filter(userid=request.GET['userid']).values('target')]
        for group in groups.values():
            if int(_ind) in list([int(x) for x in group]):
                for g in list(group):
                    if str(_ind) == str(g):
                        continue
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
    else:
        js = {}
        js['json'] = {}
        similar_exprs = []
        for vals in groups.values():
            values = list(vals)
            if int(_ind) in values:
                for l in values:
                    if l != int(_ind) and f_index[_ind][1]['sent'].strip() != f_index[str(l)][1]['sent'].strip():
                        if expressionSimilarity.objects.filter(target=_ind,similar=l).first():
                            if expressionSimilarity.objects.filter(target=_ind,similar=l,vote__lte=-6).first():
                                continue
                        if f_index[str(l)][1]['sent'] not in js['json'].keys():
                            js['json'][f_index[str(l)][1]['sent']] = [l]
                        else:
                            js['json'][f_index[str(l)][1]['sent']].append(l)
                        similar_exprs.append(f_index[str(l)][1]['sent'])
        similar_exprs = list(set(similar_exprs))
        exprs = list(similarExpression.objects.filter(target=_ind,vote__gte=-5))
        shuffle(exprs)
        for idx, e in enumerate(exprs):
            if len(similar_exprs)>=7:
                break
            if e.expr not in similar_exprs:
                js['json'][e.expr] = []
                similar_exprs.append(e.expr)
        js['similar'] = similar_exprs
        return HttpResponse(json.dumps(js), content_type="application/json")


@csrf_exempt
def labelBandit(request):
    target = request.GET['target']
    relationship = relationshipLables.objects.filter(target=target)
    voted_relationship = relationshipLables.objects.filter(target=target, vote__gte=-5).values('label').order_by('-vote')

    location = locationLables.objects.filter(target=target)
    voted_location = locationLables.objects.filter(target=target, vote__gte=-5).values('label').order_by('-vote')

    emotion = emotionLables.objects.filter(target=target)
    voted_emotion = emotionLables.objects.filter(target=target, vote__gte=-5).values('label').order_by('-vote')

    intention = relationshipLables.objects.filter(target=target)
    voted_intention = intentionLables.objects.filter(target=target, vote__gte=-5).values('label').order_by('-vote')

    js={
        "relationship": [],
        "location": [],
        "emotion": [],
        "intention": [],
        }
    if len(relationship)>=3:
        count=0
        rel=[]
        for v_r in voted_relationship:
            count+=1
            if count>2:
                break
            rel.append(v_r)
        if len(voted_relationship)>2:
            rel.append(random.choice(voted_relationship[2:]))
        lst = [r['label'].capitalize() for r in rel]
        shuffle(lst)
        js['relationship'] = lst
    if len(location)>=3:
        count=0
        rel=[]
        for v_l in voted_location:
            count+=1
            if count>2:
                break
            rel.append(v_l)
        if len(voted_location)>2:
            rel.append(random.choice(voted_location[2:]))
        lst = [r['label'].capitalize() for r in rel]
        shuffle(lst)
        js['location'] = lst
    if len(emotion)>=3:
        count=0
        rel=[]
        for v_e in voted_emotion:
            count+=1
            if count>2:
                break
            rel.append(v_e)
        if len(voted_emotion)>2:
            rel.append(random.choice(voted_emotion[2:]))
        lst = [r['label'].capitalize() for r in rel]
        shuffle(lst)
        js['emotion'] = lst
    if len(intention)>=3:
        count=0
        rel=[]
        for v_i in voted_intention:
            count+=1
            if count>2:
                break
            rel.append(v_i)
        if len(voted_intention)>2:
            rel.append(random.choice(voted_intention[2:]))
        lst = [r['label'].capitalize() for r in rel]
        shuffle(lst)
        js['intention'] = lst
    return HttpResponse(json.dumps(js), content_type="application/json")