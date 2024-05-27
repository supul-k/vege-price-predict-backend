import pandas as pd
from prophet import Prophet
import json
from datetime import datetime
import sys

dataset = pd.read_excel('prices.xlsx')

dataset = dataset.rename(columns={'Day': 'date',})

dataset['date'] = pd.to_datetime(dataset['date'])
dataset.set_index('date', inplace=True)

input_date = '2021-04-28'

def get_date_difference(input_date):
    end = "2021-04-21"

    date_format = "%Y-%m-%d"

    date1 = datetime.strptime(end, date_format)
    date2 = datetime.strptime(input_date, date_format)

    difference = date2 - date1

    days_difference = difference.days
    return days_difference

def prepare_prophet_data(data, column_name):
    df_prophet = data.reset_index()[['date', column_name]]
    df_prophet.columns = ['ds', 'y']
    return df_prophet

def forecast_prophet(data, days=30):
    m = Prophet()
    m.fit(data)
    future = m.make_future_dataframe(periods=days)
    forecast = m.predict(future)
    return forecast[['ds', 'yhat', 'yhat_lower', 'yhat_upper']]

def main(date_input):
    date_input = get_date_difference(input_date)+7
    forecasts = {}
    data = {}
    for vegetable in dataset.columns:
        prophet_data = prepare_prophet_data(dataset, vegetable)
        forecasts[vegetable] = forecast_prophet(prophet_data, days=date_input)[-1*date_input:]

    for vegetable, forecast in forecasts.items():
        data[vegetable] = [forecast['yhat'][1304+date_input-7],forecast['yhat'][1304+date_input-6],forecast['yhat'][1304+date_input] ]

    return data

if __name__ == "__main__":

    date_input = sys.argv[1]
    
    print('Date received to Python process', date_input)
    if len(sys.argv) != 2:
        sys.exit(1)

    response = main(date_input)
    print(response)

