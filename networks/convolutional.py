from tensorflow.examples.tutorials.mnist import input_data
mnist = input_data.read_data_sets('MNIST_data', one_hot=True)

import tensorflow as tf

import variables

session = tf.InteractiveSession()

x = tf.placeholder(tf.float32, shape=[None, 784])

keep_prob = tf.placeholder(tf.float32)

y_conv, weights_and_biases = variables.convolutional(x, keep_prob)

y_ = tf.placeholder(tf.float32, shape=[None, 10])

# training and evaluation

cross_entropy = tf.reduce_mean(-tf.reduce_sum(y_ * tf.log(y_conv), reduction_indices=[1]))
train_step = tf.train.AdamOptimizer(1e-4).minimize(cross_entropy)

correct_prediction = tf.equal(tf.argmax(y_conv,1), tf.argmax(y_,1))
accuracy = tf.reduce_mean(tf.cast(correct_prediction, tf.float32))

saver = tf.train.Saver()

session.run(tf.initialize_all_variables())

for i in range(20000):
    batch = mnist.train.next_batch(50)
    if i%100 == 0:
        train_accuracy = accuracy.eval(feed_dict={
            x:batch[0], y_: batch[1], keep_prob: 1.0})
        print("step %d, training accuracy %g"%(i, train_accuracy))

    if i%1000 == 0:
        print("test accuracy %g"%accuracy.eval(feed_dict={
            x: mnist.test.images, y_: mnist.test.labels, keep_prob: 1.0}))

    train_step.run(feed_dict={x: batch[0], y_: batch[1], keep_prob: 0.5})

# save model
path = saver.save(session, "/tmp/convolutional_neural_network.ckpt")
print("Model saved at: %s" % path)

print("test accuracy %g"%accuracy.eval(feed_dict={
    x: mnist.test.images, y_: mnist.test.labels, keep_prob: 1.0}))
