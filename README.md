# UniNet: A Unified Sequence-to-Sequence Model for Parametric and Concatenative Speech Synthesis


## Speech demos
https://xiaozhah.github.io/UniNet_speech_demos

## t-SNE visualization of the phone-dependent distributions of the unit vectors
![image](vis_unit_vectors.jpg)

A re-implementation of Colin Eberhardt's [t-SNE Plot](https://github.com/ColinEberhardt/d3fc-webgl-hathi-explorer) of Hathi Trust library books clustered using [t-SNE](https://en.wikipedia.org/wiki/T-distributed_stochastic_neighbor_embedding).

This implementation uses D3FC's WebGL Series.

### Usage
for example
```
git clone git@github.com:xiaozhah/Visualization-of-Unit-Vectors.git
cd Visualization-of-Unit-Vectors
python -m SimpleHTTPServer
# then open http://localhost:8000/UniNet_encoder in Chrome
```

### UniNet encoder
#### Interactive demo page without audio: 

* https://xiaozhah.github.io/Visualization-of-Unit-Vectors/UniNet_encoder
#### demo video with audio
* https://youtu.be/HYS_PAVkzf8 (real-time version, can zoom, cannot dispaly duration, the same below) 
* https://youtu.be/ku7fC3lFov4 (slow version, cannot zoom, can dipaly duration, the same below)

### UniNet decoder
#### Interactive demo page without audio: 

* https://xiaozhah.github.io/Visualization-of-Unit-Vectors/UniNet_decoder
#### demo video with audio
* https://youtu.be/tQ6Jhd_vmLE (real-time version) 
* https://youtu.be/CDQKWjwsnNA (slow version)

### Tacotron2 encoder
#### Interactive demo page without audio:

* https://xiaozhah.github.io/Visualization-of-Unit-Vectors/Tacotron2_encoder
#### demo video with audio

* https://youtu.be/r0-2wFxWCEg (real-time version) 
* https://youtu.be/H-ki9qMQ91I (slow version)

