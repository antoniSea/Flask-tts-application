from TTS.api import TTS
from flask import Flask, request, jsonify, render_template
import secrets

app = Flask(__name__)

@app.route('/tts', methods=['GET', 'POST'])
def tts():
  model_name = TTS.list_models()[0]
  tts = TTS(model_name)
  if request.method == 'POST':
    random_string = secrets.token_hex(20)
    tts.tts_to_file(text=request.form['text'], speaker=tts.speakers[int(request.form['speaker'])], language=tts.languages[int(request.form['language'])], file_path="static/" + random_string + ".wav")      

    return { "status": "success", "file": "/static/" + random_string + ".wav" }
  else:
    return render_template('index.html', languages=tts.languages, speakers=tts.speakers, languages_len=len(tts.languages), speakers_len=len(tts.speakers))


if __name__ == '__main__':
  app.run(host='127.0.0.1', port=5000, debug=True)
