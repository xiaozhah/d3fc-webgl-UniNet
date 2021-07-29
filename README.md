# UnitNet: A Sequence-to-Sequence Acoustic Model for Concatenative Speech Synthesis
<img src="UnitNet_LOGO.svg" width="300">

## Paper
[Published on TASLP 2021](https://ieeexplore.ieee.org/abstract/document/9468973)

## Speech demos
https://xiaozhah.github.io/UnitNet_speech_demos

## t-SNE visualization of the phone-dependent distributions of the unit embeddings
![image](vis_unit_embeddings.png)

### online interactive demos
* [UnitNet encoder](https://xiaozhah.github.io/Visualization-of-Unit-Embeddings/UnitNet%20encoder)
* [UnitNet decoder](https://xiaozhah.github.io/Visualization-of-Unit-Embeddings/UnitNet%20decoder)
* [Tacotron2 encoder](https://xiaozhah.github.io/Visualization-of-Unit-Embeddings/Tacotron2%20encoder)

### demos with audio on YouTube
* [UnitNet encoder](https://youtu.be/Jne83LuJ28o)
* [UnitNet decoder](https://youtu.be/xUDTWeyf9Ps)
* [Tacotron2 encoder](https://youtu.be/0Yrf6dRKhd4)

### offline interactive demos
```
git clone https://github.com/xiaozhah/Visualization-of-Unit-Embeddings.git
cd Visualization-of-Unit-Embeddings
python3 -m http.server
# or
python -m SimpleHTTPServer

# 127.0.0.1:8000/UnitNet%20encoder/
# 127.0.0.1:8000/UnitNet%20decoder/
# 127.0.0.1:8000/Tacotron2%20encoder/
```
