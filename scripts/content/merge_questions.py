#!/usr/bin/env python3
"""Merge extracted questions with their syllabus classification into public/data/{subject}/questions.json.

Inputs (scripts/content/out/): {subject}.questions.raw.json, {subject}.classification.json
Run after extract_questions.py and the classification step.
"""
import json
import os

ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
OUT = os.path.join(ROOT, 'scripts', 'content', 'out')
SUBJECTS = ['mathematics', 'physics', 'computer-science']

for subject in SUBJECTS:
    raw = json.load(open(os.path.join(OUT, f'{subject}.questions.raw.json')))
    cls = json.load(open(os.path.join(OUT, f'{subject}.classification.json')))
    syllabus = json.load(open(os.path.join(ROOT, 'public', 'data', subject, 'syllabus.json')))
    topics = {t['id'] for c in syllabus['components'] for t in c['topics']}
    objectives = {o['id'] for c in syllabus['components'] for t in c['topics'] for o in t['objectives']}

    missing = 0
    for q in raw:
        c = cls.get(q['id'])
        if not c:
            missing += 1
            continue
        q['topicIds'] = [t for t in c['topicIds'] if t in topics]
        q['objectiveIds'] = [o for o in c['objectiveIds'] if o in objectives]
        if c.get('difficulty') in (1, 2, 3):
            q['difficulty'] = c['difficulty']

    dest = os.path.join(ROOT, 'public', 'data', subject, 'questions.json')
    with open(dest, 'w') as f:
        json.dump(raw, f, ensure_ascii=False, separators=(',', ':'))
    print(f'{subject}: {len(raw)} questions, {missing} unclassified, {os.path.getsize(dest) // 1024} KB')
