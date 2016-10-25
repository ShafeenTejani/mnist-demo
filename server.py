"""
    MNIST Classifier

    An API to classify 28x28 pixel images according to pre-trained
    MNIST neural networks
"""
import tensorflow as tf
import numpy as np

from networks import variables

x = tf.placeholder("float", [None, 784])

session = tf.Session()

fully_connected_y, fc_variables = variables.fully_connected(x)

saver_fc = tf.train.Saver(fc_variables)
saver_fc.restore(session, "models/fully_connected_model.ckpt")

def fully_connected_network(input):
    return session.run(fully_connected_y, feed_dict={x: input}).flatten().tolist()


keep_prob = tf.placeholder(tf.float32)
convolutional_y, conv_variables = variables.convolutional(x, keep_prob)

saver_conv = tf.train.Saver(conv_variables)
saver_conv.restore(session, "models/convolutional_neural_network.ckpt")

def convolutional_network(input):
    return session.run(convolutional_y, feed_dict={x: input, keep_prob: 1.0}).flatten().tolist()

# webapp
from flask import Flask, jsonify, render_template, request

app = Flask(__name__, static_folder="./web/build", static_url_path='')

@app.route('/')
def index():
    return app.send_static_file('index.html')

@app.route('/api/mnist/evaluate', methods=['POST'])
def evaluate():
    input = np.array([request.json], dtype=np.float32)
    outputFC = fully_connected_network(input)
    outputConv = convolutional_network(input)
    return jsonify(fully_connected=dict(enumerate(outputFC)),convolutional=dict(enumerate(outputConv)))

@app.route('/api/mnist/fully_connected', methods=['POST'])
def fully_connected():
    input = np.array([request.json], dtype=np.float32)
    output = fully_connected_network(input)
    return jsonify(results=dict(enumerate(output)))

@app.route('/api/mnist/convolutional', methods=['POST'])
def convolutional():
    input = np.array([request.json], dtype=np.float32)
    output = convolutional_network(input)
    return jsonify(results=dict(enumerate(output)))
