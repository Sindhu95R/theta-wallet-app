from utils.gas_price_predictor import predict_gas_prices

def get_gas_price_prediction(chain='eth', time_intervals=None):
    try:
        predictions = predict_gas_prices(chain, time_intervals)
        return predictions, None
    except Exception as e:
        return None, str(e)