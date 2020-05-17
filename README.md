
# UniNet: A Unified Sequence-to-Sequence Model for Parametric and Concatenative Speech Synthesis


## Speech demos
https://xiaozhah.github.io/UniNet_speech_demos

## t-SNE visualization of the phone-dependent distributions of the unit vectors
![image](vis_unit_vectors.jpg)

A re-implementation of Colin Eberhardt's [t-SNE Plot](https://github.com/ColinEberhardt/d3fc-webgl-hathi-explorer) of Hathi Trust library books clustered using [t-SNE](https://en.wikipedia.org/wiki/T-distributed_stochastic_neighbor_embedding).

This implementation uses D3FC's WebGL Series.

### online interactive demos
* [UniNet encoder](https://xiaozhah.github.io/Visualization-of-Unit-Vectors/UniNet%20encoder)
* [UniNet decoder](https://xiaozhah.github.io/Visualization-of-Unit-Vectors/UniNet%20decoder)
* [Tacotron2 encoder](https://xiaozhah.github.io/Visualization-of-Unit-Vectors/Tacotron2%20encoder)

### offline interactive demos
```
git clone git@github.com:xiaozhah/Visualization-of-Unit-Vectors.git
cd Visualization-of-Unit-Vectors
python -m SimpleHTTPServer
# then open http://localhost:8000/UniNet_encoder in Chrome
```
