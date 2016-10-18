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

fully_connected_y, variables = variables.fully_connected(x)
saver_f = tf.train.Saver(variables)
saver_f.restore(session, "models/fully_connected_model.ckpt")

def simple(input):
    return session.run(fully_connected_y, feed_dict={x: input}).flatten().tolist()

# webapp
from flask import Flask, jsonify, render_template, request

app = Flask(__name__)

@app.route('/')
def index():
    return jsonify("Hello")

@app.route('/api/mnist/fully_connected', methods=['POST'])
def mnist():
    input = np.array([request.json], dtype=np.float32)
    output = simple(input)
    return jsonify(results=output)
