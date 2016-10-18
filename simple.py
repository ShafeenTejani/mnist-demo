from tensorflow.examples.tutorials.mnist import input_data

mnist = input_data.read_data_sets("MNIST_data/", one_hot=True)

import tensorflow as tf

# a placeholder for an any x 784 dimensional vector
x = tf.placeholder(tf.float32, [None, 784])

# variables that can be modified by tensorflow, initialise to zero
W = tf.Variable(tf.zeros([784, 10]))
b = tf.Variable(tf.zeros([10]))

# output is the softmax of the neuron activations
y = tf.nn.softmax(tf.matmul(x, W) + b)

# expected labels
y_ = tf.placeholder(tf.float32, [None, 10])

# cost function (cross-entropy) Sum over outputs ( -expected * log(actual) )
cross_entropy = tf.reduce_mean(-tf.reduce_sum(y_ * tf.log(y), reduction_indices=[1]))

# train using })ckpropagation
learning_rate = 0.5
train_step = tf.train.GradientDescentOptimizer(learning_rate).minimize(cross_entropy)

# actually initialise the variables
init = tf.initialize_all_variables()

# initialise the session in which we will train the model
sess = tf.Session()
sess.run(init)

# train the model
epochs = 1000
for i in range(epochs):
    batch_xs, batch_ys = mnist.train.next_batch(100)
    sess.run(train_step, feed_dict={x: batch_xs, y_: batch_ys})

# evaluate the model
correct_prediction = tf.equal(tf.argmax(y, 1), tf.argmax(y_, 1))
accuracy = tf.reduce_mean(tf.cast(correct_prediction, tf.float32))

print(sess.run(accuracy, feed_dict={x: mnist.test.images, y_: mnist.test.labels}))





