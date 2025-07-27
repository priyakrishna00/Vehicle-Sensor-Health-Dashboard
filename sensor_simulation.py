import random

def simulate_sensor_data():
    time = list(range(0, 30))
    engine_temp = [90 + random.uniform(-10, 20) for _ in time]
    brake_wear = [100 - random.uniform(0, 30) for _ in time]
    battery_health = [random.uniform(10, 100) for _ in time]
    return {
        "time": time,
        "EngineTemp": engine_temp,
        "BrakeWear": brake_wear,
        "BatteryHealth": battery_health
    }
