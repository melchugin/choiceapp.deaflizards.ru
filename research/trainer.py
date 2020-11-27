import numpy as np
import pickle

from keras.models import load_model
from random import sample as smpl

X = np.load("/home/gpu/DataDrive/TempData/X.npy")
y = np.load("/home/gpu/DataDrive/TempData/y.npy")

test_idx = smpl(range(0, len(X)), int(len(X) / 10))

sentiment_predictor = load_model("sentiment_predictor")

with open('/home/gpu/lab/ChoiseApp/train_history.pickle', 'rb') as f:
    history = pickle.load(f)

history_new = sentiment_predictor.fit(
    x=np.delete(X, test_idx, 0),
    y=np.delete(y, test_idx, 0),
    batch_size=5000,
    epochs=100,
    verbose=1,
    validation_data=(X[test_idx], y[test_idx]),
    shuffle=True
)

sentiment_predictor.save("sentiment_predictor")

for track in history.history.keys():
    history[track].extend(history_new.history[track])

with open('train_history.pickle', 'wb') as f:
    pickle.dump(history, f)