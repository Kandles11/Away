import numpy as np
from imageio import imread
import os
import time
import subprocess
import json

from keras.applications.xception import Xception
from keras.applications.xception import preprocess_input
from keras.applications.xception import decode_predictions

from flask import Flask
from flask import request

app = None
model = None
classNames = None

def initClassNames():
    global classNames
    
    classNames = json.load(open('words.json'))

    for key, value in classNames.items():
        if value == '':
            name = key[0].upper() + key[1:]
            classNames.update({key: key})

def initModel():
    global model

    model = Xception(weights='imagenet')

def processFile(input):
    global model

    os.popen(f"convert {input} -resize 299x299! {input}").read()

    data = np.empty((1, 299, 299, 3))
    data[0] = imread(input)
    data = preprocess_input(data)

    predictions = model.predict(data)
    print('Shape: {}'.format(predictions.shape))

    output_neuron = np.argmax(predictions[0])
    print('Most active neuron: {} ({:.2f}%)'.format(
        output_neuron,
        100 * predictions[0][output_neuron]
    ))

    decoded = decode_predictions(predictions)[0]

    for name, desc, score in decoded:
        print('- {} ({:.2f}%%)'.format(desc, 100 * score))

    # Extract name of best guess
    top = decoded[0][1]

    return top

def processMultiFile(file):
    t = time.time().__str__()
    input = f'/srv/build/tmp/temp-{t}.png'
    file.save(input)

    lines = []
    res = []

    os.popen(f"convert {input} -resize 750x750! {input}").read()
    result = subprocess.Popen(f'./multicrop {input} {input}-out.png', shell=True, executable='/bin/zsh', stdout=subprocess.PIPE)
    for line in result.stdout:
        line = line.decode('ascii')
        line = line.strip()

        if len(lines) != 0 and line != lines[-1]:
            res.append(processFile(lines[-1]))
            print(res[-1])

        lines.append(line)

    #res.append(processFile(lines[-1]))
    #print(res[-1])
        
    formattedRes = []

    for i in res:
        if i in classNames:
            formattedRes.append(classNames[i])

    return str(formattedRes)



def startWebServer():
    global app
    app = Flask(__name__, instance_relative_config=True)

    @app.post("/detect")
    def detect():
        if 'image' not in request.files:
            return "Invalid request", 400
        else:
            return processMultiFile(request.files['image'])
    
    @app.route("/hello")
    def hello():
        return "Hello, World!"
    
    app.run('0.0.0.0', 25567)

initClassNames()
initModel()
startWebServer()