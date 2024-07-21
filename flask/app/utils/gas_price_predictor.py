import pandas as pd
import numpy as np
from statsmodels.tsa.arima.model import ARIMA
import requests
import os

def fetch_gas_price_history(chain='eth'):
    url = "https://api.owlracle.info/v4/eth/history"
    response = requests.get(url)
    if response.status_code == 200:
        data = response.json()
        df = pd.DataFrame(data['candles'])
        df['timestamp'] = pd.to_datetime(df['timestamp'])
        df.set_index('timestamp', inplace=True)
        return df
    else:
        raise Exception(f"Failed to fetch gas price history for {chain}")

def prepare_data_for_arima(api_df):
    # Use the 'close' price from gasPrice
    return api_df['gasPrice'].apply(lambda x: x['close'])

def train_arima_model(data):
    model = ARIMA(data, order=(5,1,0))
    model_fit = model.fit()
    return model_fit

def predict_gas_prices(chain='eth', time_intervals=None):
    if time_intervals is None:
        time_intervals = ['10m', '30m', '1h', '4h', '10h', '1d']
    
    api_df = fetch_gas_price_history(chain)
    data = prepare_data_for_arima(api_df)
    model = train_arima_model(data)
    
    predictions = {}
    for interval in time_intervals:
        steps = convert_interval_to_steps(interval)
        forecast = model.forecast(steps=steps)
        predictions[interval] = forecast.tolist()[-1]  # Get the last prediction for each interval
    
    return predictions

def convert_interval_to_steps(interval):
    interval_dict = {
        'm': 1,
        'h': 60,
        'd': 1440
    }
    value = int(interval[:-1])
    unit = interval[-1]
    return value * interval_dict[unit]