//Copyright (c) 2016-2017 Shafeen Tejani. Released under GPLv3.
import React from "react";
import Signature from "./Signature";

const Sidebar = (props) => (
  <aside className="sidebar">
    <div className="header">
      Single Digit Classification with Artificial Neural Networks
    </div>
    <p>Two neural networks have been trained on the <a href="http://yann.lecun.com/exdb/mnist/" target="_blank">MNIST data set</a> using the Google <a href="https://www.tensorflow.org/" target="_blank">TensorFlow</a> library.</p>
    <p>A simple, fully connected 3 layer neural network, trained to a test accuracy of 91.8%.</p>
    <p>And a convolutional neural network, with 2 convolutional layers and a fully connected layer, trained to a test accuracy of 99.2%.</p>
    <p>Once you draw an image it is scaled to the appropriate 28 x 28 pixel resolution and fed into both neural networks.</p>
    <p>As you will discover, the convolutional neural network will prove more accurate at this image classification task.</p>
    <Signature/>
  </aside>
);

export default Sidebar;
