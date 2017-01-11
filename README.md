# MNIST Demo

An interactive demonstration of single digit classification using deep artificial neural networks.

A web application which demonstrates the ability of both fully connected and convolutional neural networks to classify handwritten digits.

## Demonstration

Where is it?
What does it show?

Show me a gif..


## Code

### Web

The front-end is a single page web application developed with the [React](https://facebook.github.io/react/) and and [Redux.js](http://redux.js.org/docs/introduction/) frameworks.

### Server

The server is a python [Flask](http://flask.pocoo.org/) server which uses Google's [TensorFlow](https://www.tensorflow.org/) library to evaluation pre-trained neural networks for handwriting recogntion.

### Neural Networks

Both the fully connnected and convolutional neural networks have been trained using [TensorFlow](https://www.tensorflow.org/) and following the tutorials [MNIST for ML beginners](https://www.tensorflow.org/tutorials/mnist/beginners/) and [Deep MNIST for Experts](https://www.tensorflow.org/tutorials/mnist/pros/).
The training data used are the 60,000 training images from the [MNIST database of handwritten digits](http://yann.lecun.com/exdb/mnist/).

## Getting Started

### Requirements

* [Python 2.7](https://www.python.org/download/releases/2.7/)
* [pip](https://pip.readthedocs.io/en/stable/)

### Install Dependencies

#### Server Dependencies:

(Linux)
```bash
pip install -r requirements.txt
``` 

(Mac)
```bash
pip install -r requirements-mac.txt
``` 

#### Web Dependencies:

```bash
npm install
```

### Run Application

To build and run the app locally run:

```bash
npm run build && npm run gunicorn
```

The app will be running at `localhost:8000`

### Webpack front-end development server

To run the app with the front-end development server run:

```bash
npm run gunicorn
npm run dev
```

The development server will be running at `localhost:8080` and proxying requests to `localhost:8000`

### Neural Networks

The pre-trained neural networks are saved in the [models](models) directory.

To re-train the networks run:

```bash
python networks/fully_connected.py
```
```bash
python networks/convolutional.py
```

The trained networks will be saved to the `/tmp` directory


## Deployment to Heroku

To [deploy the application to Heroku](https://devcenter.heroku.com/articles/git), run the following:

```bash
heroku apps:create <NAME>
heroku buildpacks:add heroku/nodejs
heroku buildpacks:add heroku/python
git push heroku master
```

## License

Released under GPLv3, see [LICENSE.txt](LICENSE.txt)

